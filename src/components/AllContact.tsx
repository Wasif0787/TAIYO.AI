import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/store';
import { deleteContact, updateContact } from '../store/features/contactSlice';
import UpdateContactModal from './UpdateContactModal';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

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

    const handleDelete = (contactId: string, contactName: string) => {
        if (window.confirm(`Are you sure you want to delete ${contactName} contact?`)) {
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
            <div className='grid md:grid-cols-3 gap-8 md:gap-12'>
                {contacts.map((contact) => (
                    <div key={contact.id} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700">
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight">{contact.fname} {contact.lname}</h5>
                            <p className={`mb-3 font-normal ${contact.isActive ? 'text-green-600' : 'text-red-600'}`}> {contact.isActive ? "Active" : "Not Active"}</p>
                        </div>
                        <div className='flex flex-row gap-1 text-pink-300 m-2 text-2xl'>
                            <FaRegEdit onClick={() => handleOpenUpdateModal(contact)} className='hover:cursor-pointer' />
                            <MdDeleteOutline onClick={() => handleDelete(contact.id, `${contact.fname} ${contact.lname}`)} className='hover:cursor-pointer' />
                        </div>
                    </div>
                ))}
            </div>
            {selectedContact && <UpdateContactModal isOpen={showUpdateModal} onClose={handleCloseUpdateModal} contact={selectedContact} onUpdate={handleUpdate} />}
        </div >
    );
}

export default AllContact;
