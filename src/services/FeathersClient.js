/* eslint-disable no-undef */
import feathers from "@feathersjs/client";
import socketio from "@feathersjs/socketio-client";

import io from "socket.io-client";

const URL = import.meta.env.VITE_SOCKET_URL;
const PATH = import.meta.env.VITE_API_PATH_SOCKET;

const socket = io(`${URL}`, {
  transports: ["websocket"],
  forceNew: true,
  path: `${PATH}`,
});

const client = feathers();
const socketClient = socketio(socket);
client.configure(socketClient);

export default client;
