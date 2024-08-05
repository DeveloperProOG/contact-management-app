import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../redux/contactsSlice';
import { Contact } from '../redux/contactsSlice';

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <div className="bg-white p-4 rounded shadow-md flex justify-between items-center">
      <div>
        <p>{contact.firstName} {contact.lastName} ({contact.status})</p>
      </div>
      <div className="space-x-2">
        <button onClick={() => onEdit(contact)} className="bg-green-500 text-white py-1 px-2 rounded">
          Edit
        </button>
        <button onClick={handleDelete} className="bg-red-500 text-white py-1 px-2 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
