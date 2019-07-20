import React from 'react';

export default class LoginForm extends React.Component {
  render() {
    return (
      <>
        <form>
          <input onChange={this.props.handleLoginFormChange} type="text" name="name" placeholder="name" />
          <input onChange={this.props.handleLoginFormChange} type="password" name="password" placeholder="password" />
          <button onClick={this.props.handleLoginSubmit}>Submit</button>
        </form>
      </> 
    )
   }
 }