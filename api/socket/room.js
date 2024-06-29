import { v4 } from "uuid";

 export default function Rooms(){
    const rooms = new Map();

    const addRoom = () => {
    const roomId = v4();
    rooms.set(roomId,[]);
    return roomId;
    }

    const addUserToRoom = (roomId, user) => {
    const users = rooms.get(roomId);
    rooms.set(roomId, [...users, user]);
    }

    const checkUser = (roomdId, user) => {
    const usersList = rooms.get(roomdId);
    return usersList.filter( (userData) =>  userData.email === user.email)
    }

    return {rooms, addRoom, addUserToRoom, checkUser}
 }