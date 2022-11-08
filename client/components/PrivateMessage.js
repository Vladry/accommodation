import React, {useState} from 'react';

const PrivateMessage = ({id}) => {
    const [privateMessage, setPrivateMessage] = useState({message: ''})

    const handleInput = (e) => {
        setPrivateMessage(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const sendMessage = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8000/privateMessage/${id}`, {
            method: 'POST',
            body: JSON.stringify(privateMessage),
            headers: {'Content-Type': 'application/json'}
        }).then(()=>{})
    }


    return (
        <form onSubmit={sendMessage}>
            <input onChange={handleInput} placeholder="Enter message" name="message" type="text"/>
            <button>Send private message</button>

        </form>
    );
};

export default PrivateMessage;