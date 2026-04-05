// custom hook for socket events
import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";

// Usage: useSocketEvent("new_incident", (data) => setIncidents(prev => [data, ...prev]))
export function useSocketEvent(eventName, callback) {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on(eventName, callback);
    return () => socket.off(eventName, callback);
  }, [socket, eventName, callback]);
}
