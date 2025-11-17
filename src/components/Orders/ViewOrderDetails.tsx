import { Card, Flex, Text } from '@radix-ui/themes';
import React from 'react';
import type { statusProps } from './ViewOrder';

export interface OrderDetailsProps {
  fullname?: string;
  email?: string;
  phone?: string;
  shipping?: string;
  payment_method?: string;
  status?: string;
  address?: string;
}
export interface DetailsProps {
  logo?: React.ReactNode;
  title?: string;
  details?: statusProps[];
  custom_button?: React.ReactNode;
}

export default function ViewOrderDetails({ logo, title, details, custom_button }: DetailsProps) {
  return (
    <Flex flexBasis={'1'} flexGrow={'1'}>
      <Card style={{ width: '100%' }}>
        <Flex direction={'column'} gap={'2'} width={'100%'}>
          <Flex width={'100%'} gap={'2'} align={'start'}>
            {logo}
            <Flex width={'100%'} direction={'column'} gap={'2'}>
              <Text size={'2'} weight={'bold'}>
                {title}
              </Text>
              <Flex width={'100%'} direction={'column'} gap={'2'}>
                {details?.map((detail) => (
                  <Flex maxWidth={'500px'} gap={'2'} width={'100%'}>
                    <Text weight={'bold'} truncate size={'1'}>
                      {detail.label}:{' '}
                    </Text>
                    <Text size={'1'} wrap={'wrap'}>
                      {detail.value}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          </Flex>
          <Flex width={'100%'} justify={'center'} align={'center'} maxWidth={'100%'}>
            {custom_button}
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
