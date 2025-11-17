import { Avatar, Flex, IconButton, Text, Tooltip, Tabs, Separator, Box } from '@radix-ui/themes';
import { useState } from 'react';
import {
  ChatBubbleIcon,
  PersonIcon,
  GroupIcon,
  GearIcon,
  ExitIcon,
  HamburgerMenuIcon,
  DashboardIcon,
  MoonIcon,
  SunIcon,
  BarChartIcon,
  BackpackIcon
} from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../ThemeContext/useThemeContext';
import { usePathContext } from '../PathContext/usePathContext';
// import Settings from '../Settings/Settings';

export interface sideNavProps {
  isMobile: boolean;
  isCollapsible: boolean;
}

export default function SideNav({ isMobile, isCollapsible }: sideNavProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  const { appearance, toggleAppearance } = useThemeContext();

  const { changePath } = usePathContext();

  const menuItems = [
    { value: 'dashboard', icon: <DashboardIcon />, label: 'Dashboard', page: '/' },
    { value: 'orders', icon: <BarChartIcon />, label: 'Orders', page: '/orders' },
    { value: 'products', icon: <BackpackIcon />, label: 'Products', page: '/products' },
    { value: 'chats', icon: <ChatBubbleIcon />, label: 'Chats', page: '/products' },
    { value: 'contacts', icon: <PersonIcon />, label: 'Contacts', page: '/contacts' },
    { value: 'groups', icon: <GroupIcon />, label: 'Groups', page: '/groups' },
    { value: 'settings', icon: <GearIcon />, label: 'Settings', page: '/settings' }
  ];

  // Handle navigation when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const selected = menuItems.find((item) => item.value === value);
    if (selected?.page) {
      navigate(selected.page, { replace: true });
      changePath(selected.page as string);
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      window.location.href = '/proxy/auth/logout';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex
      direction="column"
      justify="between"
      align="baseline"
      style={{
        width: collapsed || isMobile ? '70px' : '200px',
        maxWidth: '200px',
        height: '100vh',
        borderRight: '1px solid var(--gray-a5)',
        backgroundColor: 'var(--gray-1)',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        // position: 'fixed',
        left: 0,
        top: 0,
        position: isCollapsible ? 'fixed' : 'relative',
        zIndex: isCollapsible ? 50 : 0
      }}
    >
      {/* TOP SECTION */}
      <Flex direction="column" align="center" gap="3" p="3" width="100%">
        {/* Header */}
        <Flex
          align="center"
          justify={collapsed || isMobile ? 'center' : 'between'}
          style={{ padding: collapsed || isMobile ? 8 : 0, width: '100%' }}
        >
          {!collapsed && !isMobile && (
            <Flex align="center" gap="2">
              <Avatar src="/Champions.png" fallback="A" radius="full" size="2" />
              <Text weight="bold">Champions</Text>
            </Flex>
          )}
          <IconButton
            variant="ghost"
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle Sidebar"
          >
            <HamburgerMenuIcon />
          </IconButton>
        </Flex>

        <Separator size="4" />

        {/* ✅ Tabs that navigate on click */}
        <Tabs.Root value={activeTab} onValueChange={handleTabChange} orientation="vertical">
          <Tabs.List
            style={{
              display: 'flex',
              flexDirection: 'column'
              //   gap: '4px',
              //   maxWidth: '200px',
              //   marginTop: '1rem'
              //   marginLeft: '-5px'
            }}
          >
            {menuItems.map(({ value, icon, label }) => (
              <Tooltip key={value} content={label} side="right" delayDuration={300}>
                <Tabs.Trigger
                  value={value}
                  style={{
                    all: 'unset',
                    background: activeTab === value ? 'var(--gray-4)' : 'transparent',
                    borderRadius: '8px',
                    padding: '8px 8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed || isMobile ? 'center' : 'flex-start',
                    gap: collapsed || isMobile ? '0' : '0px',
                    color: activeTab === value ? 'var(--accent-11)' : 'var(--gray-11)',
                    cursor: 'pointer',
                    fontWeight: 500,
                    transition: 'background 0.2s ease'
                    // marginLeft: '-2rem'
                  }}
                >
                  <Flex justify={'between'} gap={'2'} align={'center'}>
                    {icon}
                    {!isMobile && !collapsed && <Text size="2">{label}</Text>}
                  </Flex>
                </Tabs.Trigger>
              </Tooltip>
            ))}
            {/* <Settings /> */}
          </Tabs.List>
          {/* Help description of tabs */}
          {!collapsed && !isMobile && (
            <Box pt="3">
              <Tabs.Content value="dashboard">
                <Text size="1">View current trends in your dashboard.</Text>
              </Tabs.Content>

              <Tabs.Content value="orders">
                <Text size="1">Access and update your orders.</Text>
              </Tabs.Content>

              <Tabs.Content value="products">
                <Text size="1">Access all your products. Search and add new products too.</Text>
              </Tabs.Content>

              <Tabs.Content value="chats">
                <Text size="1">Access and update your products.</Text>
              </Tabs.Content>

              <Tabs.Content value="contacts">
                <Text size="1">View contacts information. Search and add contacts.</Text>
              </Tabs.Content>

              <Tabs.Content value="groups">
                <Text size="1">View login information. Search and add groups.</Text>
                <Flex direction={'column'} gap={'2'}>
                  <div style={{ width: '100%', height: '170px' }}>
                    <iframe
                      src="https://rotating-cube-demo-app.vercel.app/"
                      style={{
                        width: '100%',
                        height: '100%',
                        border: '0',
                        scale: 0.95
                      }}
                      allow="fullscreen"
                    />
                  </div>
                </Flex>
              </Tabs.Content>

              <Tabs.Content value="settings">
                <Text size="1">Select from the Options menu. View the different settings.</Text>
                {/* <Flex justify={'start'}>
                  <Settings />
                </Flex> */}
              </Tabs.Content>
            </Box>
          )}
        </Tabs.Root>
      </Flex>

      {/* BOTTOM SECTION */}
      <Flex direction="column" align="center" gap="3" p="3" width="100%">
        <Separator size="4" />
        <Tooltip content="Switch" side="right">
          <IconButton onClick={() => toggleAppearance()} variant="ghost" size="3" color="red">
            {appearance === 'light' ? <MoonIcon /> : <SunIcon />}
          </IconButton>
        </Tooltip>

        <Separator size="4" />
        <Tooltip content="Logout" side="right">
          <IconButton onClick={handleLogout} variant="ghost" size="3" color="red">
            <ExitIcon />
          </IconButton>
        </Tooltip>
      </Flex>
    </Flex>
  );
}
