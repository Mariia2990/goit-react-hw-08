import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import css from './LoginForm.module.css';
import toast from 'react-hot-toast';
import { Field, Form, Formik } from 'formik';
// import { useState } from 'react';
import * as Yup from 'yup';
import { Box,Button } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxSizing: 'border-box',
  maxWidth: '440px',
  minWidth: '320px',
  width: '100%',
  height:'480px',
  borderRadius: '4px',
  boxShadow: 24,
  p: 2,
  paddingTop: '60px',
};

 const LoginForm = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const dispatch = useDispatch();
  // const [password, setPassword] = useState(false);
  
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Required'),
  });

 const handleSubmit = async (values, { resetForm }) => {
  try {
    await toast.promise(dispatch(login(values)).unwrap(), {
      loading: 'Login...',
      success: <b>User is logged in!</b>,
      error: <b>Login error!</b>,
    });
    resetForm(); 
  } catch (error) {
    console.error('Login error:', error);
  }
};


  return (
    <Box sx={style}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form} onSubmit={handleSubmit} autoComplete="off">
          <label className={css.label}>
            Email
            <Field type="email" name="email" className={css.fieldLogin} />
          </label>
          <label className={css.label}>
            Password
            <Field type="password" name="password" className={css.fieldLogin} />
          </label>
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: '180px',
              height: '60px',
              marginTop: '50px',
              fontSize: '22px',
              backgroundColor: '#dae445',
            }}
          >
            Login
          </Button>
          ;
        </Form>
      </Formik>
    </Box>
  );
};

export default LoginForm;