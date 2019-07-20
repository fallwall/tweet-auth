import React from 'react';
import RegisterForm from './components/RegisterForm';
import TweetForm from './components/TweetForm';
import LoginForm from './components/LoginForm';
import { getPing, createUser, storeToken, getEncouragement, loginUser, createTweet } from './services/api';

import './App.css';
import Axios from 'axios';

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
      }
    }
  }

  async componentDidMount() {
    const resp = await getPing();
    console.log(resp);
   }

  handleRegisterFormChange = (ev) => {
    const { name, value} = ev.target;
    this.setState(prevState=> ({
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
      </div>
    );
  }
}

