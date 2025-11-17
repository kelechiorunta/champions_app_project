import products from './products';
import {
  AlertDialog,
  AspectRatio,
  Avatar,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextArea,
  TextField
} from '@radix-ui/themes';
import { Formik, Form, Field, ErrorMessage, type FieldProps } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { BackpackIcon } from '@radix-ui/react-icons';

export interface formProps {
  name?: string;
  description?: string;
  category?: string;
  brand?: string;
  sku?: string;
  stock_quantity?: string | number;
  regular_price?: string | number;
  sales_price?: string | number;
  tag?: string;
  gallery?: string;
}

export interface ViewProps {
  name?: string;
  handleSubmit?: (values: formProps) => void;
}

// ✅ Validation Schema using Yup
const ProductSchema = Yup.object().shape({
  name: Yup.string().required('Product name is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
  brand: Yup.string().required('Brand is required'),
  sku: Yup.string().required('SKU is required'),
  stock_quantity: Yup.string()
    .required('Stock quantity is required')
    .min(0, 'Must be greater than or equal to 0'),
  regular_price: Yup.string()
    .required('Regular price is required')
    .min(0, 'Must be greater than or equal to 0'),
  sales_price: Yup.string()
    .required('Sales price is required')
    .min(0, 'Must be greater than or equal to 0'),
  tag: Yup.string().required('Tag is required'),
  gallery: Yup.mixed().required('Gallery image is required')
});

export default function AddProduct({ name }: ViewProps) {
  const product = products.find((p) => p.name === name);
  const [initialProduct, setInitialProduct] = useState(product);
  const [preview, setPreview] = useState<string>(product?.gallery || '');

  return (
    <Flex direction={'column'} gap={'2'} p={'3'} mt={'-3'}>
      <Heading size={'5'} style={{ padding: '5px' }}>
        Add Product
      </Heading>

      <Card style={{ maxWidth: '100%', margin: 'auto', marginTop: '-10px' }}>
        <Formik
          initialValues={{
            name: product?.name || '',
            description: product?.description || '',
            category: product?.category || '',
            brand: product?.brand || '',
            sku: product?.sku || '',
            stock_quantity: product?.stock_quantity || 0,
            regular_price: product?.regular_price || 0,
            sales_price: product?.sales_price || 0,
            tag: product?.tag?.join(', ') || '',
            gallery: product?.gallery || ''
          }}
          validationSchema={ProductSchema}
          onSubmit={(values) => {
            alert((initialProduct?.name === values?.name).toString());
            setInitialProduct(initialProduct);
            console.log('✅ Submitted Values:', values);
            //   if (handleSubmit && values) handleSubmit(values);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <Flex justify={'between'} gap={'8'} align={'center'} pl={'1'} pr={'6'} pb={'4'}>
                {/* LEFT COLUMN */}
                <Flex
                  direction={'column'}
                  align={'start'}
                  gap={'3'}
                  maxWidth={'300px'}
                  width={'100%'}
                >
                  {/* Product Name */}
                  <FormField label="Name" name="name" placeholder="Product Name" />

                  {/* Description */}
                  <FormField
                    label="Description"
                    name="description"
                    as="textarea"
                    placeholder="Product Description"
                  />

                  {/* Category */}
                  <FormField label="Category" name="category" placeholder="Product Category" />

                  {/* Brand */}
                  <FormField label="Brand" name="brand" placeholder="Brand" />

                  {/* SKU and Stock */}
                  <Flex gap={'2'}>
                    <FormField label="SKU" name="sku" placeholder="SKU" />
                    <FormField label="Stock Quantity" name="stock_quantity" type="string" />
                  </Flex>

                  {/* Regular and Sales Price */}
                  <Flex gap={'2'}>
                    <FormField label="Regular Price" name="regular_price" type="string" />
                    <FormField label="Sales Price" name="sales_price" type="string" />
                  </Flex>

                  {/* Tags */}
                  <FormField label="Tag" name="tag" placeholder="Tags (comma separated)" />
                </Flex>

                {/* RIGHT COLUMN */}
                <Flex direction={'column'} gap={'6'} width={'30%'}>
                  <Flex direction={'column'} gap={'1'}>
                    <AspectRatio ratio={4 / 4}>
                      <Avatar
                        src={preview || '/assets/placeholder.jpg'}
                        fallback={product?.name?.[0] || <BackpackIcon scale={1.5} />}
                        radius="large"
                        size={'9'}
                      />
                    </AspectRatio>
                  </Flex>
                  {/* Image Upload */}
                  <Flex direction="column" gap="1">
                    <Text as="label" size="2" weight="bold" truncate>
                      Gallery Image
                    </Text>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setFieldValue('gallery', file);
                          const reader = new FileReader();
                          reader.onloadend = () => setPreview(reader.result as string);
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <ErrorMessage
                      name="gallery"
                      component="div"
                      // style={{ color: 'red', fontSize: '0.8rem' }}
                    />
                  </Flex>
                </Flex>
              </Flex>

              <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Cancel>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </AlertDialog.Cancel>
                {/* <AlertDialog.Action disabled={!touched.name}> */}
                <Button
                  type="submit"
                  variant="solid"
                  //   color="green"
                  disabled={
                    initialProduct?.name === values?.name &&
                    initialProduct?.description === values?.description &&
                    initialProduct?.category === values?.category &&
                    initialProduct?.brand === values?.brand &&
                    initialProduct?.sku === values?.sku &&
                    initialProduct?.regular_price === values?.regular_price &&
                    initialProduct?.sales_price === values?.sales_price
                  }
                >
                  Add Product
                </Button>

                {/* </AlertDialog.Action> */}
              </Flex>
            </Form>
          )}
        </Formik>
      </Card>
    </Flex>
  );
}

// ✅ Helper Component for Fields
function FormField({
  label,
  name,
  as,
  placeholder
  //   type = 'text'
}: {
  label: string;
  name: string;
  as?: 'textarea';
  placeholder?: string;
  type?: string;
}) {
  const FieldComponent = as === 'textarea' ? TextArea : TextField.Root;
  return (
    <Flex direction={'column'} gap={'1'} width={'100%'} maxWidth={'300px'}>
      <Text as="label" size={'2'} weight={'bold'} truncate>
        {label}
      </Text>
      <Field name={name}>
        {({ field }: FieldProps) => (
          <FieldComponent
            {...field}
            placeholder={placeholder}
            size={'1'}
            // type={type}
            style={{
              textAlign: 'left',
              padding: '4',
              maxWidth: '300px',
              width: '100%',
              textTransform: 'capitalize'
            }}
          />
        )}
      </Field>
      {/* ✅ Wrap ErrorMessage to allow styling */}
      <ErrorMessage name={name}>
        {(msg) => (
          <Text as="span" style={{ color: 'red', fontSize: '0.8rem' }}>
            {msg}
          </Text>
        )}
      </ErrorMessage>
    </Flex>
  );
}
