import React, { useState } from 'react';
import { useAppDispatch } from '../store/store';
import { addContact } from '../store/features/contactSlice';

const AddContact = () => {
    const [firstname, setFName] = useState("");
    const [lastname, setLName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [status, setStatus] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showNoFormatErrorMessage, setShowNoFormatErrorMessage] = useState(false)

    const dispatch = useAppDispatch()

    const handleFNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFName(e.target.value);
    };

    const handleLNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLName(e.target.value);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNo(e.target.value.toString());
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
        console.log(phoneNo);
        if (phoneNo.length !== 10) {
            setShowNoFormatErrorMessage(true)
            setTimeout(() => {
                setShowNoFormatErrorMessage(false)
            }, 3000);
            return
        }
        dispatch(addContact({ fname: firstname, lname: lastname, isActive: status, phoneNumber: phoneNo.toString() }))
        setFName("")
        setLName("")
        setPhoneNo("")
        setStatus(false)
        setShowSuccessMessage(true)
        setTimeout(() => {
            setShowSuccessMessage(false)
        }, 3000);
    };

    return (
        <div className="border border-gray-300 p-8  rounded-md glass-container h-full pb-5">
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
                    <input required minLength={10} type="number" name='phone' placeholder='9999900000' className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value={phoneNo} onChange={handlePhoneChange} />
                    {/* <PhoneInput country={"in"} inputProps={{ required: true }} autocompleteSearch enableSearch placeholder='+91 99999 99999' value={phoneNo} onChange={handlePhoneChange} /> */}
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
                <div className='h-2'>
                    {showSuccessMessage && (
                        <div className='text-green-400 font-bold text-center h-2 '>
                            <h3 className='pb-3'>Contact Added Successfuly</h3>
                        </div>
                    )}
                    {
                        showNoFormatErrorMessage && (
                            <div className='text-red-400 font-bold text-center h-2 '>
                                <h3 className='pb-3'>Invalid Phone Number</h3>
                            </div>
                        )
                    }
                </div>
            </form>
        </div>
    );
}

export default AddContact;
