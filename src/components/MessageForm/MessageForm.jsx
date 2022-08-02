import React, { useState, useContext, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Col, Form, Row } from "react-bootstrap";
import Picker from "emoji-picker-react";
import { FaRegSmileBeam } from "react-icons/fa";
import { AppContext } from "../../context/appContext";
import { getFormattedDate } from "../../utils/functions/getFormattedDate";
import styles from "./MessageForm.module.scss";

export const MessageForm = () => {
  const messageEndRef = useRef(null);
  const [message, setMessage] = useState("");
  const [isChooseEmoji, setIsChooseEmoji] = useState(false);

  const user = useSelector((state) => state.user);

  const { socket, currentRoom, setMessages, messages, privateMemberMessages } =
    useContext(AppContext);

  const todayDate = getFormattedDate();

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onEmojiClick = (event, emojiObject) => {
    const messageItems = message + emojiObject.emoji;
    setMessage(messageItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isChooseEmoji) {
      setIsChooseEmoji(false);
    }

    if (!message) return;

    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;

    socket.emit("message-room", roomId, message, user, time, todayDate);
    setMessage("");
  };

  const handleClickEmoji = () => {
    setIsChooseEmoji((prev) => !prev);
  };

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    setMessages(roomMessages);
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className={styles.messages_output}>
        {user && !privateMemberMessages?._id && (
          <div className={styles.info_alert}>
            You are in the
            <span className={styles.info_text}>{currentRoom}</span>room.
          </div>
        )}
        {user && privateMemberMessages?._id && (
          <div className={styles.info_alert}>
            <div>
              Your conversation with {privateMemberMessages.name}
              <img
                src={privateMemberMessages.picture}
                alt="picture_member"
                className={styles.conversation_img}
              />
            </div>
          </div>
        )}
        {!user && <div className="alert alert-danger">Please login</div>}
        {user &&
          messages?.map(({ _id: date, messagesByDate }, index) => (
            <div key={index}>
              <div className={styles.alert_date_indicator}>
                <span className={styles.date}>{date}</span>
              </div>
              {messagesByDate?.map(
                ({ content, time, from: sender }, msgIndex) => (
                  <div
                    className={
                      sender?.email === user?.email
                        ? styles.message
                        : styles.incoming_message
                    }
                    key={msgIndex}
                  >
                    <div className={styles.message_inner}>
                      <div className={styles.container_message}>
                        <img
                          src={sender.picture}
                          className={styles.image}
                          alt="sender_photo"
                        />
                        <p className={styles.message_sender}>
                          {sender._id === user?._id ? "You" : sender.name}
                        </p>
                      </div>
                      <p className={styles.message_content}>{content}</p>
                      <p className={styles.message_timestamp_left}>{time}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
        <div ref={messageEndRef}></div>
      </div>
      <Form onSubmit={(e) => handleSubmit(e)} className={styles.messages}>
        <Row>
          <Col md={10}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Your message"
                disabled={!user}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col
            md={1}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className={styles.emoji_content}>
              <FaRegSmileBeam onClick={handleClickEmoji} />

              {isChooseEmoji ? (
                <div className={styles.emoji}>
                  <Picker
                    onEmojiClick={onEmojiClick}
                    style={{ position: "absolute" }}
                  />
                </div>
              ) : null}
            </div>
          </Col>
          <Col md={1}>
            <Button
              variant="primary"
              type="submit"
              className={styles.button}
              style={{ width: "100%", backgroundColor: "orange" }}
              disabled={!user}
            >
              <i className="fas fa-paper-plane"></i>
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};
