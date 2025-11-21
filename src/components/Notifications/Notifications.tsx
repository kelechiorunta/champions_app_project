import { CrossCircledIcon } from '@radix-ui/react-icons';
import { Card, Flex, Heading } from '@radix-ui/themes';

import NotificationBar from './NotificationBar';

export type NotificationType = {
  image: string;
  name: string;
  price: string;
  date: string;
  status: string;
};

export default function Notifications({ lists }: { lists: NotificationType[] }) {
  return (
    <Card>
      <Flex direction={'column'} gap={'2'} width={'100%'}>
        <Flex justify={'between'} gap={'9'} align={'center'} mb={'8'}>
          <Heading size={'2'} truncate>
            Notifications
          </Heading>
          <CrossCircledIcon />
        </Flex>
        {lists && lists.map((list, idx) => <NotificationBar key={idx} list={list} />)}
      </Flex>
    </Card>
  );
}
