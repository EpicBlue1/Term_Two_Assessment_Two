import Modal from './components/Modalupdate.js';
import { useState, useEffect } from 'react';
import Post from './components/Post';
import axios from 'axios';

function App() {

  sessionStorage.setItem('activeUser', 'Kenobi Obi');

  const [userName, setuserName] = useState({
    activeUser: sessionStorage.getItem('activeUser'),
  });

  const [posts, setPosts] = useState();
  const [postMessage, setPostMessage] = useState({
    message: '', 
    username: sessionStorage.getItem('activeUser'),
  });

  const [renderPost, setRenderPost] = useState();

  useEffect(()=>{
  const userInSession = sessionStorage.getItem('activeUser');
  console.log(userInSession);
  }, []);

  useEffect(()=>{
    axios.post('http://localhost/AssessmentTwo_Api/readUserPosts.php', userName)
    .then((res)=>{
      let data = res.data;
      let renderPost = data.map((item) =>  <Post key={item.id} rerender={setRenderPost} uniqueId={item.id} username={item.username} date={item.time} message={item.message}  />);
      console.log(data);
      setPosts(renderPost);
      setRenderPost(false);
    })
    .catch(err=>{
      console.log(err);
    });

  },[renderPost]);

  const postVal = (e) => {
    let messageVal = e.target.value;
    setPostMessage({...postMessage, message: messageVal});
  }

  const addNewPost = (e) => {
   e.preventDefault();
   document.getElementById('Message').value = "";
   axios.post('http://localhost/AssessmentTwo_Api/addPost.php', postMessage)
    .then((res)=>{
      let data = res.data;
      console.log(data); 
      setRenderPost(true);
    });
  }

  return (
    <div className="App">
      <div className="left">
        <h1>Post Timeline</h1>
        {posts}
        {/* <Modal /> */}
      </div>
      <div className="right">
        <form onSubmit={addNewPost}>
          <h3>Add A New Post</h3>
          <textarea id="Message" onChange={postVal} placeholder="your post here" />
          <button type="submit">Add Your New Post</button>
        </form>
      </div>
      
    </div>
  );
}

export default App;
