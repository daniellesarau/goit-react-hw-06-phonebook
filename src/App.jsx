import React, { useState, useEffect } from 'react';
import css from './app.module.css';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

// salveaza in local storage contactele
const useLocalStorage = (key, defaultValue) => {
  const [storage, setStorage] = useState(
    () => window.JSON.parse(localStorage.getItem(key)) ?? defaultValue
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storage));
  }, [storage, key]);

  return [storage, setStorage];
};
export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const onSubmitHandler = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const includeName = contacts.find(user => user.name === contact.name);
    if (includeName) {
      alert(`${contact.name} is already in contacts`);
    } else {
      setContacts(prevContacts => [contact, ...prevContacts]);
    }
  };

  const handleChange = event => {
    const { value } = event.target;
    setFilter(value);
  };

  const handleDelete = id => {
    const newContactList = contacts.filter(contact => contact.id !== id);
    setContacts(newContactList);
  };
  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={onSubmitHandler} />

      <h2 className={css.title}>Contacts</h2>
      <Filter value={filter} onChange={handleChange} />
      <ContactList contacts={filterContacts} onDelete={handleDelete} />
    </div>
  );
};
