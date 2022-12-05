import React, {useEffect, useState} from 'react';
import stompClient from '../pages/_app';
import urls from '../../src/main/resources/urls.json';
import {useSelector} from "react-redux";
import sel from '@/store/user/selectors';


const MessageCreator = () => {
    const [message, setMessage] = useState({})
    const user = useSelector(sel.user);
    const stompClient = useSelector(sel.stompClient);
    let userId = 19;

    const handleInput = (e) => {
        setMessage(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    const sendDatingAnnouncement = (e) => {
        e.preventDefault();
// отправка сообщения через бЭк:
                fetch('http://localhost:8000/datingAnnouncement', {
                    method: 'POST',
                    body: JSON.stringify(message),
                    headers: {'Content-Type': 'application/json'}
                }).then(()=>{})


// отправка сообщения через фронтОвый брокер:
if(stompClient && stompClient.connected) {console.log("stompClient not connected or not subscribed. Exiting."); return;}
        stompClient.publish({
            destination: `${urls.privateMessages}${userId}`,
            body:
                JSON.stringify({
                    ...message,
                    fromId: "fromId",
                    toId: "toId",
                    subject: "subject"
                })
            ,
            headers: {'content-type': 'application/json'},
            skipContentLengthHeader: true,
        });
    }


    return (
        <form onSubmit={sendDatingAnnouncement}>
            <input onChange={handleInput} placeholder="type your message here"
                   name="message" type="text"/>
            <button>Send DatingAnnouncement</button>
        </form>
    );
};

export default MessageCreator;