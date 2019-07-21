import React from 'react';

export default class AllTweets extends React.Component {
  render() {
    return (
      <>
        {this.props.tweets.map(tweet =>
          <div key={tweet.id}>
            <h3>{tweet.title}</h3>
            <p>{tweet.tweet}</p>
            <p> ~ {tweet.user.name}</p>
            <p>@ {tweet.updatedAt.split("T")[0]}</p>
            <button name={tweet.id} onClick={this.props.handleDelete}>Delete</button>
            <button name={tweet.id} onClick={this.props.handleUpdate}>Update</button>
            {this.props.updatingId === tweet.id &&
              (<form>
                <input type="text" onChange={this.props.handleChangeUpdate} name="title" placeholder="title" />
                <input type="text" onChange={this.props.handleChangeUpdate} name="tweet" placeholder="tweet" />
                <button name={tweet.id} onClick={this.props.handleSubmitUpdate}>Finalize Update</button>
                <button onClick={this.props.handleCancelUpdate}>Cancel Update</button>
              </form>)
            }
          </div>)}
      </>
    )
  }
}