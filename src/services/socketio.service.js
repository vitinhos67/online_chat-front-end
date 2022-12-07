import { io } from 'socket.io-client';



class SocketioService {
  
  constructor() {
    this.socket;
  }

  connection() {
    const host = process.env.VUE_APP_SOCKET_ENDPOINT
    this.socket = io(host, {
        autoConnect: true,
        
    })
    return this.socket
  }
}

export default new SocketioService();