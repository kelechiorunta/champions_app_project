import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { Button, Flex, Popover, Select } from '@radix-ui/themes';

import type { ListType } from '../Products/ProductLists';
import { useState } from 'react';

// import products from '../RecentOrdersList/orders';
import products from '../Products/products';

export interface PopOverProps {
  handleTabSelect?: (lists: ListType[], order: string) => void | undefined;
  rowLists?: ListType[] | undefined;
  handleFilter?: (filter: keyof (typeof products)[0]) => void | undefined;
  handleFilterSelection?: (filter: keyof (typeof products)[0]) => void | undefined;
  valueCategory?: string;
  handleValueCategory?: (filter: string) => void;
}

export default function ActionPopOverProduct({
  rowLists,
  handleTabSelect,
  handleFilter,
  handleFilterSelection,
  valueCategory,
  handleValueCategory
}: PopOverProps) {
  const [activeTab, setActiveTab] = useState('asc');
  const [filterTab, setFilterTab] = useState('name');
  //   const [filterCategory, setFilterCategory] = useState(valueCategory);

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
    { value: 'description', label: 'By Description', page: '/', order: 'order_id' },
    {
      value: 'name',
      label: 'By Name',
      page: '/products',
      order: 'desc'
    },
    {
      value: 'category',
      label: 'By Category',
      page: '/products',
      order: 'desc'
    },
    {
      value: 'brand',
      label: 'By Brand',
      page: '/products',
      order: 'desc'
    },
    {
      value: 'regular_price',
      label: 'By Price',
      page: '/products',
      order: 'desc'
    },
    {
      value: 'stock_quantity',
      label: 'By Quantity',
      page: '/products',
      order: 'desc'
    }
  ];

  const filterCategories = [
    { value: 'all', label: 'All', page: '/', order: 'order_id' },
    { value: 'battery', label: 'Batteries', page: '/', order: 'order_id' },
    {
      value: 'inverter',
      label: 'Inverters',
      page: '/products',
      order: 'desc'
    },
    {
      value: 'accessories',
      label: 'Accessories',
      page: '/products',
      order: 'desc'
    },
    {
      value: 'grocery',
      label: 'Groceries',
      page: '/products',
      order: 'desc'
    },
    {
      value: 'cuisine',
      label: 'Cuisines',
      page: '/products',
      order: 'desc'
    },
    {
      value: 'gadgets',
      label: 'Gadget',
      page: '/products',
      order: 'desc'
    }
  ];

  //   Handle navigation when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (handleTabSelect && rowLists) handleTabSelect(rowLists, value);
    console.log(rowLists);
  };

  const handleFilterChange = (value: keyof (typeof products)[0]) => {
    setFilterTab(value);
    if (handleFilter) handleFilter(value);
    console.log(rowLists);
  };

  const handleFilterCategory = (value: keyof (typeof products)[0]) => {
    if (handleValueCategory) handleValueCategory(value);
    // setFilterCategory(value);
    if (handleFilterSelection) handleFilterSelection(value);
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
          {/* Sort */}
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
          {/* Categories */}
          <Select.Root
            defaultValue={valueCategory}
            value={valueCategory}
            onValueChange={handleFilterCategory}
          >
            <Select.Trigger placeholder="Filter" value={filterTab} />
            <Select.Content position="popper">
              <Select.Group>
                <Select.Label>Categories</Select.Label>
                {filterCategories.map(({ value, label }) => (
                  <Select.Item value={value}>{label}</Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
          {/* Filter */}
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
