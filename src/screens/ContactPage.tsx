import React, { useState } from 'react';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import { Contact } from '../redux/contactsSlice';

const ContactPage: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (contact: Contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const clearSelectedContact = () => {
    setSelectedContact(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 space-y-4">
       <div className="flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Create Contact
        </button>
      </div>
      <ContactList onEdit={handleEdit} />
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md w-1/3">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-red-500 text-white py-1 px-2 rounded float-right"
            >
              Close
            </button>
            <ContactForm selectedContact={selectedContact} clearSelectedContact={clearSelectedContact} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
