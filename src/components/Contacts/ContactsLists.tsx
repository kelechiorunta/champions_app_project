import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Card, Checkbox, Flex, Heading, Separator, Table, TextField } from '@radix-ui/themes';
import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import contacts from './contacts';
import ActionPopOverContact from '../ActionPopOver/ActionPopOverContact';
import type { LayoutContext } from '../RecentOrdersList/RecentOrdersList';

export type groupType = 'Developer' | 'Admin' | 'Nursing';
export interface ListType {
  name?: string;
  email?: string;
  group?: string;
}

export default function ContactsLists() {
  const { isMobile, isCollapsible } = useOutletContext<LayoutContext>();
  // Track each row’s checkbox
  const [checkedItems, setCheckedItems] = useState([false, false, false, false, false, false]);

  // Compute header state
  const allChecked = checkedItems.every(Boolean);
  const someChecked = checkedItems.some(Boolean);

  // Toggle all
  const handleToggleAll = (checked: boolean) => {
    setCheckedItems(checkedItems.map(() => checked));
  };

  // Toggle individual row
  const handleRowToggle = (index: number, checked: boolean) => {
    const updated = [...checkedItems];
    updated[index] = checked;
    setCheckedItems(updated);
  };

  const [query, setQuery] = useState('');
  const [rowLists, setRowLists] = useState<ListType[]>(contacts);

  const [filter, setFilter] = useState<keyof (typeof contacts)[0]>('name');

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setQuery(value);

  //   const filteredLists = contacts.filter((row) =>
  //     row.name.toLowerCase().includes(value.toLowerCase())
  //   );
  //   setRowLists(filteredLists);
  // };

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement>,
    property: keyof (typeof contacts)[0] // ensures type safety if using TypeScript
  ) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    const filteredLists = contacts.filter((row) => {
      const fieldValue = row[property];
      return typeof fieldValue === 'string' && fieldValue.toLowerCase().includes(value);
    });

    setRowLists(filteredLists);
  };

  const handleTabSelect = (arr: ListType[], order: string) => {
    if (!arr) return;

    // Clone first to avoid mutating state
    const sortedArray = [...arr].sort((a, b) => {
      if (!a?.name && !b?.name) return 0;
      if (!a?.name) return 1;
      if (!b?.name) return -1;

      // If name is numeric
      const numA = Number(a.name);
      const numB = Number(b.name);

      // If it's a valid number, sort numerically; otherwise, sort alphabetically
      if (!isNaN(numA) && !isNaN(numB)) {
        return numB - numA; // descending numeric sort
      }

      if (order === 'asc') {
        return a.name.localeCompare(b.name);
      }
      // Descending order
      return b.name.localeCompare(a.name);
    });

    setRowLists(sortedArray);
  };

  return (
    <Card style={{ maxHeight: '600px', overflow: 'auto' }}>
      <Flex direction={'column'} py={'3'} px={'4'} width={'100%'}>
        <Flex justify={'between'} align={'start'} gap={'4'}>
          <Heading size={'5'} align={'left'} mb={'3'} mt={'1'} truncate>
            Contacts
          </Heading>
          <TextField.Root
            style={{ width: '100%', maxWidth: '70%' }}
            value={query}
            onChange={(e) => handleSearch(e, filter)}
            placeholder="Search…"
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
          <ActionPopOverContact
            handleFilter={setFilter}
            rowLists={rowLists}
            handleTabSelect={handleTabSelect}
          />
        </Flex>

        <Separator size="4" />
        <Table.Root>
          {!isMobile && !isCollapsible && (
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>
                  <Checkbox
                    checked={allChecked ? true : someChecked ? 'indeterminate' : false}
                    onCheckedChange={(checked) => handleToggleAll(!!checked)}
                    aria-label="Select all contacts"
                  />
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
          )}

          <Table.Body>
            {/* {rowLists.map((row, index) => (
              <Table.Row key={index}>
                <Table.Cell>
                  <Checkbox
                    checked={checkedItems[index]}
                    onCheckedChange={(checked) => handleRowToggle(index, !!checked)}
                  />
                </Table.Cell>
                <Table.RowHeaderCell>{row.name}</Table.RowHeaderCell>
                <Table.Cell>{row.email}</Table.Cell>
                <Table.Cell>{row.group}</Table.Cell>
              </Table.Row>
            ))} */}
            {rowLists.map((row, index) => (
              <Table.Row
                key={index}
                style={
                  isMobile || isCollapsible
                    ? {
                        display: 'block',
                        padding: '12px 4px',
                        borderBottom: '1px solid #e5e5e5'
                        // width: '100%',
                        // maxWidth: '100%'
                      }
                    : {}
                }
              >
                {/* Checkbox */}
                <Table.Cell
                  style={
                    isMobile || isCollapsible
                      ? {
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          padding: '8px 0',
                          flexGrow: 1,
                          flexBasis: 1
                          // width: '100%',
                          // maxWidth: '100%'
                        }
                      : {}
                  }
                >
                  <Checkbox
                    checked={checkedItems[index]}
                    onCheckedChange={(checked) => handleRowToggle(index, !!checked)}
                  />
                </Table.Cell>

                {/* Product */}
                <Table.Cell
                  style={
                    isMobile || isCollapsible
                      ? {
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 0',
                          width: '100%',
                          maxWidth: '100%'
                        }
                      : {}
                  }
                >
                  {(isMobile || isCollapsible) && (
                    <span style={{ fontSize: '12px', opacity: 0.6 }}>Full Name</span>
                  )}
                  <span>{row.name}</span>
                </Table.Cell>

                {/* Order ID */}
                <Table.Cell
                  style={
                    isMobile || isCollapsible
                      ? {
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 0',
                          width: '100%',
                          maxWidth: '100%'
                        }
                      : {}
                  }
                >
                  {(isMobile || isCollapsible) && (
                    <span style={{ fontSize: '12px', opacity: 0.6 }}>Email</span>
                  )}
                  <span>{row.email}</span>
                </Table.Cell>

                {/* Date */}
                <Table.Cell
                  style={
                    isMobile || isCollapsible
                      ? {
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 0',
                          width: '100%',
                          maxWidth: '100%'
                        }
                      : {}
                  }
                >
                  {(isMobile || isCollapsible) && (
                    <span style={{ fontSize: '12px', opacity: 0.6 }}>Group</span>
                  )}
                  <span>{row.group}</span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Flex>
    </Card>
  );
}
