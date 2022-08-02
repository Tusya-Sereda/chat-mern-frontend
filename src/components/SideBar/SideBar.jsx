import React, { useContext, useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { addNotifications, resetNotifications } from "../../redux/userSlice";

import { AppContext } from "../../context/appContext";
import styles from "./SideBar.module.scss";

const TOAST_OPTIONS = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export const SideBar = () => {
  const dispatch = useDispatch();
  const {
    socket,
    setMembers,
    members,
    setCurrentRoom,
    setRooms,
    privateMemberMessages,
    rooms,
    setPrivateMemberMessages,
    currentRoom,
  } = useContext(AppContext);
  const user = useSelector((state) => state.user);

  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });

  const getRooms = () => {
    fetch("https://chat-mem.herokuapp.com/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  };

  const joinRoom = (room, isPublic = true) => {
    if (!user) {
      toast.error("Please login!", TOAST_OPTIONS);
    }

    socket.emit("join-room", room, currentRoom);
    setCurrentRoom(room);

    if (isPublic) {
      setPrivateMemberMessages(null);
    }

    //dispatch for notifications
    dispatch(resetNotifications(room));
  };

  socket.off("notifications").on("notifications", (room) => {
    if (currentRoom !== room) {
      dispatch(addNotifications(room));
    }
  });

  const orderIds = (id1, id2) => {
    if (id1 > id2) {
      return id1 + "-" + id2;
    } else {
      return id2 + "-" + id1;
    }
  };

  const handlerPrivateMessage = (member) => {
    setPrivateMemberMessages(member);
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
  };

  useEffect(() => {
    if (user) {
      setCurrentRoom("general");
      getRooms();
      socket.emit("join-room", "general");
      socket.emit("new-user");
    }
    // eslint-disable-next-line
  }, [user]);

  if (!user) {
    return <></>;
  }

  return (
    <>
      <h2 className={styles.mainText}>Available Rooms</h2>
      <ListGroup>
        {rooms.map((room, index) => (
          <ListGroup.Item
            key={index}
            onClick={() => joinRoom(room)}
            style={{ cursor: "pointer" }}
            active={room === currentRoom}
          >
            {room}
            {currentRoom !== room && (
              <span className="badge rounded-pill bg-primary">
                {user.newMessages[room]}
              </span>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h2 className={styles.mainText}>Members</h2>
      <ListGroup>
        {members?.map((member) => (
          <ListGroup.Item
            key={member._id}
            className={styles.member_items}
            style={{ cursor: "pointer" }}
            active={privateMemberMessages?._id === member?._id}
            onClick={() => handlerPrivateMessage(member)}
            disabled={member?._id === user?._id}
          >
            <Row>
              <Col xs={2} className={styles.member_status}>
                <img
                  src={member.picture}
                  className={styles.status_img}
                  alt=""
                />
                {member.status === "online" ? (
                  <i
                    className="fas fa-circle sidebar-online-status"
                    style={{
                      color: "green",
                      fontSize: "11px",
                      position: "absolute",
                      zIndex: 99,
                      bottom: 0,
                      left: "12px",
                    }}
                  ></i>
                ) : (
                  <i
                    className="fas fa-circle sidebar-offline-status"
                    style={{
                      color: "yellow",
                      fontSize: "11px",
                      position: "absolute",
                      zIndex: 99,
                      bottom: 0,
                      left: "12px",
                    }}
                  ></i>
                )}
              </Col>
              <Col xs={9}>
                {member.name} {member._id === user._id && " (You) "}
                {member.status === "offline" && " (Offline) "}
              </Col>
              <Col xs={1}>
                <span className="badge rounded-pill bg-primary">
                  {user.newMessages[orderIds(member._id, user._id)]}
                </span>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <ToastContainer />
    </>
  );
};
