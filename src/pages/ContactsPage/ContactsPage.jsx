import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import Loader from "../../components/Loader/Loader";
import ContactList from "../../components/ContactList/ContactList";
import { fetchContact } from "../../redux/contacts/operations";
import { selectError, selectLoading } from "../../redux/contacts/selectors";


const ContactsPage = () => {
  const dispatch = useDispatch();
  const loader = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  return (
      <div>
        <h2>Phone<span>book</span></h2>
      <ContactForm />
      <SearchBox />
      {loader && !error && <Loader />}
      <ContactList />
      </div>
  );
};
export default ContactsPage;
