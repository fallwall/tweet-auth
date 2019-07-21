import React from 'react';

export default class AllTweets extends React.Component {
  render() {
    return (
      <>
        {this.props.tweets.map(tweet =>
          <div key={tweet.id}>
            <h3>{tweet.title}</h3>
            <p>{tweet.tweet}</p>
            {/* <p> ~ {tweet.user.name}</p> */}
            <button name={tweet.id} onClick={this.props.handleDelete}>Delete</button>
            <button>Update</button>
          </div>)}
      </>
    )
   }
 }