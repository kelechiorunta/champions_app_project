import './SalesGraph.css';
import { Box, Button, Card, Flex, Heading, Tabs } from '@radix-ui/themes';
import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'JUL', sales: 100, weekly: 200, monthly: 50, yearly: 200 },
  { name: 'AUG', sales: 120, weekly: 160, monthly: 100, yearly: 100 },
  { name: 'SEP', sales: 150, weekly: 190, monthly: 70, yearly: 150 },
  { name: 'OCT', sales: 130, weekly: 230, monthly: 100, yearly: 160 },
  { name: 'NOV', sales: 180, weekly: 270, monthly: 150, yearly: 200 },
  { name: 'DEC', sales: 400, weekly: 350, monthly: 300, yearly: 250 }
];

export default function SalesGraph() {
  const [activeTab, setActiveTab] = useState('monthly');

  const handleSelectTab = (value: string) => {
    setActiveTab(value);
  };
  return (
    <Card style={{ width: '100%' }}>
      <Flex align={'baseline'} gap={'8'} justify={'between'}>
        <Flex display={{ initial: 'none', xs: 'flex', sm: 'flex', md: 'none', lg: 'flex' }}>
          <Heading truncate size={{ initial: '5', xs: '5', lg: '5' }}>
            Sales Graph
          </Heading>
        </Flex>

        <Tabs.Root defaultValue="monthly" onValueChange={handleSelectTab}>
          <Tabs.List style={{ display: 'flex' }}>
            <Tabs.Trigger value="weekly">
              <Button variant={activeTab === 'weekly' ? 'solid' : 'surface'}>Weekly</Button>
            </Tabs.Trigger>
            <Tabs.Trigger value="monthly">
              <Button variant={activeTab === 'monthly' ? 'solid' : 'surface'}>Monthly</Button>
            </Tabs.Trigger>
            <Tabs.Trigger value="yearly">
              <Button variant={activeTab === 'yearly' ? 'solid' : 'surface'}>Yearly</Button>
            </Tabs.Trigger>
          </Tabs.List>
          <Box pt="3">
            <Tabs.Content
              className="card-responsive-tab"
              ml={{ initial: '-5%', xs: '-55%', sm: '-90%', md: '-5%', lg: '-55%' }}
              value="weekly"
            >
              {/* <Text size="2">Make changes to your account.</Text> */}
              <Flex
                width={{ initial: '100%', xs: '100%', sm: '90%', md: '100%', lg: '100%' }}
                height={{ initial: '100%', xs: '100%', sm: '100%', md: '100%', lg: '100%' }}
              >
                <ResponsiveContainer width={'100%'} height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="5 5" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey={activeTab === 'weekly' ? 'weekly' : 'sales'}
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Flex>
            </Tabs.Content>

            <Tabs.Content
              className="card-responsive-tab"
              ml={{ initial: '-5%', xs: '-55%', sm: '-90%', md: '-5%', lg: '-55%' }}
              value="monthly"
            >
              {/* <Text size="2">Access and update your documents.</Text> */}
              <Flex
                width={{ initial: '100%', xs: '100%', sm: '90%', md: '100%', lg: '100%' }}
                height={{ initial: '100%', xs: '100%', sm: '100%', md: '100%', lg: '100%' }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="5 5" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey={activeTab === 'monthly' ? 'monthly' : 'sales'}
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Flex>
            </Tabs.Content>

            <Tabs.Content
              className="card-responsive-tab"
              ml={{ initial: '-5%', xs: '-55%', sm: '-90%', md: '-5%', lg: '-55%' }}
              value="yearly"
            >
              {/* <Text size="2">Edit your profile or update contact information.</Text> */}
              <Flex
                width={{ initial: '100%', xs: '100%', sm: '90%', md: '100%', lg: '100%' }}
                height={{ initial: '100%', xs: '100%', sm: '100%', md: '100%', lg: '100%' }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey={activeTab === 'yearly' ? 'yearly' : 'sales'}
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Flex>
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Flex>
    </Card>
  );
}
