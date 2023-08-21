import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useNavigate, useParams } from 'react-router-dom';
import { Contact, updateContact } from '../contactSlice';



const EditContact: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  // Get contacts from the Redux state using useSelector
  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  // Find the contact with the matching ID
  const contact = contacts.find((contact) => contact.id === params.id);

  const [formData, setFormData] = useState<Contact>({
    id: '',
    firstName: '',
    lastName: '',
    status: 'Active',
  });

  useEffect(() => {
    if (contact) {
      setFormData(contact);
    }
  }, [contact]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateContact(formData)); // Dispatch the update action
    navigate('/');
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl text-center font-bold mb-4">Edit Contact</h2>
      {contact && (
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
                  value="Active"
                  checked={formData.status === 'Active'}
                  onChange={handleInputChange}
                />{' '}
                Active
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={formData.status === 'Inactive'}
                  onChange={handleInputChange}
                />{' '}
                Inactive
              </label>
            </div>
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default EditContact;
