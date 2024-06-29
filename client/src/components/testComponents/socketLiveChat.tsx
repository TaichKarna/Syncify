import { useEffect, useState } from "react";
import { useSocket } from "../SocketProviders";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


export default function LiveChat(){
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState('');
    const [connection, setConnection] = useState('disconnect');
    const socket = useSocket();
    const {roomId} = useParams();
    const {currentUser} = useSelector(state => state.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(msg === '') return;
        setMessages([...messages,msg]);
        socket.emit('chat message', currentUser, msg, roomId);
        setMsg('');
    }
    socket.on('chat message', (user, msg) => {
        setMessages([...messages,msg]);
    })

    const handleClick = () => {
        if(socket.connected){
            setConnection('connect');
            socket.disconnect();
        } else {
            socket.connect();
            setConnection('disconnect');
        }
    }

    const constraints = {
        'video' : true,
        'audio' : true
    }

    useEffect( () => {

    },[])
    
    return (
        <div className="flex justify-between w-full flex-row gap-5 p-5 ">
            <div className="flex flex-col">
                <button className="w-20 h-10 text-white bg-black hover:bg-slate-600">Call</button>
            </div>
            <div>
            <ul className="text-center">
                {
                    messages && (
                        messages.map( msg => (
                            <li key={msg}>{msg}</li>
                        ))
                    )
                }
            </ul>
            <form className="flex gap-4 justify-center" onSubmit={handleSubmit}>
                <input type="text" id="chat" value={msg} onChange={(e) => setMsg(e.target.value)} className="bg-white border-2 border-black text-black w-30 h-10"/>
                <button type="submit" className="w-14 h-10 bg-black text-bold text-white">Send</button>
                <button type="button" onClick={handleClick} className="w-20 h-10 bg-black text-bold text-white">{connection}</button>
            </form>
            </div>
        </div>
    );
}