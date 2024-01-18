const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contact
//@route GET /api/contact
//@access private

const getContacts = asyncHandler (async (req, res) => {
    const contact = await Contact.find({user_id: req.user.id});
    res.status(200).json(contact);
});


//@desc Create new contact
//@route POST /api/contact
//@access private

const createContact = asyncHandler (async (req, res) => {
    console.log("The request body is :", req.body);
    const {name, email, phn} = req.body;
    if(!name || !email || !phn) {
        res.status(401);
        throw new Error("All filds are mendatory!");
    }

    const contact = await Contact.create({
        name,
        email,
        phn,
        user_id: req.user.id
    });

    res.status(201).json(contact);
});


//@desc Get contact
//@route GET /api/contact/:id
//@access private

const getContact = asyncHandler (async (req, res) => {
    const contact = await Contact.findById (req.params.id)
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(202).json(contact);
});


//@desc Update contact
//@route PUT /api/contact/:id
//@access private

const updateContact = asyncHandler (async (req, res) => {
    const contact = await Contact.findById (req.params.id)
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error ("User don't have permission to update other's contact")
    }

    const updatedContact = await Contact.findByIdAndUpdate (
        req.params.id,
        req.body,
        { new: true}
    );

    res.status(203).json(updatedContact);
});


//@desc Delete contact
//@route DELETE /api/contact/:id
//@access private

const deleteContact = asyncHandler (async (req, res) => {
    const contact = await Contact.findById (req.params.id)
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error ("User don't have permission to delete other's contact")
    }

    await Contact.deleteOne({
        _id: req.params.id
    });

    res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};