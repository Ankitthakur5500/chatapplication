"use client"
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import socket from '../connection/page';


export default function page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get('name');
    const [link,setLink] = useState("");
    const [room,setroom] = useState("");

    function handleClick(){
        socket.emit('chat link', link);
        socket.on('room does not exist',()=>{
          setroom("Room Not Found");
        })
        socket.on('room found',()=>{
         router.push('/pages/chatpage?name='+search+'&link='+link);
        })
        setLink("");
    }
  return (
    <div className='container' > 
      <div className='userform'>
        <h2>Enter your chat joining link:-</h2>
        <input placeholder='Enter your joining link...' className='input button'  value={link} onChange={(event)=>setLink(event.target.value)}></input><br/> 
        <button className='button' onClick={handleClick}>Submit link</button>
        <div id='noLink'>{room}</div>
      </div>
    </div>
  )
}
