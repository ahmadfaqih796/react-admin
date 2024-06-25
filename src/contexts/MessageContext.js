import React, { createContext, useContext, useState } from "react";
import ChatContainer from "../components/chats/ChatContainer";
import client from "../services/FeathersClient";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [state, setState] = useState({
    isOpen: false,
    dataClient: {},
    refetch: false,
  });
  const { dataClient } = state;

  return (
    <MessageContext.Provider value={[state, setState]}>
      {children}
      <ChatContainer
        isOpen={state.isOpen}
        clientId={dataClient?.id}
        projectName={dataClient?.projectName}
      />
    </MessageContext.Provider>
  );
};

export function useComment() {
  const [state, setState] = useContext(MessageContext);

  const setOpenChat = () => {
    setState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const onClose = () => {
    client.service("rooms").create({
      clientId: state?.dataClient?.id,
      action: "leave",
    });
    setState((prev) => ({ ...prev, isOpen: !prev.isOpen, dataClient: {} }));
  };

  const setDataClient = (dataClient) => {
    setState((prev) => ({ ...prev, dataClient }));
  };

  const getDataClient = state?.dataClient;

  const refetch = () => {
    setState((prev) => ({ ...prev, refetch: !prev.refetch }));
  };

  const cancelRefetch = () => {
    setState((prev) => ({ ...prev, refetch: false }));
  };

  return {
    state,
    isOpen: state.isOpen,
    dataClient: getDataClient,
    setOpenChat,
    onClose,
    setDataClient,
    refetch,
    cancelRefetch,
  };
}
