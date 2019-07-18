import React from 'react';

export default function RegisterForm() {
  return (
    <form>
      <input type="text" name="name" placeholder="username" />
      <input type="text" name="password" placeholder="enter user password" />
      <input type="text" name="email" placeholder="enter user email" />
      {/* <button onClick={this.handleSubmit}>Submit</button> */}
    </form>
  )
}