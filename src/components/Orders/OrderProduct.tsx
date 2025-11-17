import {
  Card,
  Checkbox,
  Flex,
  Heading,
  Separator,
  Table,
  Text
  //   TextField
} from '@radix-ui/themes';
import { useState } from 'react';
import orders from '../RecentOrdersList/orders';
import ActionPopOverOrder from '../ActionPopOver/ActionPopOverOrder';

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
  quantity?: number;
}

export interface ordersProductType {
  product: string;
  order_id: string;
  quantity: number;
  price: string;
}

export interface ordersProductArrayType {
  orderProducts: ordersProductType[];
}

export default function OrderProduct({ orderProducts }: ordersProductArrayType) {
  // Track each row’s checkbox
  const [checkedItems, setCheckedItems] = useState(orders.map(() => false));

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
    console.log(handleTabSelect);
  };

  //   const [query, setQuery] = useState('');
  const [rowLists, setRowLists] = useState<ordersProductType[]>(orderProducts);

  const [filter, setFilter] = useState<keyof (typeof orders)[0]>('product');

  const handleTabSelect = (arr: ordersProductType[], order: string) => {
    if (!arr) return;
    console.log(filter);
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

  return (
    <Card style={{ maxHeight: '600px' }}>
      <Flex
        style={{ overflow: 'scroll' }}
        height={'540px'}
        direction={'column'}
        py={'3'}
        px={'4'}
        width={'100%'}
      >
        <Flex justify={'between'} align={'start'} gap={'4'}>
          <Heading size={'3'} align={'left'} mb={'3'} mt={'1'}>
            Products
          </Heading>

          <ActionPopOverOrder
            handleFilter={setFilter}
            rowLists={rowLists}
            // handleTabSelect={handleTabSelect}
          />
        </Flex>

        <Separator size="4" />
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>
                <Checkbox
                  checked={allChecked ? true : someChecked ? 'indeterminate' : false}
                  onCheckedChange={(checked) => handleToggleAll(!!checked)}
                  aria-label="Select all rows"
                />
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Product</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Order Id</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell align="center">Quantity</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell align="center">Total</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {rowLists.map((row, index) => (
              <Table.Row key={index}>
                <Table.Cell>
                  <Checkbox
                    checked={checkedItems[index]}
                    onCheckedChange={(checked) => handleRowToggle(index, !!checked)}
                  />
                </Table.Cell>
                <Table.RowHeaderCell align="justify">{row.product}</Table.RowHeaderCell>
                <Table.Cell align="justify">{row.order_id}</Table.Cell>
                <Table.Cell align="center">{row.quantity}</Table.Cell>
                <Table.Cell align="center">
                  {row.quantity * parseFloat(row.price.replace(/[^0-9.-]+/g, ''))}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Flex direction={'column'}>
          <Flex align="center" gap={'4'} justify={'end'} width={'96%'} p={'2'}>
            <Text align={'left'} weight={'bold'} size={'2'}>
              SubTotal
            </Text>
            <Text align={'right'} size={'2'}>
              £
              {rowLists.reduce(
                (total, row) => total + row.quantity * Number(row.price.replace(/[^0-9.-]+/g, '')),
                0
              )}
            </Text>
          </Flex>
          <Flex align="center" gap={'4'} justify={'end'} width={'96%'} p={'2'} mt={'-2'}>
            <Text align={'left'} weight={'bold'} size={'2'}>
              Taxes 5%
            </Text>
            <Text align={'right'} size={'2'}>
              £{' '}
              {0.05 *
                rowLists.reduce(
                  (total, row) =>
                    total + row.quantity * Number(row.price.replace(/[^0-9.-]+/g, '')),
                  0
                )}
            </Text>
          </Flex>
          <Flex align="center" gap={'4'} justify={'end'} width={'96%'} p={'2'} mt={'-2'}>
            <Text weight={'bold'} size={'2'}>
              Discount
            </Text>
            <Text align={'right'} size={'2'}>
              £0
            </Text>
          </Flex>
          <Flex align="center" gap={'4'} justify={'end'} width={'96%'} p={'2'} mt={'-2'}>
            <Text weight={'bold'} size={'2'}>
              Shipping
            </Text>
            <Text size={'2'}>£0</Text>
          </Flex>
          <Separator size={'4'} />
          <Flex align="center" gap={'4'} justify={'end'} width={'96%'} p={'2'}>
            <Text weight={'bold'} size={'3'}>
              Total
            </Text>
            <Text size={'3'} weight={'bold'}>
              £
              {rowLists.reduce(
                (total, row) => total + row.quantity * Number(row.price.replace(/[^0-9.-]+/g, '')),
                0
              ) +
                0.05 *
                  rowLists.reduce(
                    (total, row) =>
                      total + row.quantity * Number(row.price.replace(/[^0-9.-]+/g, '')),
                    0
                  )}
            </Text>
          </Flex>
          <Separator size={'4'} />
        </Flex>
      </Flex>
    </Card>
  );
}
