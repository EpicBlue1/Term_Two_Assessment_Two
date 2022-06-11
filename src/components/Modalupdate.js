import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Modalupdate = (props) => {

    const [updatedPost, setupdatedPost] = useState({
        updatedMessage: props.original,
        id: props.id
      })
    
      const closeModal = () => {
        props.rerender();
        console.log("lol")
      }
    
      useEffect(() => {
    
        document.getElementById("updateText").innerHTML = props.original;
    
      }, [])
    
      const changeHandler = (e) => {
        let value = e.target.value;
        setupdatedPost({...updatedPost, updatedMessage: value});
        console.log(updatedPost);
      }
    
      const updatePost = (e) => {
        e.preventDefault();
    
        axios.post('http://localhost/AssessmentTwo_Api/updatePost.php', updatedPost)
        .then((res)=>{
          let data = res.data;
          console.log(data);
          props.upRender(true);
          props.rerender();
        })
        .catch(err=>{
          console.log(err);
        });
      }

    return (
    <div className='updateModal'>
        <form onSubmit={updatePost}>
          <h1>Made a Mistake? Edit that shit!</h1>
          <p onClick={closeModal} className="CloseModal">Close Modal</p>

          <div className="post_itemMod">
            <h3>{props.username}</h3>
            <h5>{props.time}</h5>
            <textarea onChange={changeHandler} id='updateText' placeholder='Edit Post Message'/>
            <div className="postUi">
              <div className="editMod"></div>
              <div className="deleteMod"></div>
            </div>
          </div>

          <button type='submit'>Edit this post</button>
        </form>  
    </div>
    );
};

export default Modalupdate;