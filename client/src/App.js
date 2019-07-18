import React from 'react';
import RegisterForm from './components/RegisterForm';
import { getPing } from './services/api';

import './App.css';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      registerFormData: {
        name: "",
        password: "",
        email: ""
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

  handleRegisterSubmit = () => {
    console.log(this.state.registerFormData);
  }

  render() {
    return (
      <div className="App">
        <RegisterForm handleRegisterFormChange={this.handleRegisterFormChange} handleRegisterSubmit={this.handleRegisterSubmit}/>
      </div>
    );
  }
}

