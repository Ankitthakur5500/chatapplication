"use client"
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import socket from '../connection/page';


export default function page() {
  const searchParams = useSearchParams();
  const search = searchParams.get('name');
  const chatLink = searchParams.get('link');
  const [message,setMessage] = useState("");
  const [data,setData] = useState([]);
  const dataTransfer = {name:search,data:message,link:chatLink}; 
  

  useEffect(()=>{
    socket.on('message',function(data){
      // setData((prev)=>([...prev,data.name+" : "+data.data]));
      setData((prev)=>([...prev,data]));
      console.log(data);
   });
   return ()=>{
        socket.off('message');
      }
  },[]);
  
  function handleClick(){
    socket.emit('chat message', dataTransfer);
    setMessage("");
  }
  return (
    <div className='chat-conatiner'>
      <div className='chat-form'>
        {data.map((item)=>{
        if(item.name==search){
          return <div className='right msg'>{item.name}:{item.data}</div>
        }else{
          return <div className='left msg'>{item.name}:{item.data}</div>
        }
        })}
      </div>
      <input className='chat-input' value={message} onChange={(event)=>setMessage(event.target.value)}></input>
      <button className='chat-btn' onClick={handleClick}>Send</button>
    </div>
  )
}
 