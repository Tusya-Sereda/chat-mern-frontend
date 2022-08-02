import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigation } from "./components/Navigation/Navigation";
import { Home } from "./pages/Home/Home";
import { Signup } from "./pages/Signup/Signup";
import { Login } from "./pages/Login/Login";
import { Chat } from "./pages/Chat/Chat";
import { AppContext, socket } from "./context/appContext";
import "./App.css";

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMessages, setPrivateMemberMessages] = useState({});
  const [newMessages, setNewMessages] = useState({});

  const user = useSelector((state) => state.user);

  return (
    <AppContext.Provider
      value={{
        socket,
        currentRoom,
        setCurrentRoom,
        members,
        setMembers,
        messages,
        setMessages,
        privateMemberMessages,
        setPrivateMemberMessages,
        rooms,
        setRooms,
        newMessages,
        setNewMessages,
      }}
    >
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
