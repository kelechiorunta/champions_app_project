import { Flex, Heading, Text, Separator, AlertDialog, Button } from '@radix-ui/themes';
import { useNavigate, useParams } from 'react-router-dom';
import orders from '../RecentOrdersList/orders';
import { ArrowLeftIcon, CaretRightIcon, DotsVerticalIcon } from '@radix-ui/react-icons';
import ViewOrder from './ViewOrder';
import OrderProduct from './OrderProduct';

export interface OrderProps {
  order_id?: string;
  status?: 'Delivered' | 'Pending' | 'Cancelled';
}

export default function ViewOrderScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const order = orders.filter((order) => {
    if (id) {
      return order?.id === Number(id);
    }
  })[0];

  const filterStatus = [
    { id: 1, value: 'pending', label: 'Pending' },
    { id: 2, value: 'delivered', label: 'Delivered' },
    { id: 3, value: 'cancelled', label: 'Cancelled' }
  ];

  return (
    <Flex
      direction={'column'}
      py={'3'}
      px={'4'}
      gap={'3'}
      width={'100%'}
      maxWidth={'91%'}
      // minHeight={'100%'}
      // maxHeight={'100%'}
      // height={'100%'}
      overflow={'scroll'}
    >
      <Flex direction={'column'} gap={'1'}>
        <Heading size={'5'} align={'left'} mt={'1'}>
          Order
        </Heading>
        {/* <Badge color="gray" size={'1'} radius="none" variant="soft"> */}
        <Flex justify={'between'} align={'center'}>
          <Flex gap={'2'} align={'center'}>
            <Text truncate weight={'bold'} size={'1'}>
              Home
            </Text>
            <CaretRightIcon />
            <Text truncate weight={'bold'} size={'1'}>
              Order
            </Text>
            <CaretRightIcon />
            <Text truncate weight={'bold'} size={'1'}>
              View Order
            </Text>
            <Button size={'1'} onClick={() => navigate(-1)}>
              <Flex gapX={'2'} align={'center'}>
                <ArrowLeftIcon />
                <Text weight={'bold'} size={'1'}>
                  Back
                </Text>
              </Flex>
            </Button>
          </Flex>
          <Flex>
            <AlertDialog.Root>
              <AlertDialog.Trigger>
                <Button variant="soft">
                  <DotsVerticalIcon /> View Products
                  {/* Add Product */}
                </Button>
              </AlertDialog.Trigger>
              <AlertDialog.Content style={{ padding: '4', maxHeight: '900px', marginTop: '-20px' }}>
                <OrderProduct orderProducts={order?.order_products || []} />
              </AlertDialog.Content>
            </AlertDialog.Root>
          </Flex>
        </Flex>

        {/* </Badge> */}
      </Flex>
      <Separator size="4" />
      {/* ViewOrderScreen  */}
      <ViewOrder order={order} filterStatus={filterStatus} />

      {/* <OrderProduct /> */}
    </Flex>
  );
}
