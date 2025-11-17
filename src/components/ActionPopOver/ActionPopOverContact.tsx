// import { ActivityLogIcon, CaretUpIcon, CaretDownIcon } from '@radix-ui/react-icons';
// import { Button, Flex, Popover, Tabs, Text } from '@radix-ui/themes';
// import { useState } from 'react';
// import type { ListType } from '../RecentOrders/RecentOrders';

// export interface PopOverProps {
//   handleTabSelect: (lists: ListType[], order: string) => void;
//   rowLists: ListType[];
// }

// export default function ActionPopOver({ rowLists, handleTabSelect }: PopOverProps) {
//   // const [collapsed, setCollapsed] = useState(false);
//   const [activeTab, setActiveTab] = useState('dashboard');

//   const menuItems = [
//     { value: 'asc', icon: <CaretUpIcon />, label: 'Ascending', page: '/', order: 'asc' },
//     {
//       value: 'desc',
//       icon: <CaretDownIcon />,
//       label: 'Descending',
//       page: '/products',
//       order: 'desc'
//     }
//     // { value: 'contacts', icon: <PersonIcon />, label: 'Contacts', page: '/orders' },
//     // { value: 'groups', icon: <GroupIcon />, label: 'Groups', page: '/groups' },
//     // { value: 'settings', icon: <GearIcon />, label: 'Settings', page: '/settings' }
//   ];

//   // Handle navigation when tab changes
//   const handleTabChange = (value: string) => {
//     setActiveTab(value);
//     handleTabSelect(rowLists, value);
//     console.log(rowLists);
//     // const selected = menuItems.find((item) => item.value === value);
//     // if (selected?.page) navigate(selected.page);
//   };
//   return (
//     <Popover.Root>
//       <Popover.Trigger>
//         <Button variant="soft">
//           <ActivityLogIcon width="16" height="16" />
//         </Button>
//       </Popover.Trigger>
//       <Popover.Content>
//         <Flex gap="3">
//           <Tabs.Root value={activeTab} onValueChange={handleTabChange} orientation="vertical">
//             <Tabs.List
//               style={{
//                 display: 'flex',
//                 flexDirection: 'column'
//               }}
//             >
//               {menuItems.map(({ value, icon, label }) => (
//                 // <Tooltip key={value} content={label} side="right" delayDuration={300}>
//                 <Tabs.Trigger
//                   value={value}
//                   style={{
//                     all: 'unset',
//                     background: activeTab === value ? 'var(--gray-4)' : 'transparent',
//                     borderRadius: '8px',
//                     padding: '8px 8px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     //   justifyContent: collapsed ? 'center' : 'flex-start',
//                     //   gap: collapsed ? '0' : '0px',
//                     color: activeTab === value ? 'var(--accent-11)' : 'var(--gray-11)',
//                     cursor: 'pointer',
//                     fontWeight: 500,
//                     transition: 'background 0.2s ease'
//                     // marginLeft: '-2rem'
//                   }}
//                 >
//                   <Flex justify={'between'} gap={'2'} align={'center'}>
//                     {icon}
//                     <Text size="2">{label}</Text>
//                   </Flex>
//                 </Tabs.Trigger>
//                 // </Tooltip>
//               ))}
//             </Tabs.List>
//             {/* Help description of tabs
//             )} */}
//           </Tabs.Root>
//         </Flex>
//       </Popover.Content>
//     </Popover.Root>
//   );
// }

import { ActivityLogIcon } from '@radix-ui/react-icons';
import { Button, Flex, Popover, Select } from '@radix-ui/themes';

import type { ListType } from '../Contacts/ContactsLists';
import { useState } from 'react';

import contacts from '../Contacts/contacts';

export interface PopOverProps {
  handleTabSelect: (lists: ListType[], order: string) => void;
  rowLists: ListType[];
  handleFilter: (filter: keyof (typeof contacts)[0]) => void;
}

export default function ActionPopOverContact({
  rowLists,
  handleTabSelect,
  handleFilter
}: PopOverProps) {
  const [activeTab, setActiveTab] = useState('asc');
  const [filterTab, setFilterTab] = useState('name');

  const menuItems = [
    { value: 'asc', label: 'Ascending', page: '/', order: 'asc' },
    {
      value: 'desc',
      label: 'Descending',
      page: '/products',
      order: 'desc'
    }
  ];

  const filterlists = [
    { value: 'email', label: 'By Email', page: '/', order: 'email' },
    {
      value: 'name',
      label: 'By Name',
      page: '/products',
      order: 'desc'
    },
    {
      value: 'group',
      label: 'By Group',
      page: '/products',
      order: 'desc'
    }
  ];

  //   Handle navigation when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    handleTabSelect(rowLists, value);
    console.log(rowLists);
  };

  const handleFilterChange = (value: keyof (typeof contacts)[0]) => {
    setFilterTab(value);
    handleFilter(value);
    console.log(rowLists);
  };
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="soft">
          <ActivityLogIcon width="16" height="16" />
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Flex gap="3" direction={'column'} justify={'center'}>
          <Select.Root defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange}>
            <Select.Trigger placeholder="Sort Lists" value={activeTab} />
            <Select.Content position="popper">
              <Select.Group>
                <Select.Label>Sort</Select.Label>
                {menuItems.map(({ value, label }) => (
                  <Select.Item value={value}>{label}</Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>

          <Select.Root
            defaultValue={filterTab}
            value={filterTab}
            onValueChange={handleFilterChange}
          >
            <Select.Trigger placeholder="Filter" value={filterTab} />
            <Select.Content position="popper">
              <Select.Group>
                <Select.Label>Filter Search</Select.Label>
                {filterlists.map(({ value, label }) => (
                  <Select.Item value={value}>{label}</Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}
