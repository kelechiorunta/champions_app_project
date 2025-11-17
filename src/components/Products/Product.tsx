import { DotsHorizontalIcon, PaperPlaneIcon } from '@radix-ui/react-icons';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Popover,
  Progress,
  Separator,
  Text
} from '@radix-ui/themes';
import { type ListType } from './ProductLists';
import ModalDialog from '../ModalDialog/ModalDialog';
import ViewProduct from './ViewProduct';

export default function Product({
  name,
  gallery,
  category,
  description,
  brand,
  regular_price,
  sales_price
}: ListType) {
  return (
    <Flex flexBasis={'1'} flexGrow={'1'}>
      <Card style={{ width: '100%', maxWidth: '100%' }}>
        <Flex
          direction={'column'}
          p={'1'}
          gap={'2'}
          width={'100%'}
          maxWidth={'100%'}
          // gridColumn={'span 1'}
        >
          {/* Avatar row */}
          <Flex justify={'between'} align={'start'} gap={'4'}>
            <Flex align={'center'} gap={'4'} mr={'48px'}>
              <Avatar src={gallery} fallback={gallery ? gallery : name ? name[0] : ''} size={'5'} />
              <Flex direction={'column'} gap={'1'}>
                <Flex maxWidth={{ sm: '60px', md: '60px', lg: '150px' }}>
                  <Text size={'2'} weight={'bold'} truncate>
                    {name}
                  </Text>
                </Flex>

                <Flex maxWidth={{ sm: '60px', md: '60px', lg: '150px' }}>
                  <Badge
                    color="gray"
                    radius="large"
                    size={'1'}
                    mb={'2'}
                    style={{ width: 'max-content', textTransform: 'capitalize' }}
                  >
                    {category}
                  </Badge>
                </Flex>
                <Text size={'2'} weight={'bold'}>
                  {regular_price}
                </Text>
              </Flex>
            </Flex>
            <Popover.Root>
              <Popover.Trigger>
                <Button variant="soft" highContrast>
                  <DotsHorizontalIcon />
                </Button>
              </Popover.Trigger>
              <Popover.Content>
                {/* <Text>View Product</Text> */}
                <ModalDialog
                  title="View Product"
                  button_label="View Product"
                  description=""
                  // handleSubmit={() => alert(name)}
                  component={
                    <ViewProduct name={name} handleSubmit={() => alert({ name, regular_price })} />
                  }
                />
              </Popover.Content>
            </Popover.Root>
          </Flex>
          {/* Summary row*/}
          <Flex direction={'column'} gap={'1'}>
            <Text size={'2'} weight={'bold'}>
              Summary
            </Text>
            <Text truncate color="gray" size={'1'} mb={'4'} style={{ width: 'max-content' }}>
              {description || brand}
            </Text>
          </Flex>
          {/* Remaining Products row */}
          <Card>
            <Flex direction={'column'} gap={'2'}>
              <Flex justify={'between'} align={'center'} gap={'4'}>
                <Text size={'1'}>Sales</Text>
                <Flex align={'center'} gap={'4'}>
                  <PaperPlaneIcon fill="orange" color="orange" />
                  <Text size={'2'}>{sales_price || '1269'}</Text>
                </Flex>
              </Flex>
              <Separator size={'4'} />
              <Flex justify={'between'} align={'center'} gap={'4'}>
                <Text truncate size={'1'}>
                  Remaining Products
                </Text>
                <Flex align={'center'} gap={'4'}>
                  <Box width="100px">
                    <Progress size={'2'} value={50} variant="classic" color="orange" />
                  </Box>
                  <Text size={'2'}>{sales_price || '1269'}</Text>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        </Flex>
      </Card>
    </Flex>
  );
}
