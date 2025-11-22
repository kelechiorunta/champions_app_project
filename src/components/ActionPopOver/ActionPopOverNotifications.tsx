import { BellIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { Popover } from '@radix-ui/themes';
import Notifications from '../Notifications/Notifications';

const bars = [
  {
    image: '/battery.png',
    name: 'Battery',
    price: '£20.00',
    date: new Date().toLocaleDateString('en'),
    status: 'sold'
  },
  {
    image: '/inverter.png',
    name: 'Inverter',
    price: '£25.00',
    date: new Date().toLocaleDateString('en'),
    status: 'sold'
  },
  {
    image: '/AppIcon.jpg',
    name: 'AppLogo',
    price: '£30.00',
    date: new Date().toLocaleDateString('en'),
    status: 'sold'
  },
  {
    image: '/jug.png',
    name: 'Jug',
    price: '£35.00',
    date: new Date().toLocaleDateString('en'),
    status: 'sold'
  }
];

export default function ActionPopOverNotifications() {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <BellIcon />
      </Popover.Trigger>
      <Popover.Content>
        <Notifications
          lists={bars}
          closePopover={
            <Popover.Close>
              <CrossCircledIcon />
            </Popover.Close>
          }
        />
      </Popover.Content>
    </Popover.Root>
  );
}
