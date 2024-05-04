import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/store';
import { deleteContact, updateContact } from '../store/features/contactSlice';
import UpdateContactModal from './UpdateContactModal';

interface Contact {
    id: string;
    fname: string;
    lname: string;
    isActive: boolean;
}

const AllContact = () => {
    const contacts = useAppSelector((state) => state.contact.contacts);
    const dispatch = useAppDispatch();
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

    const handleDelete = (contactId: string) => {
        if (window.confirm("Are you sure you want to delete this contact?")) {
            dispatch(deleteContact(contactId));
        }
    };

    const handleUpdate = (updatedContact: Contact) => {
        dispatch(updateContact(updatedContact));
    };

    const handleOpenUpdateModal = (contact: Contact) => {
        setSelectedContact(contact);
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setSelectedContact(null);
        setShowUpdateModal(false);
    };

    return (
        <div className=''>
            <h1 className='text-2xl md:text-4xl'>All Contacts</h1>
            <table className='border border-collapse border-gray-200 mt-4'>
                <thead>
                    <tr>
                        <th className='px-2 py-1 font-serif bg-gray-100 border border-gray-200'>First Name</th>
                        <th className='px-2 py-1 font-serif bg-gray-100 border border-gray-200'>Last Name</th>
                        <th className='px-2 py-1 font-serif bg-gray-100 border border-gray-200'>Status</th>
                        <th className='px-2 py-1 font-serif bg-gray-100 border border-gray-200'>Update</th>
                        <th className='px-2 py-1 font-serif bg-gray-100 border border-gray-200'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact.id} className='border-t border-gray-200'>
                            <td className='px-4 py-2'>{contact.fname}</td>
                            <td className='px-4 py-2'>{contact.lname}</td>
                            <td className={`px-4 py-2 ${contact.isActive ? 'text-green-600' : 'text-red-600'}`}>
                                {contact.isActive ? "Active" : "Not Active"}
                            </td>
                            <td className='px-4 py-2'><button onClick={() => handleOpenUpdateModal(contact)}>Update</button></td>
                            <td className='px-4 py-2'><button onClick={() => handleDelete(contact.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedContact && <UpdateContactModal isOpen={showUpdateModal} onClose={handleCloseUpdateModal} contact={selectedContact} onUpdate={handleUpdate} />}
        </div>
    );
}

export default AllContact;
