const orders = [
  {
    id: 1,
    product: 'Mactosh 124',
    order_id: '#254426',
    customer_name: 'Danilo Sousa',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    status: 'Delivered',
    amount: '£20.00',
    phone: '08065350031',
    order_products: [
      { product: 'Mactosh 124', order_id: '#254426', quantity: 4, price: '£20.00' },
      { product: 'Thermocool 61', order_id: '#254426', quantity: 4, price: '£20.00' },
      { product: 'Blender 235', order_id: '#254421', quantity: 3, price: '£30.00' }
    ],
    image: '/battery.png'
  },
  {
    id: 2,
    product: 'Blender 235',
    order_id: '#254423',
    customer_name: 'Orunta Kelechi',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    status: 'Pending',
    amount: '£30.00',
    phone: '08036449750',
    order_products: [
      { product: 'Hand Sanitizer 345', order_id: '#254422', quantity: 4, price: '£45.00' },
      { product: 'Thermocool 61', order_id: '#254426', quantity: 4, price: '£20.00' },
      { product: 'Blender 235', order_id: '#254421', quantity: 3, price: '£30.00' },
      { product: 'Microwave 562', order_id: '#254424', quantity: 3, price: '£30.00' }
    ],
    image: '/inverter.png'
  },
  {
    id: 3,
    product: 'Hand Sanitizer 345',
    order_id: '#254422',
    customer_name: 'Zahra Ambessa',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    status: 'Delivered',
    amount: '£45.00',
    phone: '08035350031',
    quantity: 3,
    image: '/airpodsPro.png'
  },
  {
    id: 4,
    product: 'Saladmaster 3',
    order_id: '#254426',
    customer_name: 'Jasper Erik',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    status: 'Cancelled',
    amount: '£20.00',
    phone: '08065550031',
    quantity: 1,
    image: '/AppIcon.jpg'
  },
  {
    id: 5,
    product: 'Microwave 562',
    order_id: '#254424',
    customer_name: 'Kelvin Johnny',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    status: 'Delivered',
    amount: '£20.00',
    phone: '07065350031',
    quantity: 5,
    image: '/grocery1.png'
  },
  {
    id: 6,
    product: 'Thermocool 61',
    order_id: '#254421',
    customer_name: 'Orunta Nkechi',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    status: 'Pending',
    amount: '£20.00',
    phone: '09065350031',
    quantity: 2,
    image: '/jug.png'
  },
  {
    id: 7,
    product: 'Shaver 61',
    order_id: '#254425',
    customer_name: 'Orunta Nkechi',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    status: 'Pending',
    amount: '£20.00',
    phone: '08055350031',
    quantity: 6
  }
];

export default orders;
