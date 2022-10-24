import { useSocket } from 'hooks/useSocket';
import { createContext } from 'react';

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { socket } = useSocket('http://localhost:4000/dashboard');
  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
