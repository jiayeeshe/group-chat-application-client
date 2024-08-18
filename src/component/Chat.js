import React, { useMemo } from 'react'
import '../App.css';
import { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

export const Chat = ((props) => {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    
    const sendMessage = async () => {
        if (currentMessage!==""){
            const currentMessageData = {
                room : props.room,
                message: currentMessage,
                author: props.name,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }
            setMessageList((list)=> [...list, currentMessageData]);
            setCurrentMessage("");
            await props.socket.emit("sendMessage", currentMessageData);

        }
    }

    useMemo(()=>{
        props.socket.on("receive_message", (messageData) => {
            console.log(messageData);
            setMessageList((list)=> [...list, messageData]);
        })
    }, [props.socket])

  return (

    <div className='chat-window'>
        <div className='chat-header'>
            <p>{props.room} Group Chat</p>
        </div>
        <div className='chat-body'>
        <ScrollToBottom className='message-container'>
            {messageList.map((messageData) => {
                return (
                 <div className="message" id={props.name === messageData.author ? "you" : "other"}>
                    <div>
                        <div className='message-content'>
                            <p>{messageData.message}</p>
                        </div>
                        <div className='message-meta'>
                            <p id="time">{messageData.time}</p>
                            <p id="author">{messageData.author}</p>
                        </div>
                    </div>

                </div>   
                )
            })}    
            </ScrollToBottom>
        </div>  
        <div className='chat-footer'>
            <input value={currentMessage} onChange={(event) =>{
                setCurrentMessage(event.target.value)
            }} onKeyDown={(event)=>{
                event.key==="Enter" && sendMessage();
            }} placeholder='Hey'/>
            <button onClick={sendMessage}>&#9658;</button>
        </div>
    </div>
  )
}
)
