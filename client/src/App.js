import React from 'react';
import RegisterForm from './components/RegisterForm';
import TweetForm from './components/TweetForm';
import LoginForm from './components/LoginForm';
import AllTweets from './components/AllTweets';
import {
  getPing,
  createUser,
  storeToken,
  getEncouragement,
  loginUser,
  createTweet,
  getAllTweets,
  deleteTweet,
  updateTweet
} from './services/api';

import './App.css';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      registerFormData: {
        name: "",
        password: "",
        email: ""
      },
      loginFormData: {
        name: "",
        password: ""
      },
      tweetData: {
        title: "",
        tweet: ""
      },
      tweets: [],
      tweetUpdate: {
        id: "",
        title: "",
        tweet: ""
      }
    }
  }

  async componentDidMount() {
    const resp = await getPing();
    console.log(`${resp}, you are up and running.`);
    const tweets = await getAllTweets();
    this.setState({
      tweets: tweets
    });
    console.log(this.state.tweets[0]);
  }

  handleRegisterFormChange = (ev) => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      registerFormData: {
        ...prevState.registerFormData,
        [name]: value
      }
    }));
  }

  handleRegisterSubmit = async (ev) => {
    ev.preventDefault();
    const newUser = this.state.registerFormData;
    const resp = await createUser(newUser);
    // storeToken(resp);
    const msg = await getEncouragement();
    console.log(msg);
  }

  handleLoginFormChange = (ev) => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      loginFormData: {
        ...prevState.loginFormData,
        [name]: value
      }
    }))
  }

  handleLoginSubmit = async (ev) => {
    ev.preventDefault();
    const resp = await loginUser(this.state.loginFormData);
    this.setState({
      loginFormData: {
        name: "",
        password: ""
      }
    })
  }

  handleTweetChange = (ev) => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      tweetData: {
        ...prevState.tweetData,
        [name]: value
      }
    }));
  }

  handleTweetSubmit = async (ev) => {
    ev.preventDefault();
    const resp = await createTweet(this.state.tweetData);
    this.setState({
      tweetData: {
        title: "",
        tweet: ""
      }
    })
    window.location.reload();
  }

  handleDelete = async (ev) => {
    ev.preventDefault();
    console.log(ev.target.name);
    await deleteTweet(ev.target.name);
    const tweets = await getAllTweets();
    this.setState({
      tweets: tweets
    });
    //filter state didn't work 
  }

  handleUpdate = (ev) => {
    ev.preventDefault();
    this.setState({
      tweetUpdate: {
        id: ev.target.name,
        tweet: "",
        title: ""
      }
    });
  }

  handleChangeUpdate = (ev) => {
    const { name, value } = ev.target;
    this.setState(prevState => ({
      tweetUpdate: {
        ...prevState.tweetUpdate,
        [name]: value
      }
    }));
  }

  handleSubmitUpdate = async (ev) => {
    await updateTweet(this.state.tweetUpdate);
    this.setState({
      tweetUpdate: {
        id: "",
        title: "",
        tweet: ""
      }
    });
  }

  handleCancelUpdate = () => {
    this.setState({
      tweetUpdate: {
        id: "",
        title: "",
        tweet: ""
      }
    });
  }

  render() {
    return (
      <div className="App">
        <h1>FORUM STUFF</h1>
        <RegisterForm
          handleRegisterFormChange={this.handleRegisterFormChange}
          handleRegisterSubmit={this.handleRegisterSubmit} />
        <LoginForm
          handleLoginFormChange={this.handleLoginFormChange}
          handleLoginSubmit={this.handleLoginSubmit}
          loginFormData={this.state.loginFormData}
        />
        <TweetForm
          handleTweetChange={this.handleTweetChange}
          handleTweetSubmit={this.handleTweetSubmit}
          tweetData={this.state.tweetData}
        />
        <AllTweets
          tweets={this.state.tweets}
          handleDelete={this.handleDelete}
          handleUpdate={this.handleUpdate}
          updatingId={this.state.tweetUpdate.id}
          handleChangeUpdate={this.handleChangeUpdate}
          handleSubmitUpdate={this.handleSubmitUpdate}
          handleCancelUpdate={this.handleCancelUpdate}
        />
      </div>
    );
  }
}

