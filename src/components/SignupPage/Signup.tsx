import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  Box,
  Button,
  //   Card,
  Container,
  Flex,
  Heading,
  Link,
  Spinner,
  Text,
  TextField
} from '@radix-ui/themes';
import { CaretRightIcon } from '@radix-ui/react-icons';
// import { BiLogoGithub, BiLogoGoogle } from 'react-icons/bi';
import AnimateText from '../AnimateText/AnimateText';
import { usePathContext } from '../PathContext/usePathContext';
import Slider from '../Slider/Slider';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  username: Yup.string()
    .matches(/^[A-Za-z]{3,20}$/, 'Only letters are allowed.')
    .required('Username is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required.')
});

export default function Signup() {
  const navigate = useNavigate();
  const { pathname } = usePathContext();

  const action = '/proxy/auth/signup';
  return (
    <Flex
      align="center"
      gap="2"
      justify="center"
      p={{ lg: '4', sm: '2', xs: '2', md: '2', initial: '2' }}
      wrap="wrap"
      width={'85%'}
    >
      <Flex
        position="relative"
        width={{ initial: '200px', xs: '200px', sm: '200px', md: '40%', lg: '40%' }}
        maxHeight={{ initial: '200px', xs: '200px', sm: '200px', md: 'auto', lg: 'auto' }}
        mt={{ initial: '-10px', xs: '-10' }}
      >
        <Heading
          style={{
            position: 'absolute',
            top: -70,
            left: 50,
            height: '80px',
            zIndex: 50,
            padding: 2
          }}
          mx={{ initial: '-4' }}
          size={{ lg: '9', sm: '7', md: '8', xs: '7', initial: '7' }}
        >
          <AnimateText texts={['Champions', 'Inventory', 'E-Commerce']} />
        </Heading>

        <img
          width="100%"
          height={'50%'}
          src="/battery.png"
          style={{
            objectFit: 'cover',
            maxWidth: '95%',
            borderRadius: 10,
            maxHeight: '75vh'
          }}
        />
        <Flex
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            // overflow: 'hidden',
            borderRadius: '50%',
            width: 'max-content',
            boxShadow: '2px 2px 2px 2px rgba(0,0,0,0.1)'
          }}
        >
          <Slider buttonVisible={false} />
        </Flex>
      </Flex>

      <Container
        style={{ zIndex: 10 }}
        px={{ lg: '6', md: '4', sm: '4', xs: '4' }}
        width={{ xs: '100%', sm: '100%' }}
      >
        <Formik
          initialValues={{ email: '', password: '', username: '' }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { setSubmitting }) => {
            console.log('submit', values);
            setSubmitting(true);
            try {
              const response = await axios.post(action, values);
              console.log(response.data);

              navigate(pathname ? pathname : '/', { replace: true });
            } catch (error) {
              console.error(error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, handleChange, handleSubmit, handleBlur, touched, errors, isSubmitting }) => (
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Flex
                direction="column"
                gap="4"
                align="start"
                px={'4'}
                flexBasis={'1'}
                flexGrow={'1'}
              >
                <Heading size="6" weight="bold">
                  Register
                </Heading>

                {/* <Text size="2">
                  <Link size="2" href="#">
                    Forgot your password?
                  </Link>
                </Text> */}
                {/* USERNAME */}
                <Box style={{ width: '80%' }}>
                  <TextField.Root
                    name="username"
                    type="text"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Username"
                    aria-invalid={!!(touched.username && errors.username)}
                    style={{
                      border: 'none',
                      outline: 'none',
                      width: '100%',
                      padding: '8px 4px',
                      background: 'transparent',
                      fontSize: '14px'
                    }}
                  >
                    {touched.username && errors.username && (
                      <Text
                        align={'right'}
                        size="1"
                        style={{ width: '100%', color: 'var(--red-600, #e11)', marginTop: 0 }}
                      >
                        {errors.username}
                      </Text>
                    )}
                    {/* optional slot (icon) */}
                    {/* <TextField.Slot /> */}
                  </TextField.Root>
                </Box>

                {/* EMAIL */}
                <Box style={{ width: '80%' }}>
                  <TextField.Root
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email"
                    aria-invalid={!!(touched.email && errors.email)}
                    style={{
                      border: 'none',
                      outline: 'none',
                      width: '100%',
                      padding: '8px 4px',
                      background: 'transparent',
                      fontSize: '14px'
                    }}
                  >
                    {touched.email && errors.email && (
                      <Text
                        align={'right'}
                        size="1"
                        style={{ width: '100%', color: 'var(--red-600, #e11)', marginTop: 0 }}
                      >
                        {errors.email}
                      </Text>
                    )}
                    {/* optional slot (icon) */}
                    {/* <TextField.Slot /> */}
                  </TextField.Root>
                </Box>

                {/* PASSWORD */}
                <Box style={{ width: '80%' }}>
                  <TextField.Root
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Password"
                    aria-invalid={!!(touched.password && errors.password)}
                    style={{
                      border: 'none',
                      outline: 'none',
                      width: '100%',
                      padding: '8px 4px',
                      background: 'transparent',
                      fontSize: '14px'
                    }}
                  >
                    {touched.password && errors.password && (
                      <Text
                        align={'right'}
                        size="1"
                        style={{ width: '100%', color: 'var(--red-600, #e11)', marginTop: 0 }}
                      >
                        {errors.password}
                      </Text>
                    )}
                    {/* <TextField.Slot /> */}
                  </TextField.Root>
                </Box>

                <Button
                  variant="classic"
                  size="3"
                  style={{ padding: '8px' }}
                  highContrast
                  type="submit"
                  disabled={isSubmitting}
                >
                  Signup
                  {isSubmitting ? <Spinner /> : <CaretRightIcon />}
                </Button>

                {/* <Flex align="center" gap="4" width="40%">
                  <Button
                    type="button"
                    variant="surface"
                    size="3"
                    style={{ width: '60%' }}
                    highContrast
                  >
                    <BiLogoGoogle size="20" />
                  </Button>

                  <Button
                    type="button"
                    variant="surface"
                    size="3"
                    style={{ width: '60%' }}
                    highContrast
                  >
                    <BiLogoGithub size="20" />
                  </Button>
                </Flex> */}

                <Badge size="1">
                  {' '}
                  By signing up, you agree to our website’s terms and conditions.
                </Badge>

                <Text size="2">
                  Already have an account?
                  <Link size="2" href="/login">
                    {' '}
                    Click Here
                  </Link>
                </Text>
              </Flex>
            </form>
          )}
        </Formik>
      </Container>
    </Flex>
  );
}
