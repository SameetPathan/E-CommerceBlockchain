import {React,useState,useEffect} from 'react'
import Loader from './Loader'
import '../Typewriter.css';

function ForceLogin() {

  const [text, setText] = useState("");
  const messages = ["Online Shopping","Buy and Sell with Blockchain Enabled Payment"];

  useEffect(() => {
    let i = 0;
    let timer = setInterval(() => {
      setText(messages[i]);
      i = (i + 1) % messages.length;
    }, 2000);
    return () => clearInterval(timer);
  }, []);


  return (
  <>
  <Loader></Loader>
    <div className="home-page">
      <img 
      className='bg-img'
      src={process.env.PUBLIC_URL + "/shop.jpg"} 
      alt="Background" 
      style={{ 
          width: '100%', 
          //height: '500px', 
          objectFit: 'cover' 
        }} 
      />
       <div className="typewriter-text my-div text-success">
        {text}
      </div>
    </div>
        
  </>
  )
}

export default ForceLogin