import { Outlet } from 'react-router-dom';
// import HeaderNav from '../HeaderNav/HeaderNav';
import SideNav from '../SideNav/SideNav';
import { Flex } from '@radix-ui/themes';
import './Layout.css';
import { useEffect, useState } from 'react';

export default function Layout() {
  // const [mobileView, setMobileView] = useState('sidebar'); // start on sidebar
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

  // const [isIconBarOpen, setIsIconBarOpen] = useState(!isCollapsible);

  // useEffect(() => {
  //   setIsIconBarOpen(!isCollapsible); // auto-collapse when screen < 400px
  // }, [isCollapsible]);
  return (
    <Flex className="container" height={'100%'} maxHeight={'100vh'} overflow={'auto'}>
      {/* <HeaderNav /> */}
      <SideNav isMobile={isMobile} isCollapsible={isCollapsible} />
      <Outlet context={{ isMobile, isCollapsible }} />
    </Flex>
  );
}
