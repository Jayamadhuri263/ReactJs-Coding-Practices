import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ContactItem from "./Contact Item";
import "./index.css";

const initialContactsList = [
  {
    id: uuidv4(),
    name: "Ram",
    mobileNo: 9999988888,
    isFavorite: false,
  },
  {
    id: uuidv4(),
    name: "Pavan",
    mobileNo: 8888866666,
    isFavorite: true,
  },
  {
    id: uuidv4(),
    name: "Nikhil",
    mobileNo: 9999955555,
    isFavorite: false,
  },
];

function ContactsApp() {
  let [name, setName] = useState("");
  let [mobileNo, setMobileNo] = useState("");
  const [contactList, setContactList] = useState(initialContactsList);
  const [favContactList, setFavContactList] = useState([]);
  const [showFavoritesSection, setShowFavoritesSection] = useState(false);

  const onAddContact = (e) => {
    e.preventDefault();
    const newContact = {
      id: uuidv4(),
      name,
      mobileNo,
      isFavorite: false,
    };
    setContactList([...contactList, newContact]);
    setName("");
    setMobileNo("");
  };

  const toggleIsFavorite = (id) => {
    setContactList(
      contactList.map((eachContact) => {
        if (id === eachContact.id) {
          return { ...eachContact, isFavorite: !eachContact.isFavorite };
        }
        return eachContact;
      })
    );
  };

  const toggleFavoritesSection = () => {
    if (showFavoritesSection) {
      setShowFavoritesSection(false);
    } else {
      setFavContactList(
        contactList.filter((contact) => contact.isFavorite === true)
      );
      setShowFavoritesSection(true);
    }
  };

  return (
    <div className="contacts-app-container">
      <h1 className="contacts-app-heading">Contacts</h1>
      <form
        className="contacts-app-contact-form-container"
        onSubmit={onAddContact}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="contacts-app-input"
          placeholder="Name"
        />
        <input
          className="contacts-app-input"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
          placeholder="Mobile Number"
        />
        <br />
        <button type="submit" className="contacts-app-button">
          Add Contact
        </button>
      </form>
      <button
        type="button"
        className="contacts-app-button"
        onClick={toggleFavoritesSection}
      >
        {showFavoritesSection ? "Hide Favorites" : "Show Favorites"}
      </button>
      <ul className="contacts-app-contacts-table">
        {contactList.map((eachContact) => (
          <ContactItem
            key={eachContact.id}
            contactDetails={eachContact}
            toggleIsFavorite={toggleIsFavorite}
          />
        ))}
      </ul>
      {showFavoritesSection && (
        <>
          <h1>Favorites </h1>
          <ul className="contacts-app-contacts-table">
            {favContactList.map((eachContact) => (
              <ContactItem
                key={eachContact.id}
                contactDetails={eachContact}
                toggleIsFavorite={toggleIsFavorite}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ContactsApp;
