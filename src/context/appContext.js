import { createContext } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "https://chat-mem.herokuapp.com/";

//app content
export const AppContext = createContext();

export const socket = io(SOCKET_URL);
