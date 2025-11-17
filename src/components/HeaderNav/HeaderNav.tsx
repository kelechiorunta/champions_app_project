import { useLocation } from 'react-router-dom';
import { Box, Flex, Grid, TabNav } from '@radix-ui/themes';

export default function HeaderNav() {
  const location = useLocation();

  return (
    <Box maxWidth={'350px'}>
      <Grid columns={'1'} rows={'50px 1fr'}>
        <Flex direction="column" gap="4" pb="2">
          <TabNav.Root>
            <TabNav.Link active={location.pathname === '/'} href="/">
              Dashboard
            </TabNav.Link>
            <TabNav.Link active={location.pathname.includes('/products')} href="/products">
              Products
            </TabNav.Link>
            <TabNav.Link active={location.pathname === '/orders'} href="/orders">
              Orders
            </TabNav.Link>
          </TabNav.Root>
        </Flex>
      </Grid>
    </Box>
  );
}
