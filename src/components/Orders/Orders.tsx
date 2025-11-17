import { Flex, Heading, Separator, Text } from '@radix-ui/themes';

import RecentOrdersList from '../RecentOrdersList/RecentOrdersList';
import { CaretRightIcon } from '@radix-ui/react-icons';

export default function Orders() {
  return (
    <Flex direction={'column'} py={'3'} px={'4'} gap={'3'} width={'85%'} maxWidth={'100%'}>
      <Flex direction={'column'} gap={'1'}>
        <Heading size={'5'} align={'left'} mt={'1'}>
          Order
        </Heading>
        {/* <Badge color="gray" size={'1'} radius="none" variant="soft"> */}
        <Flex gap={'2'} align={'center'}>
          <Text weight={'bold'} size={'1'}>
            Home
          </Text>
          <CaretRightIcon />
          <Text weight={'bold'} size={'1'}>
            Order
          </Text>
        </Flex>
        {/* </Badge> */}
      </Flex>
      <Separator size="4" />
      <RecentOrdersList />
      {/* <ContactsLists /> */}
    </Flex>
  );
}
