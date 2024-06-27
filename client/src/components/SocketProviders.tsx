import { createContext, useContext } from "react";;
import { io } from 'socket.io-client';

type SockeProviderProps = {
    children: React.ReactNode
}

const SocketContext = createContext(1);

export function SocketProvider({children} : SockeProviderProps){
    const URL = "http://localhost:3000";
    const socket = io(URL, { autoConnect: true});

    const value = 1;
    return (
        <SocketContext.Provider value={value}>
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