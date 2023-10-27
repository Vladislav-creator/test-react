import axios from 'axios'
import React, { Component } from 'react'
import css from './App.module.css'
import { Loader } from 'components/Loader/Loader';
// {
//   "userId": 1,
//   "id": 1,
//   "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//   "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
// }
// {
//   "postId": 1,
//   "id": 1,
//   "name": "id labore ex et quam laborum",
//   "email": "Eliseo@gardner.biz",
//   "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
// }
export class App extends Component {
state = {
  posts: null,
  isLoading: false,
  error: null,
};

fetchPosts = async () => {
  this.setState({
    isLoading: true,
  })
 try {const{data} = await axios.get('https://jsonplaceholder.typicode.com/posts');

  this.setState({
    posts: data,
  })} catch(error){
    this.setState({
      error: error.message,
    });
  } finally{
    this.setState({
      isLoading: false,
    })
  }
};
componentDidMount(){
  this.fetchPosts()
}
// async componentDidMount() {
//   const{data} = await axios.get("https://jsonplaceholder.typicode.com/posts");
//   this.setState({ posts: data });
// }
  render() {
    return (
      <div className={css.container}>
        <h1>HTTP-requests</h1>
        {this.state.error !== null && <p className={css.errorBage}>Ooops some error occured... Error message: {this.state.error}</p>}
        {this.state.isLoading && 
        <Loader />}
        <div className={css.listWrapper}>
           <ul className={css.postList}>
      {this.state.posts !== null && 
      this.state.posts.map(post =>{
      return(
      <li key={post.id}className={css.postListItem}>
        <h2 className={css.itemTitle}>{post.title}</h2>
        <p className={css.itemBody}><b>Body</b>{post.body}
        </p>
      </li>)
    })}
        </ul>
        <ul className={css.commentsList}>
        <li className={css.commentsListItem}>
        <h2 className={css.commentTitle}>id labore ex et quam laborum</h2>
        <h3 className={css.commentEmail}>Eliseo@gardner.biz</h3>
        <p className={css.itemBody}><b>Body</b>laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium
        </p>
      </li>
        </ul>
        </div>
     
        </div>
    )
  }
}



