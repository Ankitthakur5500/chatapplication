"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import React from 'react'
import socket from '../pages/connection/page';

const random_hex_color_code = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "www.chatapp.com/"+n.slice(0, 10);
};

export default function Login() {
  const router = useRouter();
  const [userName,setUserName] = useState("");  
  const lnk = random_hex_color_code();
  var ankit = document.getElementById('input');

  function handleclick2(){
    if(ankit == null){
      //this is a required userName.
    }else{
      router.push('/pages/createroom?name='+userName+'&link='+lnk);
    }
  }  
  function handleclick(){
    if(ankit == null){
      //this is a required userName.
    }else{
      router.push('/pages/joinroom?name='+userName);
    }
  }
  
  return (
    <div className='container' > 
      <div className='userform'>
        <h2>Enter your username</h2>
        <input id='input' required placeholder='Enter your username...' className='input button' onChange={(event)=>setUserName(event.target.value)}></input><br/> 
        <button className='button' onClick={handleclick2} >Create Room</button><br/> 
        <button className='button'onClick={handleclick}>Join Room</button>
      </div>
    </div>
  )
}


