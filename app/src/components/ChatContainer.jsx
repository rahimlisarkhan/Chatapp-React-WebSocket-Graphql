import React, { useState, useEffect } from "react";
import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
  useMutation,
} from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import ChatMessages from "./ChatMessages";
import { FaRegSmileBeam } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { POST_MESSAGE } from "../type";

const link = new WebSocketLink({
    uri: 'ws://localhost:4000/',
    options: {
      reconnect: true
    }
  });


const client = new ApolloClient({
  link,
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});


let ChatContainer = () => {
  useEffect(() =>{ 
      user()
    },[]);

  //hooks
  const [state, setState] = useState({
    user:"",
    content: "",
  });

  const [postMessage] = useMutation(POST_MESSAGE);

  //actions
  const onSend = () => {
    if (state.content.length > 0) {
      postMessage({ variables: state });
    }

    setState({ ...state, content: "" });
  };

  const user = () => {
    localStorage.clear();
    let username = prompt("Please enter your name", "Your Name");
       if  (username != null){
                localStorage.setItem("username", username.toLowerCase());
                setState({ ...state, user: username })
       }
  };


  return (
      <div className="messages-container">
          <h1 className='messages-container__header'>Chat Group</h1>
        <div className="messages-container__content">
          <ChatMessages user={state.user} />
        </div>

        <div className="messages-container__post">
          <span>
            <FaRegSmileBeam />
          </span>
          <input
            type="text"
            placeholder="Write username"
            value={state.user}
            onChange={(e) =>
              setState({ ...state, user: e.target.value.toLowerCase() })
            }
          />
          <textarea
            name="text"
            value={state.content}
            placeholder="Write text"
            onKeyUp={(e) => e.keyCode === 13 && onSend()}
            onChange={(e) => setState({ ...state, content: e.target.value })}
          >
            {" "}
          </textarea>

          <button onClick={() => onSend()}>
            <MdSend />
          </button>
        </div>
      </div>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <ChatContainer />
  </ApolloProvider>
);
