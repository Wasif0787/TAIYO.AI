import React, { useState } from 'react';
import { useAppDispatch } from '../store/store';
import { addContact } from '../store/features/contactSlice';

const AddContact = () => {
    const [firstname, setFName] = useState("");
    const [lastname, setLName] = useState("");
    const [phoneNo, setPhoneNo] = useState(0);
    const [status, setStatus] = useState(false);

    const dispatch = useAppDispatch()

    const handleFNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFName(e.target.value);
    };

    const handleLNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLName(e.target.value);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const phoneNumber = parseInt(e.target.value); // Convert input value to a number
        setPhoneNo(phoneNumber);
    }

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "Active") {
            setStatus(true)
        } else {
            setStatus(false)
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addContact({ fname: firstname, lname: lastname, isActive: status, phoneNumber: phoneNo }))
        setFName("")
        setLName("")
        setPhoneNo(0)
        setStatus(false)
    };

    return (
        <div className="border border-gray-300 p-4 rounded-md">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="fname" className="block mb-1">First Name</label>
                    <input type="text" required name='fname' placeholder='First Name' className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value={firstname} onChange={handleFNameChange} />
                </div>
                <div className="mb-4">
                    <label htmlFor="lname" className="block mb-1">Last Name</label>
                    <input required type="text" name='lname' placeholder='Last Name' className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value={lastname} onChange={handleLNameChange} />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block mb-1">Phone No</label>
                    <input required type="number" name='phone' placeholder='Mobile Number' className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value={phoneNo === 0 ? "" : phoneNo} onChange={handlePhoneChange} />
                </div>
                <div className="mb-4">
                    <label htmlFor="status" className="block mb-1">isActive</label>
                    <select required name="status" id="" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value={status ? "Active" : "Not Active"} onChange={handleStatusChange}>
                        <option value="Active">Active</option>
                        <option value="Not Active">Not Active</option>
                    </select>
                </div>
                <div className='mb-4 text-center'>
                    <button className='bg-[#f75990] hover:bg-pink-300 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-[50%]' type="submit">ADD</button>
                </div>
            </form>
        </div>
    );
}

export default AddContact;
