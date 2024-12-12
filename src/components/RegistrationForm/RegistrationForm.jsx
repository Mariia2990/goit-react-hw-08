import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import css from './RegistrationForm.module.css';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Box, Button, Checkbox, TextField, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxSizing: 'border-box',
  maxWidth: '320px',
  minWidth: '300px',
  width: '100%',
  borderRadius: '4px',
  boxShadow: 22,
  p: 2,
  color: 'white',
};

const fieldStyles = {
  width: '100%',
  '& .MuiFormHelperText-root': {
    color: 'red',
  },
  '& .MuiInputLabel-root': {
    // color: 'white',
    height: '20px',
    borderRadius: '4px',
    fontSize: '18px',
    fontWeight: '400',
    lineHeight: '1.5',
    letterSpacing: '.04em',
    color: '#2e2f42',
    marginBottom: 'auto',
    marginTop: '10px',
  },
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
    '&.Mui-focused': {
      backgroundColor: '#e0e0e0',
    },
  },
  '& .MuiInputBase-input': {
    color: '#2e2f42',
  },
};

export const RegistrationForm = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const dispatch = useDispatch();
  const [checkbox, setCheckbox] = useState(false);
  // const navigate = useNavigate();
  const [checkboxError, setCheckboxError] = useState(false);
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

  const handleCheckboxChange = () => {
    setCheckbox(!checkbox);
    setCheckboxError(false);
  };

  const handleSubmit = async (values, actions) => {
    if (!checkbox) {
      setCheckboxError(true);
      toast.error('You must agree to the terms and conditions', {
        style: {
          border: '1px solid #fff',
          padding: '16px',
          color: 'red',
        },
      });
      return;
    }

    try {
      console.log('Form values:', values);
      await dispatch(register(values)).unwrap();
      toast.success('Registration successful!', {
        style: {
          border: '1px solid #4caf50',
          padding: '16px',
          color: '#4caf50',
        },
      });
      setFormSubmitted(true);
      actions.resetForm();
      setCheckbox(false);
    } catch (error) {
      toast.error(`Registration failed: ${error}`, {
  style: {
    border: '1px solid #fff',
    padding: '16px',
    color: 'red',
  },
});
    }
  };

  return (
    <Box sx={style}>
      <h3 className={css.title}>Register of a new account</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={css.form} autoComplete="off">
            {formSubmitted && (
              <Typography
                sx={{
                  color: 'green',
                  textAlign: 'center',
                  marginBottom: '10px',
                }}
              >
                Registration successful!
              </Typography>
            )}
            <Field name="name">
              {({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  variant="outlined"
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name ? errors.name : ' '}
                  sx={fieldStyles}
                />
              )}
            </Field>

            <Field name="email">
              {({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  variant="outlined"
                  error={Boolean(touched.email && errors.email)}
                  helperText={
                    touched.email && errors.email ? errors.email : ' '
                  }
                  sx={fieldStyles}
                />
              )}
            </Field>
            <Field name="password">
              {({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  variant="outlined"
                  error={Boolean(touched.password && errors.password)}
                  helperText={
                    touched.password && errors.password ? errors.password : ' '
                  }
                  sx={fieldStyles}
                />
              )}
            </Field>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <Checkbox checked={checkbox} onChange={handleCheckboxChange} />
                <Typography variant="body2">
                  I agree to the terms and conditions
                </Typography>
              </Box>
              {checkboxError && (
                <Typography sx={{ color: 'red', fontSize: '12px' }}>
                  You must agree to the terms and conditions
                </Typography>
              )}
            </Box>
            <Button
              type="submit"
              sx={{ width: '100%', height: '50px' }}
              variant="contained"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
