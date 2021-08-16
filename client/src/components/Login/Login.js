import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import "./Login.css";
import Chat from '../Chat/Chat';
import {Container, Row, Col} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';


let socket;
const CONNECTION_PORT = "localhost:3001";

const Login = () => {
    const [loggedIn, setLoggedIn] = useState(false); 
    const [room, setRoom] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(()=>{
        socket = io(CONNECTION_PORT);
    }, [CONNECTION_PORT])

    const connectToRoom = (e) => {
        e.preventDefault();
        setLoggedIn(true);
        socket.emit('join_room', room);
    }
    return (
        <div>
            {!loggedIn? (
                <div>
                    <h1 className="display-5">Let's Chat
                    <span><FontAwesomeIcon icon={faComments} /></span></h1>
                    
                <form onSubmit={connectToRoom}>
                        <Container className="login">
                            <Row>
                                <Col><input type="text" placeholder="Enter Your Name.." onChange={(e)=>{setUserName(e.target.value)}}/></Col>
                                <Col><input type="text" placeholder="Enter Room.." onChange={(e)=>{setRoom(e.target.value)}}/></Col>
                            </Row>
                            <Row> <button>Start Chat</button> </Row>
                        </Container>
                    </form> 
                </div>    
            ) : (
                <Chat user={userName} room={room} socket={socket}/>
            )}
        </div>
        
        
    );
}

export default Login;