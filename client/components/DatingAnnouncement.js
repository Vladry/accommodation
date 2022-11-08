import React, {useEffect, useState} from 'react';
import stompClient from '../pages/_app';
import urls from '../../src/main/resources/urls.json';
import {useSelector} from "react-redux";
import sel from '../store/selectors';


const DatingAnnouncement = () => {
    const [datingAnnouncement, setDatingAnnouncement] = useState({message: ''})
    const [stompDatingAnnouncement, setStompDatingAnnouncement] = useState({message: ''})
    const user = useSelector(sel.user);
    const stompClient = useSelector(sel.stompClient);
    let userId = 19;

    const handleInput = (e) => {
        setDatingAnnouncement(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    const sendDatingAnnouncement = (e) => {
        e.preventDefault();
        /*        fetch('http://localhost:8000/datingAnnouncement', {
                    method: 'POST',
                    body: JSON.stringify(serverDatingAnnouncement),
                    headers: {'Content-Type': 'application/json'}
                }).then(()=>{})*/

        stompClient.publish({
            destination: `${urls.privateMessages}${userId}`,
            body:
                JSON.stringify({
                    ...datingAnnouncement,
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

export default DatingAnnouncement;