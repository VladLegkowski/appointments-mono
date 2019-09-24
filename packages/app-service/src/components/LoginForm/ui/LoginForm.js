import React, { PureComponent } from 'react'
import { Form, Field, ErrorMessage, withFormik } from 'formik'
import * as yup from 'yup'
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            user {
                id
                name
                surname
            }
        }
    }
`;

const LoginValidation = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .required(),
});

function Login (props) {
  const [login, { data }] = useMutation(LOGIN);
  console.log(data)

  const { values } = props;
  return (
    <Form onSubmit={() => console.log('hello')}>
      <Field type="text" name="email" placeholder="email" value={values.email} />
      <ErrorMessage name="email" />
      <Field type="password" name="password" placeholder="password" value={values.password} />
      <ErrorMessage name="password" />
      <button type="submit"> Submit </button>
    </Form>
  )
}

const LoginForm = withFormik({
  mapPropsToValues: () => {
    return {
      email: '',
      password: '',
    }
  },
  handleSubmit: (values, { setSubmitting }) => {
    // This is where you could send the submitted values to the backend
    console.log('Submitted Email:', values.email);
    console.log('Submitted Password:', values.password);
    // Simulates the delay of a real request
    setTimeout(() => setSubmitting(false), 3 * 1000)
  },
  validationSchema: LoginValidation,
})(Login);


export { LoginForm }
