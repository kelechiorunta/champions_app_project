import {
  BackpackIcon,
  CalendarIcon,
  CardStackIcon,
  DesktopIcon,
  PersonIcon
} from '@radix-ui/react-icons';
import { Badge, Button, Card, Flex, Heading, Select, Text, TextArea } from '@radix-ui/themes';
import type { ListType } from '../RecentOrdersList/RecentOrdersList';
import ViewOrderDetails from './ViewOrderDetails';
import { useState } from 'react';

export interface statusProps {
  id?: number;
  value: string | 'pending' | 'delivered' | 'cancelled';
  label: string | 'Pending' | 'Delivered' | 'Cancelled';
}

export interface ViewOrderProps {
  order: ListType;
  filterStatus: statusProps[];
}

export default function ViewOrder({ order, filterStatus }: ViewOrderProps) {
  const orderDetails = [
    {
      logo: (
        <Button size={'1'}>
          <PersonIcon />
        </Button>
      ),
      title: 'Customer',
      details: [
        { label: 'FullName', value: order?.customer_name || 'Customer' },
        { label: 'Email', value: 'shinki@gmail.com' },
        { label: 'Phone', value: '08036449750' }
      ],
      custom_button: (
        <Button style={{ width: '100%' }} size={'1'}>
          View Profile
        </Button>
      )
    },
    {
      logo: (
        <Button size={'1'}>
          <CardStackIcon />
        </Button>
      ),
      title: 'Order Info',
      details: [
        { label: 'Shipping', value: 'Next Express' },
        { label: 'Payment Method', value: 'Paypal' },
        { label: 'Status', value: order?.status || 'Pending' }
      ],
      custom_button: (
        <Button style={{ width: '100%' }} size={'1'}>
          Download info
        </Button>
      )
    },
    {
      logo: (
        <Button size={'1'}>
          <BackpackIcon />
        </Button>
      ),
      title: 'Deliver to',
      details: [{ label: 'Address', value: 'No. 12, Victory Close, Ago, Lagos.' }],
      custom_button: (
        <Button style={{ width: '100%' }} size={'1'}>
          View Profile
        </Button>
      )
    }
  ];

  const [orderStatus, setOrderStatus] = useState(order?.status?.toLowerCase());
  return (
    <Card
      style={{
        width: '100%',
        maxWidth: '100%',
        height: '100%',
        maxHeight: '100%',
        minHeight: '100%',
        overflow: 'hidden'
      }}
    >
      <Flex
        direction={'column'}
        gap={'2'}
        width={'100%'}
        maxWidth={'100%'}
        overflow={'hidden'}
      >
        <Flex gap={'2'} align={'center'}>
          <Heading truncate size={'3'}>
            Orders ID: {order?.order_id}
          </Heading>
          <Badge
            color={
              orderStatus == 'delivered' ? 'green' : orderStatus == 'pending' ? 'yellow' : 'red'
            }
            variant="soft"
            radius="full"
            style={{ textTransform: 'capitalize' }}
          >
            {orderStatus}
          </Badge>
        </Flex>
        <Flex gap={'4'} align={'center'} justify={'between'} width={'100%'} maxWidth={'100%'}>
          <Flex gap={'2'} align={'center'}>
            <CalendarIcon />
            <Text truncate size={'1'}>
              Feb 16, 2022
            </Text>
            <Text truncate size={'1'}>
              -
            </Text>
            <Text truncate size={'1'}>
              Feb 20, 2022
            </Text>
          </Flex>
          <Flex gap={'4'} align={'center'}>
            <Select.Root
              size={'1'}
              defaultValue={orderStatus}
              onValueChange={(value) => setOrderStatus(value)}
            >
              <Select.Trigger style={{ fontWeight: 'bold' }} placeholder="Change Status" />
              <Select.Content position="popper">
                <Select.Group>
                  <Select.Label>Status</Select.Label>
                  {filterStatus.map(({ value, label }) => (
                    <Select.Item value={value}>{label}</Select.Item>
                  ))}
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <Button size={'1'} variant="surface">
              <DesktopIcon />
            </Button>
            <Button size={'1'} variant="surface">
              Save
            </Button>
          </Flex>
        </Flex>
        <Flex
          gap={'2'}
          wrap={'wrap'}
          width={'100%'}
          maxWidth={'100%'}
          //   height={'150%'}
          //   maxHeight={'100%'}
          //   minHeight={'200px'}
          overflow={'scroll'}
        >
          {orderDetails.map((orderDetail) => (
            <ViewOrderDetails
              logo={orderDetail.logo}
              title={orderDetail.title}
              details={orderDetail.details}
              custom_button={orderDetail.custom_button}
            />
          ))}
        </Flex>
        <Flex
          gap={'2'}
          align={'center'}
          width={'100%'}
          maxWidth={'100%'}
          minWidth={'100%'}
          wrap={'wrap'}
          overflow={'hidden'}
        >
          <Flex
            width={{ initial: '100%', lg: '30%', md: '30%', sm: '100%', xs: '100%' }}
            maxWidth={{
              initial: '100%',
              lg: '30%',
              md: '30%',
              sm: '100%',
              xs: '100%'
            }}
          >
            <Card style={{ width: '100%' }}>
              <Flex
                flexBasis={'1'}
                flexGrow={'1'}
                direction={'column'}
                gap={'2'}
                //   maxWidth={'100%'}
                //   width={'100%'}
              >
                <Text truncate size={'2'} weight={'bold'}>
                  Payment Info
                </Text>
                <Text truncate size={'1'}>
                  MasterCard
                </Text>
                <Text truncate size={'1'}>
                  Business Name: {order?.customer_name}
                </Text>
                <Text truncate size={'1'}>
                  Phone: {order?.phone}
                </Text>
              </Flex>
            </Card>
          </Flex>

          <Flex
            width={{ initial: '100%', lg: '100%', md: '69%', sm: '100%', xs: '100%' }}
            maxWidth={{
              initial: '100%',
              lg: '69%',
              md: '69%',
              sm: '100%',
              xs: '100%'
            }}
            overflow={'hidden'}
          >
            <Card style={{ width: '100%' }}>
              <Flex
                direction={'column'}
                align={'baseline'}
                justify={'between'}
                gap={'2'}
                p={'2'}
                //   width={'100%'}
                //   maxWidth={'100%'}
                flexBasis={'1'}
                flexGrow={'1'}
              >
                <Text truncate size={'2'} weight={'bold'} style={{ width: '100%' }}>
                  Notes
                </Text>
                <TextArea
                  style={{ width: '100%', maxWidth: '100%' }}
                  size={'1'}
                  placeholder="Take Notes..."
                />
              </Flex>
            </Card>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
