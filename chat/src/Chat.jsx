import React, { useState } from "react";
import { MdSend } from "react-icons/md";
import { FaRegSmileBeam } from "react-icons/fa";
import Messages from "./Messages";
import {ApolloClient,InMemoryCache,ApolloProvider,useMutation} from "@apollo/client";
import { POST_MESSAGE } from "./type";


//client
const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});


//chat
const Chat = () => {

  //hooks
  const [state, setState] = useState({
    user: "jack",
    content: "",
  });

  const [postMessage] = useMutation(POST_MESSAGE)

  const onSend = () => {
    if (state.content.length > 0){
      postMessage({
        variables:state
      })
    }

    setState({
      ...state,
      content:''
    })
  }


  return (
    <div className="messages-container">
      <div className="messages-container__content">
        <Messages user={state.user} />
      </div>

      <div className="messages-container__post">
        <span>
          <FaRegSmileBeam />
        </span>
        <input
          type="text"
          placeholder='Write username'
          value={state.user}
          onChange={(e) => setState({ ...state, user: e.target.value.toLowerCase() })}
        />
        <textarea
          name="text"
          value={state.content}
          placeholder='Write text'
          onKeyUp={e => e.keyCode === 13 && onSend() }
          onChange={(e) => setState({ ...state, content: e.target.value })}
        ></textarea>

        <button onClick={() => onSend()}>
          <MdSend />
        </button>
      </div>
    </div>
  );
};



export default () => (
  <ApolloProvider client={client}>
    <Chat />
  </ApolloProvider>
);
