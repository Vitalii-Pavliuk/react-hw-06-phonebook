import React from "react";
import style from "./ContactForm.module.css";

class ContactForm extends React.Component {
  handleChange = (event) => {
    this.props.onInputChange(event);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onAddContact();
  };

  render() {
    return (
      <form className={style.contactForm} onSubmit={this.handleSubmit}>
        <label className={style.contactFormLabel}>
          Name
          <input
            className={style.contactFormInput}
            type="text"
            name="name"
            value={this.props.name}
            onChange={this.handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces."
            required
          />
        </label>
        <label className={style.contactFormLabel}>
          Number
          <input
            className={style.contactFormInput}
            type="tel"
            name="number"
            value={this.props.number}
            onChange={this.handleChange}
            pattern="\+?\d{1,4}?[ .-]?\(?\d{1,3}?\)?[ .-]?\d{1,4}[ .-]?\d{1,4}[ .-]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={style.contactFormButton} type="submit">Add contact</button>
      </form>
    );
  }
}

export default ContactForm;
