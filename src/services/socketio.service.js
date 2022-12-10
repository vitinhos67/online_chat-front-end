import { io } from "socket.io-client";

class SocketioService {
  constructor() {
    this.socket;
  }

  connection() {
    this.socket = io("http://localhost:3000/users", {
      autoConnect: true,
    });
    return this.socket;
  }
}

export default new SocketioService();
