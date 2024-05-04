import React, { useState } from 'react';
import AddContact from '../components/AddContact';
import AllContact from '../components/AllContact';
import "../index.css"

const Contact = () => {
    const [showAddContact, setShowAddContact] = useState(true);

    return (
        <div className='flex flex-col justify-center text-center mt-10'>
            <div className="w-full flex flex-col items-center">
                <div className=" p-2 rounded-md shadow-md mb-2">
                    <button
                        className={`text-xl md:text-2xl font-semibold py-2 px-4 mb-2 md:mb-4 rounded-md focus:outline-none ${showAddContact ? 'bg-[#f75990] text-white' : 'text-gray-800 hover:bg-pink-300'}`}
                        onClick={() => setShowAddContact(true)}
                    >
                        Add Contact
                    </button>
                    <button
                        className={`text-xl md:text-2xl font-semibold py-2 px-4 rounded-md focus:outline-none ${!showAddContact ? 'bg-[#f75990] text-white' : 'text-gray-800 hover:bg-pink-300'}`}
                        onClick={() => setShowAddContact(false)}
                    >
                        View Contacts
                    </button>
                </div>
            </div>
            <div className="flex justify-center items-center w-full">
                <div className="p-5 glass-container">
                    {showAddContact ? <AddContact /> : <AllContact />}
                </div>
            </div>
        </div>
    );
}

export default Contact;
