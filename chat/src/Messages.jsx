import React from "react";
import {GET_MESSAGES} from './type'
import { useQuery } from "@apollo/client";

const Messages = ({ user }) => {
  
    const { data } = useQuery(GET_MESSAGES,{
      pollInterval:500,});


  if (!data) {
    return null;
  } else {
    return (
      <>
        {data.messages.map(({ id, user: messageUser, content }) => (
          <div
            className="messages-content"
            style={{
              display: "flex",
              justifyContent: user === messageUser ? "flex-end" : "flex-start",
              paddingBottom: "1rem",
            }}
          >
            {user !== messageUser && (
              <div className="messageUser">{messageUser.slice(0, 2)}</div>
            )}

            <div
              className="messages-content__text"
              style={{
                background:
                  user === messageUser ? "rgb(156,86,250)" : "rgb(236,92,248)",
                color: user === messageUser ? "white" : "white",
                borderRadius:
                  user === messageUser
                    ? " 2rem 0 2rem 2rem"
                    : "0 2rem 2rem 2rem",
                textAlign: user === messageUser ? " right" : "left",
                justifyContent:
                  user === messageUser ? "flex-end" : "flex-start",
              }}
            >
              {content}
              
            </div>
          </div>
        ))}
      </>
    );
  }
};

export default Messages;
