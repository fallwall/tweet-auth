import React from 'react';
import RegisterForm from './components/RegisterForm';
import { getPing, createUser, storeToken, getEncouragement, loginUser } from './services/api';
import LoginForm from './components/LoginForm';
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
    console.log("responded");
    this.setState({
      loginFormData: {
        name: "",
        password: ""
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
      </div>
    );
  }
}

