import { createContext, useContext } from "react";;
import { io } from 'socket.io-client';
import { useSelector } from "react-redux";

type SockeProviderProps = {
    children: React.ReactNode
}

const SocketContext = createContext(1);

export function SocketProvider({children} : SockeProviderProps){
    const { currentUser } = useSelector( ( state ) => state.user);
    const URL = "http://localhost:3000";
    const socket = io(URL, { autoConnect: true});


    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
    const context = useContext(SocketContext);

    if (useSocket === undefined)
        throw new Error('useSocket must be use with a socket provider');

    return context;
}