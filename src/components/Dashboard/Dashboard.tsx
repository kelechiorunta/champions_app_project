import { Avatar, Badge, Flex, Heading, Separator, Text } from '@radix-ui/themes';
// import RecentOrdersList from '../RecentOrdersList/RecentOrdersList';
import DashboardCards from '../DashboardCards/DashboardCards';
import SalesGraph from '../SalesGraph/SalesGraph';
import BestSellersList from '../BestSellers/BestSellersList';
import { CaretRightIcon } from '@radix-ui/react-icons';
import type { userTypes } from '../Home/Home';
import ActionPopOverAdmin from '../ActionPopOver/ActionPopOverAdmin';

import ActionPopOverNotifications from '../ActionPopOver/ActionPopOverNotifications';

const cards = [
  { title: 'Total Orders', amount: '£126.500', percent: '34.7%' },
  { title: 'Active Orders', amount: '£126.500', percent: '34.7%' },
  { title: 'Completed Orders', amount: '£126.500', percent: '34.7%' },
  { title: 'Return Orders', amount: '£126.500', percent: '34.7%' }
];

export default function Dashboard({ picture, username, email }: userTypes) {
  return (
    <Flex
      direction={'column'}
      py={'3'}
      px={'4'}
      gap={'3'}
      width={'85%'}
      maxWidth={'85%'}
      overflowY={'scroll'}
      maxHeight={'100vh'}
    >
      <Flex justify={'between'} gap={'2'} align={'center'} width={'100%'} maxWidth={'100%'}>
        <Flex direction={'column'} gap={'1'}>
          <Heading size={'5'} align={'left'} mt={'1'}>
            Dashboard
          </Heading>
          {/* <Badge color="gray" size={'1'} radius="none" variant="soft"> */}
          <Flex gap={'2'} align={'center'}>
            <Text weight={'bold'} size={'1'}>
              Home
            </Text>
            <CaretRightIcon />
            <Text weight={'bold'} size={'1'}>
              Dashboard
            </Text>
          </Flex>
          {/* </Badge> */}
        </Flex>
        <Flex direction={'column'} gap={'1'} align={'end'}>
          <Flex align="center" gap={'4'}>
            <Badge radius="full" size={'3'} style={{ padding: '2px' }}>
              <ActionPopOverNotifications />
            </Badge>
            <Avatar
              src={picture ? picture : '/Champions.png'}
              fallback={username ? username[0] : '/Champions.png'}
              size={'2'}
              radius="full"
              highContrast
            />
            <ActionPopOverAdmin />
          </Flex>

          <Badge title={email} size={'1'} color="cyan">
            {email}
          </Badge>
        </Flex>
      </Flex>

      <Separator size="4" />

      <Flex
        // columns={{
        //   initial: '1',
        //   sm: '2',
        //   md: '3',
        //   lg: '4'
        // }}
        gap={'2'}
        width={'100%'}
        p={'2'}
        wrap={'wrap'}
      >
        {cards.map((card) => (
          <DashboardCards title={card.title} amount={card.amount} percent={card.percent} />
        ))}
      </Flex>
      <Separator size={'4'} />
      <Flex gap={'2'} p={'2'} align={'center'} width={'100%'} maxWidth={'100%'} wrap={'wrap'}>
        <Flex
          flexBasis={{ initial: '1', xs: '0', sm: '0', md: '0', lg: '1' }}
          flexGrow={'1'}
          display={{
            initial: 'flex',
            xs: 'inline-flex',
            sm: 'inline-flex',
            md: 'flex',
            lg: 'flex'
          }}
        >
          <Flex width={{ initial: '100%', xs: '100%', md: '100%', sm: '100%', lg: '100%' }}>
            <SalesGraph />
          </Flex>
        </Flex>
        <Flex
          flexBasis={{ initial: '1', xs: '0', sm: '0', md: '0', lg: '0' }}
          flexGrow={'1'}
          display={{
            initial: 'flex',
            xs: 'inline-flex',
            sm: 'inline-flex',
            md: 'flex',
            lg: 'flex'
          }}
        >
          <Flex width={{ initial: '100%', xs: '100%', md: '100%', sm: '100%', lg: '100%' }}>
            <BestSellersList />
          </Flex>
        </Flex>
      </Flex>
      <Separator size="4" />
      {/* <RecentOrdersList /> */}
    </Flex>
  );
}
