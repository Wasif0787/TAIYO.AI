import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit"

export interface Contact {
    id: string,
    fname: string,
    lname: string,
    isActive: boolean
}

interface ContactState {
    contacts: Contact[]
}

const initialState: ContactState = {
    contacts: []
}

export const ContactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        addContact: (state, action: PayloadAction<{ fname: string, lname: string, isActive: boolean }>) => {
            state.contacts.push({
                id: nanoid(),
                fname: action.payload.fname,
                lname: action.payload.lname,
                isActive: action.payload.isActive
            })
        },
        updateContact: (state, action: PayloadAction<{ id: string; fname: string; lname: string; isActive: boolean }>) => {
            const { id, fname, lname, isActive } = action.payload;
            const contactIndex = state.contacts.findIndex(contact => contact.id === id);
            if (contactIndex !== -1) {
                state.contacts[contactIndex] = { id, fname, lname, isActive };
            }
        },
        deleteContact: (state, action: PayloadAction<string>) => {
            state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
        }
    }
})

export const { addContact, updateContact, deleteContact } = ContactSlice.actions

export default ContactSlice.reducer