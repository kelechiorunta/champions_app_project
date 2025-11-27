import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import Login from '../LoginPage/Login';
import { AlertDialog, Spinner } from '@radix-ui/themes';
import Login from '../LoginPage/Login';
import { CrossCircledIcon } from '@radix-ui/react-icons';

// import Login from '../LoginPage/Login';

export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true); // start as true
  const [currentUser, setCurrentUser] = useState<object | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/proxy/auth/isAuthenticated', {
          credentials: 'include',
          method: 'GET'
        });

        const contentType = response.headers.get('content-type');

        let data;
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        } else {
          // fallback for HTML/plain responses
          const text = await response.text();
          console.log(text);
          data = { error: 'Unauthorized. Please login.' };
        }

        if (!response.ok || !data.user) {
          // prefer backend-provided error message
          throw new Error(data.error || 'Unauthorized');
        }

        setCurrentUser(data.user);
        setIsAuthenticated(true);

        const alreadyRedirected = localStorage.getItem('redirectedOnce');
        console.log('Redirect', alreadyRedirected);
        // localStorage.removeItem('redirectedOnce');
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message || 'Something went wrong');
        } else {
          console.error('An unexpected error occurred');
        }

        setIsAuthenticated(false);
        setCurrentUser(null);
        // localStorage.removeItem('entry');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [isAuthenticated, location]);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1220);
  const [isCollapsible, setIsCollapsible] = useState(window.innerWidth < 400);

  // 🔥 Watch window resize and update `isMobile`
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1220);
      setIsCollapsible(window.innerWidth < 400);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, isCollapsible]);

  const newUser = { currentUser, isMobile, isCollapsible };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          inset: 0,
          justifyContent: 'center',
          alignItems: 'center',
          width: '85%',
          minHeight: '100vh',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          maxWidth: '85%'
        }}
      >
        {/* <Skeleton loading={true} width={'500px'} height={'100vh'}> */}
        {/* <Heading>Hello World</Heading> */}
        <Spinner />
        {/* <Login /> */}
        {/* </Skeleton> */}
      </div>
    );
  }

  // if (!isAuthenticated) {

  //   return <Navigate to="/login" state={{ path: location.pathname }} replace key={'/login'} />;
  // }

  // return <Outlet context={newUser} />;

  // Only redirect once per user session
  // const alreadyRedirected = localStorage.getItem('redirectedOnce');

  if (!isAuthenticated || !currentUser) {
    // Uncomment this for cached routing
    // if (!alreadyRedirected) {
    // Mark that we've redirected
    localStorage.setItem('redirectedOnce', 'true');

    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
    // }

    // We have already redirected → just show the login page as-is

    return (
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
          <AlertDialog.Cancel style={{ float: 'right', position: 'absolute', right: 20, top: 20 }}>
            <CrossCircledIcon />
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      </AlertDialog.Root>
    );
  }

  // User is authenticated again → reset redirect flag
  // sessionStorage.removeItem('redirectedOnce');

  return <Outlet context={newUser} />;
}
