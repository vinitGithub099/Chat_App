import { io } from "socket.io-client";
import { ENDPOINT } from "./constants/constants";

export default class SocketClient {
  socket;

  connect(data) {
    this.socket = io.connect(ENDPOINT, {
      transports: ["websocket"],
    });
    return new Promise((resolve, reject) => {
      this.socket.emit("setup", data);
      this.socket.on("connected", (error) =>
        error ? reject(error) : resolve()
      );
    });
  }

  disconnect() {
    return new Promise((resolve) => {
      this.socket.disconnect(() => {
        this.socket = null;
        resolve();
      });
    });
  }

  emit(event, data) {
    return new Promise((resolve, reject) => {
      if (!this.socket || !this.socket.connected)
        return reject("No socket connection.");
      try {
        this.socket.emit(event, data);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  on(event, callBack) {
    return new Promise((resolve, reject) => {
      if (!this.socket || !this.socket.connected)
        return reject("No socket connection.");
      const eventCallback = (data) => {
        try {
          callBack(data, resolve, reject);
        } catch (error) {
          reject(error);
        }
      };
      this.socket.on(event, eventCallback);
    });
  }
}
