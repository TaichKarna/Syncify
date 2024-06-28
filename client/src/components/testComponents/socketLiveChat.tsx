import { useState } from "react";
import { useSocket } from "../SocketProviders";


export default function LiveChat(){
    const socket = useSocket();
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState('');
    const [connection, setConnection] = useState('disconnect');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(msg === '') return;
        socket.emit('chat message', msg);
        setMsg('');
    }
    socket.on('chat message', (msg) => {
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
    
    return (
        <div className="flex justify-center flex-col gap-5">
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
    );
}