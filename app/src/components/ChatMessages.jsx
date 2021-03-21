import React from 'react'
import {useSubscription} from '@apollo/client'
import { GET_MESSAGE } from '../type'
// import { useQuery } from "@apollo/client";



 let ChatMessages = ({user}) => {

    const {data} = useSubscription(GET_MESSAGE)

    if(!data){
        return null
    } else {
        return (
            <>
            {data.messages && data.messages.map(({ id, user: messageUser, content }) => (
              <div 
                key={id}
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
                    justifyContent:
                      user === messageUser ? "flex-end" : "flex-start",
                  }}
                >
                  {content}
                  
                </div>
              </div>
            ))}
          </>
        )
    }
    
 
}

export default ChatMessages