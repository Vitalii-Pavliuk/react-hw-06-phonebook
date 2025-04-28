import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { addContact, deleteContact } from "../components/redux/contactsSlice";
import { setFilter } from "../components/redux/filtersSlice";

import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import SearchContact from "./SearchContact/SearchContact";

import style from "./App.module.css";

function App() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.filters.filter);

  const handleAddContact = (name, number) => {
    if (name === "" || number === "") return;

    const nameExists = contacts.some(
      (contact) => contact.name.trim().toLowerCase() === name.toLowerCase()
    );

    if (nameExists) {
      alert(`${name} is already in contacts.`);
      return;
    }

    dispatch(addContact(name, number));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getVisibleContacts();

  return (
    <div className={style.container}>
      <h1 className={style.title}>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <h2 className={style.subtitle}>Contacts</h2>
      <SearchContact value={filter} onFilterChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDelete={handleDeleteContact} />
    </div>
  );
}

export default App;
