import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Orders from './components/Orders/Orders';
import ContactsPage from './components/Contacts/ContactsPage';
import ProductLists from './components/Products/ProductLists';
import ViewOrderScreen from './components/Orders/ViewOrderScreen';
import Login from './components/LoginPage/Login';
import { useEffect } from 'react';
import axios from 'axios';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Signup from './components/SignupPage/Signup';
import Settings from './components/Settings/Settings';
import { AlertDialog } from '@radix-ui/themes';
import { CrossCircledIcon } from '@radix-ui/react-icons';

function App() {
  useEffect(() => {
    const testAPI = async () => {
      try {
        const response = await axios.get('/proxy');
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    testAPI();
  });
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          {/* default nested route */}
          <Route index element={<Home />} />
          <Route path="products" element={<ProductLists />} />
          <Route path="orders" element={<Orders />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="orders/:id" element={<ViewOrderScreen />} />
          <Route path="groups" element={<Login />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route
          path="login"
          element={
            <AlertDialog.Root defaultOpen>
              <AlertDialog.Content
                width={{ initial: '100%', xs: '100%', sm: '75%', md: '75%', lg: '75%' }}
                height={'90%'}
                maxHeight={'90%'}
                maxWidth={{ initial: '100%', xs: '100%', sm: '75%', md: '75%', lg: '75%' }}
                style={{
                  padding: 4,
                  // placeItems: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Login />
                <AlertDialog.Cancel
                  style={{ float: 'right', position: 'absolute', right: 20, top: 20 }}
                >
                  <CrossCircledIcon />
                </AlertDialog.Cancel>
              </AlertDialog.Content>
            </AlertDialog.Root>
          }
        />
        <Route
          path="signup"
          element={
            <AlertDialog.Root defaultOpen>
              <AlertDialog.Content
                width={{ initial: '95%', xs: '95%', sm: '75%', md: '75%', lg: '75%' }}
                height={'90%'}
                maxHeight={'90%'}
                maxWidth={{ initial: '95%', xs: '90%', sm: '75%', md: '75%', lg: '75%' }}
                style={{
                  padding: 4,
                  // placeItems: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Signup />
                <AlertDialog.Cancel
                  style={{ float: 'right', position: 'absolute', right: 20, top: 20 }}
                >
                  <CrossCircledIcon />
                </AlertDialog.Cancel>
              </AlertDialog.Content>
            </AlertDialog.Root>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
