import React, { useState } from 'react';
import { Contact } from '../store/features/contactSlice';


interface UpdateContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    contact: Contact;
    onUpdate: (updatedContact: Contact) => void;
}

const UpdateContactModal: React.FC<UpdateContactModalProps> = ({ isOpen, onClose, contact, onUpdate }) => {
    const [updatedFirstName, setUpdatedFirstName] = useState(contact.fname);
    const [updatedLastName, setUpdatedLastName] = useState(contact.lname);
    const [updatedStatus, setUpdatedStatus] = useState(contact.isActive);
    const [updatedPhoneNo, setUpdatedPhoneNo] = useState(contact.phoneNumber);

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedFirstName(e.target.value);
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedLastName(e.target.value);
    };

    const handlePhoneChange = (value: React.ChangeEvent<HTMLInputElement>) => {
        if (value) {
            setUpdatedPhoneNo(value.target.value);
        } else {
            setUpdatedPhoneNo("");
        }
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedStatus(e.target.checked);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedContact: Contact = {
            id: contact.id,
            fname: updatedFirstName,
            lname: updatedLastName,
            isActive: updatedStatus,
            phoneNumber: updatedPhoneNo
        };
        onUpdate(updatedContact);
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex flex-col justify-center items-center">
                    <div className='flex flex-col w-72 md:w-96 h-full'>
                        <h1 className='text-2xl p-2 bg-[#f75990]'>Update</h1>
                        <div className=" glass-container p-8  rounded-md">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="fname" className="block mb-1">First Name</label>
                                    <input type="text" id="fname" value={updatedFirstName} onChange={handleFirstNameChange} className="w-full glass-container px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="lname" className="block mb-1">Last Name</label>
                                    <input type="text" id="lname" value={updatedLastName} onChange={handleLastNameChange} className="w-full px-3 glass-container py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="lname" className="block mb-1">Phone No</label>
                                    <input type="text" id="lname" value={updatedPhoneNo} onChange={handlePhoneChange} className="w-full px-3 py-2 border glass-container border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                                    {/* <PhoneInput country={"in"} autocompleteSearch enableSearch placeholder='+91 99999 99999' value={updatedPhoneNo} onChange={handlePhoneChange} /> */}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="status" className="flex items-center">
                                        <input type="checkbox" id="status" checked={updatedStatus} onChange={handleStatusChange} className="mr-2" />
                                        Active
                                    </label>
                                </div>
                                <div className="text-right">
                                    <button type="button" className="text-gray-600 hover:text-gray-800 mr-4" onClick={onClose}>Cancel</button>
                                    <button type="submit" className="bg-[#f75990] hover:bg-[#852b4a] text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e482a5]">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            )}
        </>
    );
};

export default UpdateContactModal;
