// import { Box } from '@radix-ui/themes';
import Dashboard from '../Dashboard/Dashboard';
import { useOutletContext } from 'react-router-dom';

export type userTypes = {
  username?: string;
  email?: string;
  picture?: string;
};

export interface User {
  currentUser: userTypes;
}

export default function Home() {
  const { currentUser } = useOutletContext<User>();
  return (
    <Dashboard
      picture={currentUser ? currentUser.picture : ''}
      username={currentUser ? currentUser.username : ''}
      email={currentUser ? currentUser.email : ''}
    />
  );
}
