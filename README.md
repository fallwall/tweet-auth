# Full-Stack Auth

_Introduction_

In this lab we will implement full-stack registration, sign in, and making api calls to "protected" routes.  This will be a lengthy and difficult lab, but it is worth it.

Go Time

## The Plan

Here's what we will be building from a bird's eye view:

- A Register Form + api call
- The `POST` `/users` route that will receive a new user's data, create the user with a hashed password, and return a token + user data
- A Login Form + api call that will send a user's name + password
- A `POST` `/login` route that will compare the user's password with the saved password digest and returns a token + user data.
- Full-stack `Read` and `Create` for `tweets` that are associated with a user

#### Extras
- a `verify` route + client-side code to load a token from localStorage when the app loads and verifies that it is valid
- Using react-router to separate the various views
- Adding `Update` and `Delete` to `tweets` or `Update` to users

Since this is a broad set of features to implement from scratch, we will do this in stages.  

First, just the ui for the `RegisterForm` will be built, followed by a simple dummy route in the express server.  Once the client can make a call and receive a response from the dummy endpoint stage 1 is done.  Try to get an IL or IA to check in with you after hitting this milestone.

Next, the route for `POST` `/users` needs to be started.  This stage will include setting up an `express` server, adding the `User` model and the actual route.  Don't forget to hash the password before saving the user.  For this stage, just return the user data.  The token parts will be handled in the next stage.  Get another check in before proceeding beyond this point.

After being able to successfully create a user it's time to generate and send a token back to the client.  At this point, we'll also add a "protected" route that uses a `restrict` middleware which verifies a token sent by the client.  This will be the step with the most new material.  Just go slow here and definitely get a check in once you finish.

The last auth bit is to add a `login` form and `POST` `/login` route.  This part may be a little tricky, but after having built the above pieces of functionality, the auth form will be fairly straightforward.

At this point all that is left is to implement `Create` and `Read` routes for a `tweet` resource.  Party

## Up and Running
- fork + clone this repo
- `cd` into the repo
- run `create-react-app client`
- `cd` into the client and install axios with `npm i axios`
- `cd` back to the root and run `npm init -y`
- from the root, install the following libraries:
	- express
	- nodemon
	- morgan
	- cors
	- body-parser
	- sequelize
	- pg
	- jsonwebtoken
	- bcrypt
- Add `resetDb` and `dev` scripts to `package.json` as displayed [here](https://git.generalassemb.ly/sei-nyc-pandas/update-lesson/blob/master/deli/package.json#L8).
- run `createdb auth_lab_db`
- open the project in VS code with `code .`

We'll start with the React part, so `cd` into client from one terminal window and run `npm start`.

## Stage 1

### The RegisterForm

- `mkdir` a `components` directory for our react app
- add a `RegisterForm.jsx` file with a functional component inside
- `RegisterForm` should render a form with three inputs:
	- a `text` input for the user's name
	- a `password` type input for the user's password
	- a `text` input for the user's email
- Define a `state` object inside `App.jsx` with a `registerFormData` state variable with `name`, `email`, and `password` key/val pairs.  They can all be strings
- You will need to define a `handleRegisterFormChange` and a `handleRegisterSubmit`	method in `App.jsx`.  For now `handleRegisterSubmit` can just `console.log` the `registerFormData` object.

### A Dummy Route
- `touch` a `server.js` file
- set up a basic express server
	- require `cors`, `morgan`, `body-parser` and `express`
	- init the express app and mount the above middleware
	- define a `PORT` constant variable
	- add a dummy route for `/ping` that returns the string `pong`
	- bind the app to the `PORT` with `app.listen(PORT ...)`

At this point you should be able start the express server in a different terminal window with `nodemon` and test the endpoint from the browser

- Back in the `react` app, add a `services` directory with an `api.js` file.
- create an axios client with a baseURL: 'http://localhost:3000'
- Write and export an async function `getPing` that sends a `GET` request to `/ping` and returns the response.
- Import `getPing` in `App.jsx` and call it from `componentDidMount`.  `console.log` the result.

### Checkpoint
At this point, you should be able to enter data into the `RegisterForm`, "submit" it and `console.log` the data from the form.  Also, your app should `console.log` the `pong` string when the page loads.  Get an instructor to verify these two bits of functionality before proceeding.

## Stage 2

### The Request and the Model

- In the react app, add a `createUser` function in `services/api.js` and export it.  `createUser` should take an object with new user data from the register form and `POST` it to `/users`.  It should return the response from the server
- Import `createUser` in `App.jsx` and call it from `handleRegisterSubmit`.  Pass the `registerFormData` object as an argument to `handleRegisterSubmit`
- If you actually hit `submit` now the request will error out with a `404`, but you can verify that the url and request body are what you expect them to be by looking at the `Network` tab in the dev tools.

Now it's time to start implementing the endpoint.

- In the `express` app, touch a `models.js` file as well as `resetDb.js`
- In `models.js` set up a sequelize connection as follows:

	```js
	const Sequelize = require('sequelize');
	const sequelize = new Sequelize({
		database: 'auth_twitter_db',
		dialect: 'postgres',
		define: {
			underscored: true
		}
	});
	
	module.exports = {
		sequelize,
	};
	```
- In `resetDb.js`, add the following code:

	```js
	const { sequelize } = require('sequelize');
	const main = async () => {
		await sequelize.sync({ force: true });
		process.exit();
	});
	
	main();
	```
- run `createdb auth_twitter_db`
- Add a `User` model with three fields (they can all be Strings):
	- name
	- password_digest,
	- email
- Be sure to add the `User` model to `module.exports` at the bottom of the file
- run `npm run resetDb` (or just `node resetDb.js`)
- Verify that the schema is what you expect it to be from `psql`

### Let's make a User

Now we're ready to start implementing the actual endpoint for `POST` `/` --note that the path given in the `userRouter` file omits the "users" part.  This path prefix will be added in `server.js`

- Add a `routes` directory
- add a `userRouter.js` file inside `routes`
- set up the userRouter as follows:

	```js
	const { Router } = require('express');
	const bcrypt = require('bcrypt');
	const { User } = require('../models');

	const SALT = 2 // some number
	const userRouter = Router();
	
	module.exports = {
		userRouter
	};
	```
- Above the export, add a route for `POST` `/users`.  It should use `bcrypt` to hash the password into a `password_digest` before creating the user.  Refer [here](https://git.generalassemb.ly/sei-nyc-pandas/auth-demo-hash/blob/master/server.js#L22) if you need some hints.
- just return the new user that was created as json from the endpoint
- Back in `server.js`, import the `userRouter` (don't forget the curly braces when importing it) and mount it to the app with `app.use('/users', userRouter)`.

### Checkpoint

If all goes well, you should now be able to submit a new user from the react app and have it get persisted to the db with a hashed password, and this new user data should be returned to the client.  If you're feeling fancy, try to remove the `passwordDigest` from the returned new user data.

Get a little review from an instructor before moving on.

## Stage 3 Token Time

### The Server

Now for the fun bit.  Let's generate a token.
- From the root of the `express` app make an `auth.js` file
- import `jsonwebtoken` as follows: 
	`const jwt = require('jsonwebtoken');`
- define a `SECRET` variable at the top of the file.  It can just be a random string.
- write a function `genToken` that should receive a `payload` parameter and returns a new token.  Generate the token with `jwt.sign(payload, SECRET);` and return it.
- export `genToken` with:

	```
	module.exports = {
		genToken,
	};
	```
- import `genToken` inside the `userRouter`
- call `genToken` from the route handler for `POST` `/users`, passing it the name + email + id of the new user.  Now, return the token in the response for `POST` `/users`.
- At this point, when `register`ing a new user, the client should get back a long token.


### The Client
- Back in react, in `services/api.js` we will need to store the token somehow.  Since it would be inconvenient to store it in state and pass it as an argument to _every_ subsequent api call, let's just store it in localStorage and with axios
- Write a function `storeToken` that takes a token as an argument
- `storeToken` should add the token to localStorage and attach it to the `axios` api client.

For the `localStorage` part you can use `localStorage.setItem` like so:

```js
localStorage.setItem('authToken', token);
```

Similarly you can "attach" the token to the axios client like so:

```js
const api = axios.create({
  baseURL: 'http://localhost:3000'
});

// later after a token has been fetched
api.defaults.headers.common.authorization = `Bearer ${token}`;
```

After this step is done, the token will be passed inside the Authorization header for all future requests.  Try to verify that the token is passed in with other requests from the dev tools.

### The Protected Route

Now it's time to add a `restrict` middleware that will effectively authenticate requests for particular routes.

- In `auth.js` add a middleware function called restrict:

```js
const restrict = (req, res, next) => {}
```
- The purpose of `restrict` is to check to see if a valid token has been passed in an Authorization header and to block the request if there isn't a valid token.
- You can extract the token with `const token = req.headers.authorization.split(" ")[1];`
- use a `try / catch` block when decoding the token

```js
try {
	const token = req.headers.authorization.split(" ")[0];
	const user = jwt.verify(token, SECRET);
	res.locals = user;
	next();
} catch (e) {
	res.status(401).send('Not Authorized');
}
```

Note how the `user` data extracted from the token can be attached to `res.locals` and then accessed from within subsequent middleware or route handlers.
- export the `restrict` middleware from `auth.js`
- In `server.js` import the `restrict` middleware with `const { restrict } = require('./auth');`
- Add a `GET` `/encourage` route that uses the `restrict` middleware:

```js
app.get('/encourage', restrict, (req, res) => {});`
```
- `/encourage/` should take the name from `res.locals.user` and interpolate it into a helpful message, e.g., `You're doing a great job ${name}!`
- Back in the react app, add a function in `services/api.js` that calls `GET` `/encourage` called `getEncouragement`.
- After registering a new user, try to trigger this call to `GET` `/encourage` and verify that it works only after a token has been attached to the axios client.  For example, after `await`ing the call to `createUser` try to call `getEncouragement` and `console.log` the response.


### Checkpoint

At this point, you should be able to register a new user, store the token that the server sends as a response, and then make an authenticated request to a "protected" route.  If a request is made to this route without the token, a 401 should be returned.  Verify this behavior with an instructor.

## Stage 4 Logging In

### The Login Form
- Now in the react app, add a `LoginForm` component
- the `LoginForm` should render a form with two inputs, a `text` input for the user name and a `password` input for the password.
- In `services/api.js` add and export a function `loginUser` that takes a name and password as arguments, and makes a call to `POST` `/users/login`.  It should expect a token in the response, and it should also attach the token to `localStorage` + the axios client as outlined in the previous step.
- Import `LoginForm` into `App.jsx`
- Add a `handleLoginFormChange` and `handleLoginSubmit` in `App.js` as well as another state variable `loginFormData` to state.  Pass all three of these as props to the `LoginForm` component.
- `handleLoginSubmit` should call `loginUser`, passing it the name and password from the `loginFormData` state variable.
- At this point, you can optionally add some conditional rendering to only show either the login form or register form, but never both

### The Login route

- In the express app, add a route to the `userRouter`, `POST` `/login`
- the route handler should take the name from the request body, and look up the user that matches that name with `const user = User.findOne({ where: { name: <the name from the request body> }});` or something similar
- Now use `bcrypt.compare` to check the incoming password with the `password_digest` from the user model.  [Here](https://git.generalassemb.ly/sei-nyc-pandas/auth-dragon/blob/solution/auth.js#L48) is how the call to `bcrypt.compare` should look.  Note it has to have an `await`, and the password attempt is the first argument.
- If the passwords match, generate and return a token; if they don't, return a 401.

### Checkpoint

At this point, you should be able to log a user in that already exists.  You might want to "rest" your db while testing this stage in case there are several users with the same name but different passwords.

Check in with an instructor before moving on

Also, at this point, you might want to add a `verify` route and api call that checks localStorage for a token and verifies that it is valid which is triggered from `componentDidMount`.  That behavior will allow a user to remain logged in across page reloads.  This isn't necessary though so don't fret over it.

## Stage 5: A full protected Resource: Tweets

### Create a Tweet

Now we can start building out a full protected resource.

- Add a `Tweet` model that has fields for `tweet`, and `title`.  Tweets don't have titles, but let's just pretend.
- Add an association so that a `User` _hasMany_ tweets, and a `Tweet` _belongsTo_ a user.
- call `resetDb`
- Add a `TweetForm` to the react app with two fields, `title` and `tweet`
- Render the form inside `App.js`
- add a function to `services/api.js` called `createTweet`.  - This function should take a `title` and `tweet` arguments and make an api call to `POST` `/tweets`.
- Add a `tweetRouter` that imports the `restrict` middleware and `Tweet` model
- write a route handler for `POST` `/` that uses the `restrict` middleware and creates a new tweet and sets the user for the tweet to be the user availble on `res.locals`.
- export the `tweetRouter` and import it from `server.js`.  Mount the `tweetRouter` with `app.use('/tweets', tweetRouter);`.

At this point, we are be able to create a new instance of a resource that is associated with an authenticated user.  Boom!

### Show Tweets
- Add a route for `GET` `/tweets` that returns a list of all tweets
- In the react app, add a function `getTweets` to `services/api.js`
- add a `tweets` state variable and call `getTweets` from `componentDidMount`, updating the `tweets` state variable with the response.
- Create a `TweetList` component that will render a list of tweets
- import the `TweetList` into `App.jsx` and pass it the `tweets` state variable.
- Look at some awesome tweets.


*Winning!*

## Extras

- Implement `DELETE` and `UPDATE` on the tweets, making sure that only the user who "owns" the tweets is able to delete or update them
- Add `react-router` to the app
- Style things!