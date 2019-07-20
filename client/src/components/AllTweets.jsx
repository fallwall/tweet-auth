import React from 'react';

export default class AllTweets extends React.Component {
  render() {
    return (
      <>
        {this.props.tweets.map(tweet => <div key={tweet.id}><h3>{tweet.title}</h3>{tweet.tweet}</div>)}
      </>
    )
   }
 }