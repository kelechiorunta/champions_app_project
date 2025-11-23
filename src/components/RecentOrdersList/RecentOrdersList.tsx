// import { DotsVerticalIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
// import {
//   Badge,
//   Button,
//   Card,
//   Checkbox,
//   Flex,
//   Heading,
//   Separator,
//   Table,
//   TextField
// } from '@radix-ui/themes';
// import React, { useState } from 'react';
// import orders from './orders';
// import ActionPopOverOrder from '../ActionPopOver/ActionPopOverOrder';
// import { useNavigate, useOutletContext } from 'react-router-dom';

// export type LayoutContext = {
//   isMobile: boolean;
//   isCollapsible: boolean;
// };

// export type groupType = 'Developer' | 'Admin' | 'Nursing';
// export interface ListType {
//   product?: string;
//   order_id?: string;
//   customer_name?: string;
//   date?: string;
//   status?: string;
//   amount?: string;
//   id?: number;
//   phone?: string;
// }

// export default function RecentOrdersList() {
//   // Track each row’s checkbox
//   const [checkedItems, setCheckedItems] = useState(orders.map(() => false));
//   const { isMobile, isCollapsible } = useOutletContext<LayoutContext>();

//   const navigate = useNavigate();

//   // Compute header state
//   const allChecked = checkedItems.every(Boolean);
//   const someChecked = checkedItems.some(Boolean);

//   // Toggle all
//   const handleToggleAll = (checked: boolean) => {
//     setCheckedItems(checkedItems.map(() => checked));
//   };

//   // Toggle individual row
//   const handleRowToggle = (index: number, checked: boolean) => {
//     const updated = [...checkedItems];
//     updated[index] = checked;
//     setCheckedItems(updated);
//   };

//   const [query, setQuery] = useState('');
//   const [rowLists, setRowLists] = useState<ListType[]>(orders);

//   const [filter, setFilter] = useState<keyof (typeof orders)[0]>('product');

//   // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const value = e.target.value;
//   //   setQuery(value);

//   //   const filteredLists = orders.filter((row) =>
//   //     row.name.toLowerCase().includes(value.toLowerCase())
//   //   );
//   //   setRowLists(filteredLists);
//   // };

//   const handleSearch = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     property: keyof (typeof orders)[0] // ensures type safety if using TypeScript
//   ) => {
//     const value = e.target.value.toLowerCase();
//     setQuery(value);

//     const filteredLists = orders.filter((order) => {
//       const fieldValue = order[property];
//       return typeof fieldValue === 'string' && fieldValue.toLowerCase().includes(value);
//     });

//     setRowLists(filteredLists);
//   };

//   const handleTabSelect = (arr: ListType[], order: string) => {
//     if (!arr) return;

//     // Clone first to avoid mutating state
//     const sortedArray = [...arr].sort((a, b) => {
//       if (!a?.product && !b?.product) return 0;
//       if (!a?.product) return 1;
//       if (!b?.product) return -1;

//       // If product is numeric
//       const numA = Number(a.product);
//       const numB = Number(b.product);

//       // If it's a valid number, sort numerically; otherwise, sort alphabetically
//       if (!isNaN(numA) && !isNaN(numB)) {
//         return numB - numA; // descending numeric sort
//       }

//       if (order === 'asc') {
//         return a.product.localeCompare(b.product);
//       }
//       // Descending order
//       return b.product.localeCompare(a.product);
//     });

//     setRowLists(sortedArray);
//   };

//   const handleView = (id: number) => {
//     navigate(`/orders/${id.toString()}`);
//   };

//   return (
//     <Card style={{ maxHeight: '400px' }}>
//       <Flex
//         style={{ overflow: 'scroll' }}
//         height={'380px'}
//         direction={'column'}
//         py={'3'}
//         px={'4'}
//         width={'100%'}
//       >
//         <Flex justify={'between'} align={'start'} gap={'4'}>
//           <Heading size={'5'} align={'left'} mb={'3'} mt={'1'}>
//             Recent Orders
//           </Heading>
//           <TextField.Root
//             style={{ width: '60%' }}
//             value={query}
//             onChange={(e) => handleSearch(e, filter)}
//             placeholder="Search…"
//           >
//             <TextField.Slot>
//               <MagnifyingGlassIcon height="16" width="16" />
//             </TextField.Slot>
//           </TextField.Root>
//           <ActionPopOverOrder
//             handleFilter={setFilter}
//             rowLists={rowLists}
//             handleTabSelect={handleTabSelect}
//           />
//         </Flex>

//         <Separator size="4" />
//         <Table.Root>
//           <Table.Header>
//             <Table.Row>
//               <Table.ColumnHeaderCell>
//                 <Checkbox
//                   checked={allChecked ? true : someChecked ? 'indeterminate' : false}
//                   onCheckedChange={(checked) => handleToggleAll(!!checked)}
//                   aria-label="Select all rows"
//                 />
//               </Table.ColumnHeaderCell>

//               <Table.ColumnHeaderCell>Product</Table.ColumnHeaderCell>
//               <Table.ColumnHeaderCell>Order Id</Table.ColumnHeaderCell>
//               <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
//               <Table.ColumnHeaderCell>Customer</Table.ColumnHeaderCell>
//               <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
//               <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
//               <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
//             </Table.Row>
//           </Table.Header>

//           <Table.Body>
//             {rowLists.map((row, index) => (
//               <Table.Row key={index}>
//                 <Table.Cell>
//                   <Checkbox
//                     checked={checkedItems[index]}
//                     onCheckedChange={(checked) => handleRowToggle(index, !!checked)}
//                   />
//                 </Table.Cell>
//                 <Table.RowHeaderCell>{row.product}</Table.RowHeaderCell>
//                 <Table.Cell>{row.order_id}</Table.Cell>
//                 <Table.Cell>{row.date}</Table.Cell>
//                 <Table.Cell>{row.customer_name}</Table.Cell>
//                 <Table.Cell>
//                   <Badge
//                     color={
//                       row.status === 'Delivered'
//                         ? 'green'
//                         : row.status === 'Pending'
//                           ? 'yellow'
//                           : 'red'
//                     }
//                     variant="soft"
//                     radius="full"
//                   >
//                     {row.status}
//                   </Badge>
//                 </Table.Cell>
//                 <Table.Cell>{row.amount}</Table.Cell>
//                 <Table.Cell>
//                   <Button
//                     onClick={() => {
//                       if (row.id) handleView(row.id);
//                     }}
//                     size={'1'}
//                   >
//                     <DotsVerticalIcon /> View Order
//                   </Button>
//                 </Table.Cell>
//               </Table.Row>
//             ))}
//           </Table.Body>
//         </Table.Root>
//       </Flex>
//     </Card>
//   );
// }

import './RecentOrdersList.css';
import { DotsVerticalIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Flex,
  Grid,
  Heading,
  Separator,
  Table,
  TextField
} from '@radix-ui/themes';
import React, { useState } from 'react';
import orders from './orders';
import ActionPopOverOrder from '../ActionPopOver/ActionPopOverOrder';
import { useNavigate, useOutletContext } from 'react-router-dom';

export type LayoutContext = {
  isMobile: boolean;
  isCollapsible: boolean;
};

export type groupType = 'Developer' | 'Admin' | 'Nursing';
export interface ListType {
  product?: string;
  order_id?: string;
  customer_name?: string;
  date?: string;
  status?: string;
  amount?: string;
  id?: number;
  phone?: string;
  image?: string;
}

export default function RecentOrdersList() {
  // Track each row’s checkbox
  const [checkedItems, setCheckedItems] = useState(orders.map(() => false));
  const { isMobile, isCollapsible } = useOutletContext<LayoutContext>();

  const navigate = useNavigate();

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
  const [rowLists, setRowLists] = useState<ListType[]>(orders);

  const [filter, setFilter] = useState<keyof (typeof orders)[0]>('product');

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setQuery(value);

  //   const filteredLists = orders.filter((row) =>
  //     row.name.toLowerCase().includes(value.toLowerCase())
  //   );
  //   setRowLists(filteredLists);
  // };

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement>,
    property: keyof (typeof orders)[0] // ensures type safety if using TypeScript
  ) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    const filteredLists = orders.filter((order) => {
      const fieldValue = order[property];
      return typeof fieldValue === 'string' && fieldValue.toLowerCase().includes(value);
    });

    setRowLists(filteredLists);
  };

  const handleTabSelect = (arr: ListType[], order: string) => {
    if (!arr) return;

    // Clone first to avoid mutating state
    const sortedArray = [...arr].sort((a, b) => {
      if (!a?.product && !b?.product) return 0;
      if (!a?.product) return 1;
      if (!b?.product) return -1;

      // If product is numeric
      const numA = Number(a.product);
      const numB = Number(b.product);

      // If it's a valid number, sort numerically; otherwise, sort alphabetically
      if (!isNaN(numA) && !isNaN(numB)) {
        return numB - numA; // descending numeric sort
      }

      if (order === 'asc') {
        return a.product.localeCompare(b.product);
      }
      // Descending order
      return b.product.localeCompare(a.product);
    });

    setRowLists(sortedArray);
  };

  const handleView = (id: number) => {
    navigate(`/orders/${id.toString()}`);
  };

  return (
    <Flex maxWidth={'100%'}>
      <Grid columns={'repeat(1, 100%)'} width={'100%'} maxWidth={'100%'}>
        <Card
          style={{
            maxHeight: '400px',
            maxWidth: isCollapsible || isMobile ? '100%' : '1000px',
            minWidth: isCollapsible || isMobile ? '100%' : '100%',
            width: isCollapsible || isMobile ? '100%' : '100%'
          }}
        >
          <Flex
            style={{ overflow: 'scroll' }}
            height={'380px'}
            direction={'column'}
            py={'3'}
            px={'4'}
            width={'100%'}
            maxWidth={'100%'}
          >
            <Flex
              flexBasis={'1'}
              flexGrow={'1'}
              justify={'between'}
              align={'start'}
              gap={'4'}
              width="100%"
              maxWidth="100%"
            >
              <Heading
                size={{ lg: '5', md: '4', xs: '3', sm: '3', initial: '3' }}
                align={'left'}
                style={{ width: '80%' }}
                mb={'3'}
                mt={'1'}
                className="heading"
                truncate
              >
                Recent Orders
              </Heading>
              <TextField.Root
                className="text-responsive"
                style={{ width: '100%', maxWidth: '100%', minWidth: '80%' }}
                value={query}
                onChange={(e) => handleSearch(e, filter)}
                placeholder="Search…"
              >
                <TextField.Slot>
                  <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
              </TextField.Root>
              <ActionPopOverOrder
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
                      />
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Product</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Order Id</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Customer</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
              )}
              <Table.Body style={{ width: '100%', maxWidth: '900px' }}>
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
                        <span style={{ fontSize: '12px', opacity: 0.6 }}>Product</span>
                      )}
                      <span>
                        <Flex align="center" gap="2">
                          {' '}
                          <Avatar
                            radius="full"
                            src={row.image}
                            size={'1'}
                            fallback={'/Champions.png'}
                          />
                          {row.product}
                        </Flex>
                      </span>
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
                        <span style={{ fontSize: '12px', opacity: 0.6 }}>Order ID</span>
                      )}
                      <span>{row.order_id}</span>
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
                        <span style={{ fontSize: '12px', opacity: 0.6 }}>Date</span>
                      )}
                      <span>{row.date}</span>
                    </Table.Cell>

                    {/* Customer */}
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
                        <span style={{ fontSize: '12px', opacity: 0.6 }}>Customer</span>
                      )}
                      <span>{row.customer_name}</span>
                    </Table.Cell>

                    {/* Status */}
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
                        <span
                          style={{
                            fontSize: '12px',
                            opacity: 0.6,
                            width: '100%',
                            maxWidth: '100%'
                          }}
                        >
                          Status
                        </span>
                      )}
                      <Badge
                        color={
                          row.status === 'Delivered'
                            ? 'green'
                            : row.status === 'Pending'
                              ? 'yellow'
                              : 'red'
                        }
                        variant="soft"
                        radius="full"
                      >
                        {row.status}
                      </Badge>
                    </Table.Cell>

                    {/* Amount */}
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
                        <span style={{ fontSize: '12px', opacity: 0.6 }}>Amount</span>
                      )}
                      <span>{row.amount}</span>
                    </Table.Cell>

                    {/* Action */}
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
                        <span style={{ fontSize: '12px', opacity: 0.6 }}>Action</span>
                      )}
                      <Button onClick={() => row.id && handleView(row.id)} size="1">
                        <DotsVerticalIcon /> View Order
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Flex>
        </Card>
      </Grid>
    </Flex>
  );
}
