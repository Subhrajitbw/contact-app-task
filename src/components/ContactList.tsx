import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { deleteContact, Contact } from '../contactSlice';
import { useNavigate } from 'react-router-dom';

interface ContactListProps {
  contacts: Contact[];
}

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  contacts = useSelector((state: RootState) => state.contacts.contacts);

  const handleEdit = (contact: Contact) => {
    // Implement edit functionality
    // Navigate to an edit page or open a modal
    navigate(`/edit/${contact.id}`);
  };

  const handleDelete = (id: string) => {
    const confirm = window.confirm('Are you sure you want to delete this contact?');
    if (confirm) {
      dispatch(deleteContact(id));
    }
  };

  return (
    <div className="text-center container mx-auto mt-8">
      <h2 className="text-2xl text-center font-bold mb-4">Contact List</h2>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
        onClick={() => navigate('/create')}
      >
        Create New Record
      </button>
      {contacts.length === 0 ? (
        <p>No contacts available. Create records now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {contacts.map(contact => (
            <div key={contact.id} className="text-center bg-gray-100 p-4 rounded-md border border-gray-300">
              <p>
                <strong>First Name:</strong> {contact.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {contact.lastName}
              </p>
              <p>
                <strong>Status:</strong> {contact.status}
              </p>
              <div className="mt-2">
                <button
                  className="bg-blue-500 text-white py-1 px-2 rounded-md mr-2"
                  onClick={() => handleEdit(contact)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded-md"
                  onClick={() => handleDelete(contact.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;
