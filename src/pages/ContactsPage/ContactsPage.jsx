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
  // const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  return (
      <div>
        <h1 style={{ fontSize: 40, lineHeight: 1.2 }}>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {loader && !error && <Loader />}
      <ContactList />
      </div>
  );
};
export default ContactsPage;
