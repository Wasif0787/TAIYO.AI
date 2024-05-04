import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/store';
import { deleteContact, updateContact } from '../store/features/contactSlice';
import UpdateContactModal from './UpdateContactModal';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import DetailContactModal from './DetailContactModal';
import { IoIosMore } from "react-icons/io";


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
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [selectedContactDetail, setSelectedContactDetail] = useState<Contact | null>(null);

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, contactId: string, contactName: string) => {
        event.preventDefault();
        if (window.confirm(`Are you sure you want to delete ${contactName} contact?`)) {
            dispatch(deleteContact(contactId));
        }
    };

    const handleUpdate = (updatedContact: Contact) => {
        dispatch(updateContact(updatedContact));
    };

    const handleOpenUpdateModal = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, contact: Contact) => {
        event.preventDefault();
        setSelectedContact(contact);
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setSelectedContactDetail(null);
        setShowUpdateModal(false);
    };

    const handleOpenDetailModal = (contact: Contact) => {
        setSelectedContactDetail(contact)
        setShowDetailModal(true)
    }

    const handleCloseDetailModal = () => {
        setSelectedContact(null)
        setShowDetailModal(false)
    }

    return (
        <div className=''>
            {contacts.length === 0 ? (
                <p className="text-center mt-4">No contacts found. Please create a contact using the add contact button.</p>
            ) : (
                <div className='grid md:grid-cols-3 gap-8 md:gap-12'>
                    {contacts.map((contact) => (
                        <div key={contact.id} className="relative bg-white border border-gray-200 rounded-lg shadow md:max-w-xl hover:bg-gray-100 dark:border-gray-700 hover:cursor-pointer">
                            <div className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                                <IoIosMore onClick={() => handleOpenDetailModal(contact)} />
                            </div>
                            <div className="p-4">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight">{contact.fname} {contact.lname}</h5>
                                <div className='flex flex-row gap-1 text-pink-300 text-2xl'>
                                    <button onClick={(event) => handleOpenUpdateModal(event, contact)} className='hover:cursor-pointer'>
                                        <FaRegEdit />
                                    </button>
                                    <button onClick={(event) => handleDelete(event, contact.id, `${contact.fname} ${contact.lname}`)} className='hover:cursor-pointer'>
                                        <MdDeleteOutline />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {selectedContact && <UpdateContactModal isOpen={showUpdateModal} onClose={handleCloseUpdateModal} contact={selectedContact} onUpdate={handleUpdate} />}
            {selectedContactDetail && <DetailContactModal isOpen={showDetailModal} onClose={handleCloseDetailModal} contact={selectedContactDetail} />}
        </div>
    );
}

export default AllContact;
