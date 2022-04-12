import './App.css';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import testData from './data.json';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

function App() {
  const [contacts, setContacts] = useState([...testData]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localStorageContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(localStorageContacts);

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const getFilteredContacts = () => {
    const filteredList = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredList;
  };

  const handleFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const handleOnFormSubmit = data => {
    const { name, number } = data;
    if (
      contacts.find(
        contact =>
          name.toLowerCase().charCodeAt() ===
          contact.name.toLowerCase().charCodeAt()
      )
    ) {
      toast(name + ' is already in contacts');

      return;
    }

    setContacts(prevState => {
      return [{ name: name, id: uuidv4(), number: number }, ...prevState];
    });
  };

  const deleteContact = id =>
    setContacts(prevState => prevState.filter(contact => contact.id !== id));

  return (
    <div>
      <ToastContainer />
      <h1>Phonebook</h1>
      <ContactForm handleOnFormSubmit={handleOnFormSubmit} />

      <h2>Contacts</h2>
      <Filter
        contacts={contacts}
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <ContactList
        contacts={getFilteredContacts()}
        deleteContact={deleteContact}
      />
    </div>
  );
}

export default App;
