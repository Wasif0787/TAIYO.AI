import React from 'react';
import { Contact } from '../store/features/contactSlice';

interface DetailContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    contact: Contact;
}

const DetailContactModal: React.FC<DetailContactModalProps> = ({ isOpen, onClose, contact }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex flex-col justify-center items-center">
                    <div className=" flex flex-col w-72 md:w-96 h-full">
                        <div className=" glass-container rounded-lg shadow-lg">
                            <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 bg-[#f75990] text-white">
                                <h3 className="text-lg font-semibold">Contact Details</h3>
                                <button
                                    className="text-white hover:text-gray-300 focus:outline-none"
                                    onClick={onClose}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="px-4  py-6">
                                <p className="text-gray-900 font-semibold ">
                                    <span className="font-bold">First Name:</span> {contact.fname}
                                </p>
                                <p className="text-gray-900 mt-2 font-semibold">
                                    <span className="font-bold">Last Name:</span> {contact.lname}
                                </p>
                                <p className="text-gray-900 mt-2 font-semibold">
                                    <span className="font-bold">Phone No:</span> {contact.phoneNumber}
                                </p>
                                <p className="text-gray-900 mt-2 font-semibold">
                                    <span className="font-bold">Status:</span> {contact.isActive ? "Active" : "Not Active"}
                                </p>
                            </div>
                            <div className="flex justify-end px-4 py-2 border-t border-gray-200">
                                <button
                                    className="px-4 py-2 bg-[#f75990] text-white rounded-md hover:bg-pink-300 focus:outline-none"
                                    onClick={onClose}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DetailContactModal;
