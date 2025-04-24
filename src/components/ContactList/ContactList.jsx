import React from "react";
import style from "./ContactList.module.css";

const ContactList = ({ contacts, onDelete}) => {
return (
    <ul className={style.contactList}>
        {contacts.map((contact) => (
            <li className={style.contactItem} key={contact.id}>
                <span className="contactInfo">
                    {contact.name}: {contact.number}
                </span>
                <button
                    className={style.deleteButton}
                    onClick={() => onDelete(contact.id)}
                >
                    Delete
                </button>
            </li>
        ))}
    </ul>
);
};

export default ContactList;
