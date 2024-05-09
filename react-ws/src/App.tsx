import  {useState, useEffect} from 'react';

export default function App() {

  const[Socket, setSocket] = useState<WebSocket | null>(null);
  const[message, setMessage] = useState('');
  const[displaymessage, setDisplayMessage] = useState('');

  useEffect(()=>{

      const socket= new WebSocket('ws://localhost:8080');

      socket.onopen =()=>{
        console.log('connected');
        setSocket(socket);
      }

      socket.onmessage=(message)=>{
        console.log('received: %s', message.data);  
        setMessage(message.data);
      }


      return ()=>{
        socket.close();
      }

  },[])


      if(!Socket){
        return <div>connecting...</div>
      }

    return(
    <div>
      <input onChange={(e)=>{
        setDisplayMessage(e.target.value)
      }}></input>
      <button onClick={()=>{
        Socket.send(displaymessage);
      }}>Send</button>
      <div>{message}</div>
    </div>
    )
}