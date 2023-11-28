"use client"
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import socket from '../connection/page';


export default function page() {
    const searchParams = useSearchParams();
    const searchName = searchParams.get('name');
    const searchLink = searchParams.get('link');
    const router = useRouter();

    function handleclick(){
        socket.emit('link',searchLink);
        router.push('/pages/chatpage?name='+searchName+'&link='+searchLink);
    }
  return (
    <div className='container' > 
      <div className='userform'>
        <h2>Hello,{searchName} </h2>
        <h3>Your Link to Join the Room is:-</h3>
        <div className='joining-link'>{searchLink}</div>
        <button className='button' onClick={handleclick}>Join Room</button>
      </div>
    </div>
  )
}

