import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import ContactCard from './ContactCard';
import { Contact } from '../redux/contactsSlice';

interface ContactListProps {
  onEdit: (contact: Contact) => void;
}

const ContactList: React.FC<ContactListProps> = ({ onEdit }) => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  return (
    <div className="space-y-4 max-h-80 overflow-y-auto">
      {contacts.length === 0 ? (
        <div className="bg-gray-200 p-4 rounded shadow-md">
          <p>No Contact Found. Please add contact from Create Contact Button</p>
        </div>
      ) : (
        contacts.map(contact => <ContactCard key={contact.id} contact={contact} onEdit={onEdit} />)
      )}
    </div>
  );
};

export default ContactList;
