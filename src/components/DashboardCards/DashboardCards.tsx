import { ArrowUpIcon, DotsVerticalIcon } from '@radix-ui/react-icons';
import {
  Avatar,
  Badge,
  Blockquote,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Popover,
  Text
} from '@radix-ui/themes';

export interface cardsProps {
  title?: string;
  amount?: string;
  percent?: string;
}

export default function DashboardCards({ title, amount, percent }: cardsProps) {
  return (
    <Flex flexBasis={'1'} flexGrow={'1'}>
      <Card style={{ maxWidth: '100%', width: '100%' }}>
        <Grid gap={'2'} columns={'1'}>
          <Flex justify={'between'} align={'center'} gap={'4'}>
            <Heading size={'3'} weight={'bold'}>
              {title}
            </Heading>
            <Popover.Root>
              <Popover.Trigger>
                <Button>
                  <DotsVerticalIcon />
                </Button>
              </Popover.Trigger>
              <Popover.Content>
                <Text>Hi there</Text>
              </Popover.Content>
            </Popover.Root>
          </Flex>
          <Flex align={'center'} gap={'4'}>
            <Avatar src="/frame_card.png" fallback="A" />
            <Heading size={'3'} weight={'bold'}>
              {amount}
            </Heading>
            <Badge color="gold" variant="soft" radius="full">
              <Flex align={'center'} gap={'4'}>
                <ArrowUpIcon />
                <Heading size={'3'} weight={'bold'}>
                  {percent}
                </Heading>
              </Flex>
            </Badge>
          </Flex>
          <Flex align={'center'} gap={'4'} justify={'center'}>
            <Blockquote size={'1'}>Compared to Oct, 2023</Blockquote>
          </Flex>
        </Grid>
      </Card>
    </Flex>
  );
}
