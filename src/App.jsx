import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './components/Loader/Loader';
import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';
import { selectError, selectLoading } from './redux/contacts/selectors';
import { fetchContact } from './redux/contacts/operations';
import Layout from './components/Layout/Layout';
import { selectIsRefreshing } from './redux/auth/selectors';
import { refreshUser } from './redux/auth/operations';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));
// const Navigation = lazy(() => import('./components/Navigation/Navigation'));

const App = () => {
  const dispatch = useDispatch();
  // const loader = useSelector(selectLoading);
  const isRefreshing = useSelector(selectIsRefreshing);
  const error = useSelector(selectError);

 useEffect(() => {
   dispatch(refreshUser());
 }, [dispatch]);

  
  if (isRefreshing) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      {error && <p>Error: {error}</p>}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/contacts" element={ <PrivateRoute redirectTo="/login" component={<ContactsPage />} />}/>
        

        <Route path="/login" element={ <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />}/>
        <Route path="/register" element={<RestrictedRoute redirectTo="/contacts" component={<RegisterPage />}/>}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
