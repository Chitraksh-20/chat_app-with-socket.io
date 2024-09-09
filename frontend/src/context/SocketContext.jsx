import { createContext, useEffect, useState, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

// Create a context for Socket.IO
const SocketContext = createContext();

// Custom hook to use the SocketContext
export const useSocketContext = () => {
  return useContext(SocketContext);
};

// Provider component for SocketContext
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    // Check if user is authenticated
    if (authUser) {
      // Create a new socket connection
      const socket = io("http://localhost:5000", {
        query: {
          userId: authUser._id
        }
      });

      setSocket(socket);

      // Listen for the "getOnlineUsers" event
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // Cleanup function to close the socket connection
      return () => {
        socket.close(); // Ensure the socket is properly closed
      };
    } else {
      // Close the socket if the user logs out
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]); // Ensure the effect runs when authUser changes

  // Provide socket and onlineUsers to children components
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
