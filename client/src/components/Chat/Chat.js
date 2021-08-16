import React, { useEffect, useState, useRef } from 'react';
import "./Chat.css";
import InputMsg from "../InputMsg/InputMsg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

const Chat = (props) => {
    const [messageList, setMessageList] = useState([]);
    const socket = props.socket;


    //show all messages in receiver side
    useEffect(() => {
        socket.on("receive_msg", (data) => {
            setMessageList([...messageList, data]);
        });
    });

    //callback function from InputMsg component to add new msg to list
    const getMessageContent = (data) => {
        if (data)
            setMessageList([...messageList, data])
    }

    //scroll to last message
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView()
    }
    useEffect(() => {
        scrollToBottom()
    }, [messageList]);

    //render all messages and message input form
    return (
        <div>
            <div className="title">
                <h1 className="display-5">Welcome {props.user} to {props.room}
                <span><FontAwesomeIcon icon={faComments} /></span></h1>
            </div>
            <div className="chatbox">
                <div className="messages scrollbar scrollbar-primary">
                    {messageList.map((val, key) => {
                        return (
                            <div className="messageContainer" id={val.author == props.user ? "you" : "other"}>
                                <span className="messageBubble">{val.msg}</span>
                                <span className="user">{val.author}</span>
                            </div>
                        )
                    })}
                    <div ref={messagesEndRef} />
                </div>
                <InputMsg
                    user={props.user}
                    room={props.room}
                    msgfromChild={getMessageContent}
                    socket={props.socket}
                />
            </div>
        </div>
    )
}

export default Chat;