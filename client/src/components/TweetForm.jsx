import React from 'react';

export default class TweetForm extends React.Component {
  render() {
    return (
      <form>
        <input onChange={this.props.handleTweetChange} type="text" name="title" placeholder="title" />
        <input onChange={this.props.handleTweetChange} type="text" name="tweet" placeholder="tweet" />
        <button onClick={this.props.handleTweetSubmit}>Submit</button>
      </form>
    )
   }
 }