import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import css from './RegistrationForm.module.css';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const RegistrationForm = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(register(values)).unwrap();
      toast.success('Registration successful!');
      resetForm();
      setFormSubmitted(true);
    } catch (error) {
      toast.error(`Registration failed: ${error}`);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={css.form} autoComplete="off">
          {formSubmitted && (
            <p className={css.successMessage}>Registration successful!</p>
          )}
          <label className={css.label}>
            Username
            <Field
              type="text"
              name="name"
              className={errors.name && touched.name ? css.errorInput : ''}
            />
            {errors.name && touched.name && (
              <div className={css.errorMessage}>{errors.name}</div>
            )}
          </label>
          <label className={css.label}>
            Email
            <Field
              type="email"
              name="email"
              className={errors.email && touched.email ? css.errorInput : ''}
            />
            {errors.email && touched.email && (
              <div className={css.errorMessage}>{errors.email}</div>
            )}
          </label>
          <label className={css.label}>
            Password
            <Field
              type="password"
              name="password"
              className={
                errors.password && touched.password ? css.errorInput : ''
              }
            />
            {errors.password && touched.password && (
              <div className={css.errorMessage}>{errors.password}</div>
            )}
          </label>
          <button type="submit">Register</button>
        </Form>
      )}
    </Formik>
  );
};
