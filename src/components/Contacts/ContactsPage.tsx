import React from 'react';
import { Flex, Heading, Separator } from '@radix-ui/themes';

import ContactsLists from './ContactsLists';

export default function ContactsPage() {
  return (
    <Flex direction={'column'} py={'3'} px={'4'} width={'85%'} maxWidth={'100%'}>
      <Heading size={'5'} align={'left'} mb={'3'} mt={'1'} truncate>
        Contacts & Customers
      </Heading>
      <Separator size="4" />

      <ContactsLists />
    </Flex>
  );
}
