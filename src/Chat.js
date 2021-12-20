import React, { useState, useEffect } from 'react'
import ScroolToBottom from "react-scroll-to-bottom"
import './App.css'

function Chat({socket, room, name}) {
    const [message , setMessage] = useState("")
    const [messageArray, setmessageArray] = useState([])

    const sendMessage = async ()=>{
        if(message !== ""){
        const messageInfo = {
            message: message,
            room: room,
            name: name,
            time: new Date(Date.now()).getHours() +  ":" + new Date(Date.now()).getMinutes(),  
            }
        await socket.emit("send_message", messageInfo)
        setmessageArray((mgs)=>[...mgs, messageInfo])
        }
        setMessage("")
    }
    useEffect(() => {
       socket.on("recieve_message", (messageIn)=>{
            console.log("Message ",messageIn)
            setmessageArray((mgs)=>[...mgs, messageIn])
       })
    }, [socket])
    return (
        <div className='chat-window'>
            <div className='chat-header'><p>Live Chat</p></div>
            <div className='chat-body'>
                <ScroolToBottom  className="message-container">
                    {messageArray.map((mgs)=>{
                        return(
                        <div className="message" id={name === mgs.name ? "you" : "other"}>
                            <div>
                                <div className="message-content">
                                    <p key={ mgs.message }>{mgs.message}</p>
                                </div>
                                <div className="message-meta">
                                    <p id="time">{mgs.time}</p>
                                    <p id="author">{mgs.name}</p>
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </ScroolToBottom>
            </div>
            
            <div className='chat-footer'>
            <input type = "text" placeholder = "Type here..." value = {message} onChange = {(event)=>{setMessage(event.target.value)}}  onKeyPress={(event)=>{if(event.key === "Enter"){sendMessage()}}} />
            <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat
