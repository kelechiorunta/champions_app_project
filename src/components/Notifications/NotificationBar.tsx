import { Avatar, Badge, Card, Flex, Text } from '@radix-ui/themes';
import type { NotificationType } from './Notifications';

export default function NotificationBar({ list }: { list: NotificationType }) {
  return (
    <Card>
      <Flex align={'center'} justify={'between'} gap={'8'}>
        <Flex gap={'2'} align={'center'}>
          <Avatar src={list.image} fallback={list.image[0]} />
          <Flex direction={'column'} gap={'2'}>
            <Text truncate size={'1'} weight={'bold'}>
              {list.name}
            </Text>
            <Text truncate size={'1'}>
              {list.price}
            </Text>
            <Text truncate size={'1'}>
              {list.date}
            </Text>
          </Flex>
        </Flex>
        <Badge>{list.status}</Badge>
      </Flex>
    </Card>
  );
}
