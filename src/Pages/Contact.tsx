import React, { useState } from 'react';
import AddContact from '../components/AddContact';
import AllContact from '../components/AllContact';

const Contact = () => {
    const [showAddContact, setShowAddContact] = useState(false);

    return (
        <div className='flex flex-col justify-center text-center mt-10'>
            <div className="w-full flex flex-col items-center">
                <div className=" p-2 rounded-md shadow-md mb-2">
                    <button
                        className={`text-xl md:text-2xl font-semibold py-2 px-4 mb-2 md:mb-4 rounded-md focus:outline-none ${showAddContact ? 'bg-blue-500 text-white' : 'text-gray-800 hover:bg-blue-100'}`}
                        onClick={() => setShowAddContact(true)}
                    >
                        Add Contact
                    </button>
                    <button
                        className={`text-xl md:text-2xl font-semibold py-2 px-4 rounded-md focus:outline-none ${!showAddContact ? 'bg-blue-500 text-white' : 'text-gray-800 hover:bg-blue-100'}`}
                        onClick={() => setShowAddContact(false)}
                    >
                        View Contacts
                    </button>
                </div>
            </div>
            <div className="flex justify-center items-center w-full md:w-[50%]">
                <div className="p-5">
                    {showAddContact ? <AddContact /> : <AllContact />}
                </div>
            </div>
        </div>
    );
}

export default Contact;
