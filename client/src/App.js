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
        emial: ""
      }
    }
  }

  async componentDidMount() {
    const resp = await getPing();
    console.log(resp);
   }

  handleRegisterFormChange = () => {
    // something
  }

  handleRegisterSubmit = () => {
    console.log(this.state.registerFormData);
  }

  render() {
    return (
      <div className="App">
      <RegisterForm />
      </div>
    );
  }
}

