import './App.css';
import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import { Chat } from './component/Chat';
import { ParticlesComponent } from './component/Particles';
const socket = io.connect(process.env.REACT_APP_SOCKET_URL);



function App() {
const [name, setName] = useState('');
const [room, setRoom] = useState('');
const [showChat, setShowChat] = useState(false);


const joinRoom = () => {
  if(name!=="" && room!==""){
  setShowChat(true);
  socket.emit("join_room", {username: name,
    room: room,
  })};
}
  return (
    <div className="App">
      <ParticlesComponent id="particles"/>
      
      {!showChat ?
      <div className="joinChatContainer">
        <h3>Join a chat</h3>
        <input type="text" placeholder="Enter you username" onChange={(event) =>{
          setName(event.target.value);
        }}/>
        <input type="text" placeholder="Enter Room Number" onChange={(event) =>{
          setRoom(event.target.value) ;
        }} onKeyDown={(event) =>{
          event.key==="Enter" && joinRoom();
        }}/>
        <button onClick={joinRoom}>Join Room</button>
      </div>
      :
      <Chat socket={socket} name={name} room={room}></Chat>
      }
    </div>
  );
}

export default App;
