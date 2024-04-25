// import './App.css'


import { useState } from 'react';
import PostList from './components/post-list';



function App() {

  
  const [toggle,setToggle] = useState(true);

  return (
    <div >
      <h1 className="title">My Post</h1>
       <button onClick={()=>setToggle(!toggle)}>toggle</button>
      {toggle && <PostList/>}
      
    </div>
  )
}

export default App;
