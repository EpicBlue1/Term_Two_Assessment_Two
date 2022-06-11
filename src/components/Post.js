import React from 'react';
import EditModal from './Modalupdate';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Post = (props) => {

  
  const [Modal, setModal] = useState()

  const deletePost = () => {
    if(window.confirm("Are you sure about that?") === true){

      let postId = {id: props.uniqueId};

      axios.post('http://localhost/AssessmentTwo_Api/deletePost.php', postId)
      .then((res)=>{
        let data = res.data;
        console.log(data);
        
        //set useState in parent
        props.rerender(true);
      })

    } else {
      console.log("The user did not delete")
    }
  }

  const editPost = () => {
    setModal(<EditModal username={props.username} time={props.date} upRender={props.rerender} rerender={setModal} original={props.message} id={props.uniqueId}/>)
  }

    return (
        <div className="post_item">
          {Modal}
          <h3>{props.username}</h3>
          <h5>{props.date}</h5>
          <p>{props.message}</p>
          <div className="postUi">
            <div onClick={editPost} className="edit">Edit Post</div>
            <div onClick={deletePost} className="delete">Delete Post</div>
          </div>
        </div>
    );
};

export default Post;