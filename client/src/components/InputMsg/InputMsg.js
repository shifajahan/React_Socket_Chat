import React, {useState} from 'react';
import "./InputMsg.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


const InputMsg = (props) => {
    const [message, setMessage] = useState("");
    const socket = props.socket;
    const sendMessage = async (e) => {
        e.preventDefault();
        let msgDetails = {
            room : props.room,
            content:{
                author : props.user,
                msg : message,
            },
        }
        await socket.emit("send_message", msgDetails);
        setMessage("");
        props.msgfromChild(msgDetails.content);
    }
    return (
        <form onSubmit={sendMessage}>
            <div className="inputMsg">
                <input type="text" placeholder="Type your message here.." value={message} onChange={(e) => {setMessage(e.target.value)}}/>
                <button type="submit" ><FontAwesomeIcon icon={faPaperPlane} /></button>
            </div>
        </form>
    )
}

export default InputMsg;