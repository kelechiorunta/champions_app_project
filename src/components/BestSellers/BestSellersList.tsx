import { ActivityLogIcon, DotsVerticalIcon } from '@radix-ui/react-icons';
import { Button, Card, Flex, Heading, Popover } from '@radix-ui/themes';
import BestSeller from './BestSeller';
import './BestSellerList.css';

export default function BestSellersList() {
  return (
    <Card style={{ width: '100%' }}>
      <Flex direction={'column'} gap={'1'}>
        <Flex justify={'between'} align={'center'} gap={'4'} mt={'-1'}>
          <Heading truncate size={'5'} weight={'bold'}>
            Best Sellers
          </Heading>
          <Popover.Root>
            <Popover.Trigger>
              <Button variant="outline">
                <DotsVerticalIcon />
              </Button>
            </Popover.Trigger>
            <Popover.Content>
              <Button variant="surface" highContrast>
                <ActivityLogIcon /> View Report
              </Button>
            </Popover.Content>
          </Popover.Root>
        </Flex>
        {['/AppIcon.jpg', '/battery.png', '/frame_card.png'].map((i) => (
          <BestSeller image={i.toString()} />
        ))}
      </Flex>
    </Card>
  );
}
