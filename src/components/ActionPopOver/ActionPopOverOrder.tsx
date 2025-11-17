import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { Button, Flex, Popover, Select } from '@radix-ui/themes';

import type { ListType } from '../RecentOrdersList/RecentOrdersList';
import { useState } from 'react';

import orders from '../RecentOrdersList/orders';

export interface PopOverProps {
  handleTabSelect?: (lists: ListType[], order: string) => void;
  rowLists: ListType[];
  handleFilter: (filter: keyof (typeof orders)[0]) => void;
}

export default function ActionPopOverOrder({
  rowLists,
  handleTabSelect,
  handleFilter
}: PopOverProps) {
  const [activeTab, setActiveTab] = useState('asc');
  const [filterTab, setFilterTab] = useState('product');

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
    { value: 'order_id', label: 'By Order Id', page: '/', order: 'order_id' },
    {
      value: 'product',
      label: 'By Product',
      page: '/products',
      order: 'desc'
    },
    {
      value: 'customer_name',
      label: 'By Customer Name',
      page: '/products',
      order: 'desc'
    },
    {
      value: 'date',
      label: 'By Date',
      page: '/products',
      order: 'desc'
    },
    {
      value: 'status',
      label: 'By Status',
      page: '/products',
      order: 'desc'
    },
    {
      value: 'amount',
      label: 'By Amount',
      page: '/products',
      order: 'desc'
    }
  ];

  //   Handle navigation when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (handleTabSelect) handleTabSelect(rowLists, value);
    console.log(rowLists);
  };

  const handleFilterChange = (value: keyof (typeof orders)[0]) => {
    setFilterTab(value);
    handleFilter(value);
    console.log(rowLists);
  };
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="soft">
          <DotsVerticalIcon width="16" height="16" />
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
