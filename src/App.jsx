import './App.css';
import { Route, Routes } from 'react-router-dom';
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
// const ErrorPage = lazy(() => import('./pages/ErrorPage/ErrorPage'));

const App = () => {
  const dispatch = useDispatch();
  const loader = useSelector(selectLoading);
  const isRefreshing = useSelector(selectIsRefreshing);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(fetchContact());
  }, [dispatch]);

  // Show a loading screen while refreshing the session
  if (isRefreshing) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      {loader && <Loader />}
      {error && <p>Error: {error}</p>}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
            }
          />
        </Route>

        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
          }
        />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<RegisterPage />}
            />
          }
        />
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
    </Suspense>
  );
};

export default App;
