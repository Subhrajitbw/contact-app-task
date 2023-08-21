import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addContact, Contact } from '../contactSlice';
import { v4 as uuidv4 } from 'uuid';
import ContactList from './ContactList';
import { useNavigate } from 'react-router-dom';


const ContactForm: React.FC = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Contact>({
    id: '',
    firstName: '',
    lastName: '',
    status: 'Active',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newContact: Contact = {
      id: uuidv4(), // Generate a unique ID
      firstName: formData.firstName,
      lastName: formData.lastName,
      status: formData.status,
    };
    dispatch(addContact(newContact));
    setFormData({
      id: '',
      firstName: '',
      lastName: '',
      status: 'Active',
    });
    navigate('/');
  };

  const handleEdit = (contact: Contact) => {
    // Implement the edit functionality
    // You can open a modal or navigate to an edit page
  };

  const handleDelete = (id: string) => {
    // Implement the delete functionality
    // You can prompt the user for confirmation before deleting
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl text-center font-bold mb-4">Contact</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block font-medium">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block font-medium">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Status</label>
          <div>
            <label>
              <input
                type="radio"
                name="status"
                value="active"
                checked={formData.status === 'Active'}
                onChange={handleInputChange}
              />{' '}
              Active
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="inactive"
                checked={formData.status === 'Inactive'}
                onChange={handleInputChange}
              />{' '}
              Inactive
            </label>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Submit
        </button>
      </form>
      {/* {contacts.length === 0 && <p>No contacts available. Create records now.</p>}
      {contacts.length > 0 && (
        <ContactList contacts={contacts} onEdit={handleEdit} onDelete={handleDelete} />
      )} */}
    </div>
  );
};

export default ContactForm;
