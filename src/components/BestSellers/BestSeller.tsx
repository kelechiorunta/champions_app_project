import { Avatar, Badge, Card, Flex, Text } from '@radix-ui/themes';

export interface PropTypes {
  image?: string;
}

export default function BestSeller({ image }: PropTypes) {
  return (
    <Card>
      <Flex justify={'between'} align={'center'} gap={'96px'}>
        <Flex align={'center'} gap={'2'}>
          <Avatar src={image} fallback="/Champions.png" radius="large" size={'5'} />
          <Flex direction={'column'} align={'start'}>
            <Text truncate size={'2'} weight={'bold'}>
              Lorem Ipsum
            </Text>
            <Badge color="gray" variant="soft" role="banner" size={'1'}>
              £125.60
            </Badge>
          </Flex>
        </Flex>
        <Flex direction={'column'} align={'center'}>
          <Text size={'2'} weight={'bold'}>
            £126.50
          </Text>
          <Badge color="gray" variant="soft" role="banner" size={'1'}>
            999 sales
          </Badge>
        </Flex>
      </Flex>
    </Card>
  );
}
