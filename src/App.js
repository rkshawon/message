import './App.css';
import {useState} from "react"
import io from "socket.io-client"
import Chat from './Chat';

const socket = io.connect("http://localhost:3001")

function App() {
  const [text , setText] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setshowChat] = useState(false)

  const joinRoom = ()=>{
    if(text !== ""  && room !== ""){
      socket.emit("join_room", room)
      console.log("button clicked")
      setshowChat(true)
    }
  }
  return (
    <div className="App">
    {!showChat ? 
      <div className="joinChatContainer">
        <h3>Start Chat</h3>
        <input type = "text" placeholder = "Enter Name" onChange = {(event)=>{setText(event.target.value)}}/>
        <input type = "text" placeholder = "Enter Room Name" onChange = {(event)=>{setRoom(event.target.value)}}/>
        <button onClick={joinRoom}>Create Room</button>
      </div>
      :
      <Chat socket = {socket} room = {room} name = {text} />
    }
    </div>
  );
}

export default App;
