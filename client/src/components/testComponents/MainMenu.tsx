import { useState } from "react"
import { useSocket } from "../SocketProviders";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

type choices = "options" | "create-room" | "join-room";

export default function MainMenu(){
    const {currentUser} = useSelector( state => state.user);
    const socket = useSocket();
    const navigate = useNavigate();
    const [choice, setChoice] = useState("options");
    const [roomId, setRoomId] = useState('');

    const joinRoom = (e) => {
        e.preventDefault();
        navigate(`/room/${roomId}`);
    }

    const handleRoomCreate = async () => {
        try {
            const res = await socket.timeout(10000).emitWithAck('room create', currentUser )
            navigate(`/room/${res}`);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="flex flex-col justify-center items-center gap-6 ">
            <h1 className="text-4xl">Welcome to Syncify</h1>
            {
                choice === 'options' && 
                (
                    <div className="flex gap-4">
                    <button className="w-30 h-10 bg-black text-bold text-white p-2 hover:bg-slate-500" onClick={handleRoomCreate}>
                        Create a room
                    </button>
                    <button className="w-30 h-10 bg-black text-bold text-white p-2 hover:bg-slate-900" onClick={() => setChoice('join-room')}>
                        Join a room
                    </button>
                    </div>
                )
            }
            {
                choice === 'join-room' && 
                (
                    <div>
                        <form className="flex flex-col gap-3" onSubmit={joinRoom}>
                            <label>Enter room-id</label>
                            <input className="w-full border-black border-2" onChange={(e) => setRoomId(e.target.value)}/>
                            <button className="bg-black text-white">Join</button>
                        </form>
                    </div>
                )
            }
        </div>
    )
}