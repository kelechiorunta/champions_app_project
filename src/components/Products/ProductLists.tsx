import {
  AlertDialog,
  Box,
  Button,
  Flex,
  Heading,
  Separator,
  Text,
  TextField
} from '@radix-ui/themes';
import { useOutletContext } from 'react-router-dom';
import Product from './Product';
import { CaretRightIcon, MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons';
import ActionPopOverProduct from '../ActionPopOver/ActionPopOverProduct';
import { useState } from 'react';
import products from './products';
import AddProduct from './AddProduct';

export type LayoutContext = {
  isMobile: boolean;
  isCollapsible: boolean;
};

export interface ListType {
  name?: string;
  description?: string;
  category?: string;
  brand?: string;
  sku?: string;
  stock_quantity?: string;
  regular_price?: string;
  sales_price?: string;
  gallery?: string;
  tag?: string[];
}

export default function ProductLists() {
  const [query, setQuery] = useState('');
  const [rowLists, setRowLists] = useState<ListType[]>(products);
  const [valueCategory, setValueCategory] = useState('all');

  const [filter, setFilter] = useState<keyof (typeof products)[0]>('name');
  const { isMobile, isCollapsible } = useOutletContext<LayoutContext>();
  // useEffect(() => {

  // }, [filter])
  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement>,
    property: keyof (typeof products)[0] // ensures type safety if using TypeScript
  ) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    const filteredLists = products.filter((product) => {
      const fieldValue = product[property];

      if (valueCategory === 'all') {
        return typeof fieldValue === 'string' && fieldValue.toLowerCase().includes(value);
      } else {
        return (
          typeof fieldValue === 'string' &&
          fieldValue.toLowerCase().includes(value) &&
          value.length > 0 &&
          product.category === valueCategory
        );
      }
    });

    if (filteredLists && filteredLists.length > 0) {
      setRowLists(filteredLists);
    } else {
      setRowLists(products);
      handleValueCategory('all');
      //   handleFilterSelection('all');
    }
  };

  const handleFilterSelection = (value: string) => {
    const filteredLists = products.filter((product) => {
      if (value === 'all') {
        return products;
      }
      return product.category === value;
    });

    setValueCategory(value);
    setRowLists(filteredLists);
  };

  const handleTabSelect = (arr: ListType[], order: string) => {
    if (!arr) return;

    // Clone first to avoid mutating state
    const sortedArray = [...arr].sort((a, b) => {
      if (!a?.category && !b?.category) return 0;
      if (!a?.category) return 1;
      if (!b?.category) return -1;

      // If category is numeric
      const numA = Number(a.category);
      const numB = Number(b.category);

      // If it's a valid number, sort numerically; otherwise, sort alphabetically
      if (!isNaN(numA) && !isNaN(numB)) {
        return numB - numA; // descending numeric sort
      }

      if (order === 'asc') {
        return a.category.localeCompare(b.category);
      }
      // Descending order
      return b.category.localeCompare(a.category);
    });

    setRowLists(sortedArray);
  };

  const handleValueCategory = (value: string) => {
    setValueCategory(value);
  };
  return (
    <Flex direction={'column'} p={'3'} gap={'3'} maxWidth={'85%'}>
      <Flex justify={'between'} align={'center'} gap={'4'}>
        {/* Product heading */}
        <Flex direction={'column'} gap={'1'}>
          <Heading size={'5'} align={'left'} mt={'1'}>
            Products
          </Heading>

          {!isCollapsible && !isMobile && (
            <Flex gap={'2'} align={'center'}>
              <Text weight={'bold'} size={'1'}>
                Home
              </Text>
              <CaretRightIcon />
              <Text weight={'bold'} size={'1'} style={{ textTransform: 'capitalize' }}>
                {valueCategory === 'all' || valueCategory === '' ? 'All Products' : valueCategory}
              </Text>
            </Flex>
          )}
        </Flex>
        {/* Search Field */}

        <TextField.Root
          style={{ width: '60%' }}
          value={query}
          onChange={(e) => handleSearch(e, filter)}
          placeholder="Search Product…"
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        {/* Popover Filter, Sort */}

        <Flex align={'center'} gap={'2'}>
          {!isMobile && (
            <AlertDialog.Root>
              <AlertDialog.Trigger>
                <Button variant="soft">
                  <PlusIcon />
                  Add Product
                </Button>
              </AlertDialog.Trigger>
              <AlertDialog.Content style={{ padding: '4', maxHeight: '900px', marginTop: '-20px' }}>
                <AddProduct />
              </AlertDialog.Content>
            </AlertDialog.Root>
          )}
          <ActionPopOverProduct
            rowLists={rowLists}
            handleTabSelect={handleTabSelect}
            handleFilter={setFilter}
            handleFilterSelection={handleFilterSelection}
            valueCategory={valueCategory}
            handleValueCategory={handleValueCategory}
          />
        </Flex>
      </Flex>

      <Separator size={'4'} />

      <Box height={'530px'} width={'100%'} overflow={'scroll'}>
        <Flex
          overflow={'scroll'}
          //   columns="repeat(3, minmax(270px, 1fr))"
          //   columns={{
          //     initial: '1', //'repeat(auto-fit, minmax(250px, 500px))',
          //     lg: 'repeat(3, minmax(300px, 1fr))', //'3',
          //     sm: '2', //'repeat(2, minmax(350px, 1fr))', //'2',
          //     xs: '1', //'repeat(1, minmax(500px, 1fr))', //'1',
          //     md: '3' //'repeat(2, minmax(100%, 100%))' //2
          //   }}
          wrap={'wrap'}
          gap={'2'}
          align={'center'}
          width={'100%'}
          maxWidth={'100%'}
        >
          {rowLists.map((product) => (
            <Product
              name={product.name}
              description={product.description}
              category={product.category}
              gallery={product.gallery}
              regular_price={product.regular_price}
              sales_price={product.sales_price}
            />
          ))}
        </Flex>
      </Box>
    </Flex>
  );
}
