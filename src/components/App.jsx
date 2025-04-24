import React, { useState, useEffect } from "react"
import { nanoid } from "nanoid"

import style from "./App.module.css"

import ContactForm from "./ContactForm/ContactForm"
import ContactList from "./ContactList/ContactList"
import SearchContact from "./SearchContact/SearchContact"

function App() {
  const [contacts, setContacts] = useState([
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ])
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [filter, setFilter] = useState("")

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts")
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts))
  }, [contacts])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    if (name === "name") setName(value)
    else if (name === "number") setNumber(value)
  }

  const addContact = () => {
    if (name.trim() === "" || number.trim() === "") return

    const nameExists = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase(),
    )

    if (nameExists) {
      alert(`${name} is already in contacts.`)
      return
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    }

    setContacts((prev) => [...prev, newContact])
    setName("")
    setNumber("")
  }

  const changeFilter = (event) => {
    setFilter(event.target.value)
  }

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase()
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter),
    )
  }

  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id))
  }

  const filteredContacts = getVisibleContacts()

  return (
    <div className={style.container}>
      <h1 className={style.title}>Phonebook</h1>
      <ContactForm
        name={name}
        number={number}
        onInputChange={handleInputChange}
        onAddContact={addContact}
      />
      <h2 className={style.subtitle}>Contacts</h2>
      <SearchContact value={filter} onFilterChange={changeFilter} />
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
  )
}

export default App
