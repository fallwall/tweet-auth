import React from 'react';

export default function RegisterForm(props) {
  return (
    <div className="register-form">
      <h2>Register Form</h2>
    <form>
      <input onChange={props.handleRegisterFormChange} type="text" name="name" placeholder="username" />
      <input onChange={props.handleRegisterFormChange} type="password" name="password" placeholder="enter user password" autocomplete="off" minlength="8" required />
      <input onChange={props.handleRegisterFormChange} type="text" name="email" placeholder="enter user email" />
      <button onClick={props.handleRegisterSubmit}>Submit</button>
    </form>
    </div>
  )
}