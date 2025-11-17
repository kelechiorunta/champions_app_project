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

        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}

export default App;
