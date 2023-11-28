"use client"
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import socket from '../connection/page';


export default function page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get('name');
    const joinLink = document.getElementById('joinRoom');
    const [link,setLink] = useState("");

    function handleClick(){
        socket.emit('chat link', link);
        router.push('/pages/chatpage?name='+search+'&link='+link);
        setLink("");
    }
  return (
    <div className='container' > 
      <div className='userform'>
        <h2>Enter your chat joining link:-</h2>
        <input placeholder='Enter your joining link...' className='input button' id='joinRoom' value={link} onChange={(event)=>setLink(event.target.value)}></input><br/> 
        <button className='button' onClick={handleClick}>Submit link</button>
        <div id='noLink'></div>
      </div>
    </div>
  )
}
