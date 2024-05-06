import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit"

export interface Contact {
    id: string,
    fname: string,
    lname: string,
    isActive: boolean,
    phoneNumber: string,
}

interface ContactState {
    contacts: Contact[]
}

const initialState: ContactState = {
    contacts: loadContactsFromLocalStorage()
}

function loadContactsFromLocalStorage(): Contact[] {
    const contactsFromStorage = localStorage.getItem("contacts");
    return contactsFromStorage ? JSON.parse(contactsFromStorage) : [];
}


function saveContactsToLocalStorage(contacts: Contact[]): void {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

export const ContactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        addContact: (state, action: PayloadAction<{ fname: string, lname: string, isActive: boolean, phoneNumber: string }>) => {
            state.contacts.push({
                id: nanoid(),
                fname: action.payload.fname,
                lname: action.payload.lname,
                isActive: action.payload.isActive,
                phoneNumber: action.payload.phoneNumber
            })
            saveContactsToLocalStorage(state.contacts);
        },
        updateContact: (state, action: PayloadAction<{ id: string; fname: string; lname: string; isActive: boolean; phoneNumber: string }>) => {
            const { id, fname, lname, isActive, phoneNumber } = action.payload;
            const contactIndex = state.contacts.findIndex(contact => contact.id === id);
            if (contactIndex !== -1) {
                state.contacts[contactIndex] = { id, fname, lname, isActive, phoneNumber };
                saveContactsToLocalStorage(state.contacts);
            }
        },
        deleteContact: (state, action: PayloadAction<string>) => {
            state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
            saveContactsToLocalStorage(state.contacts);
        }
    }
})

export const { addContact, updateContact, deleteContact } = ContactSlice.actions

export default ContactSlice.reducer