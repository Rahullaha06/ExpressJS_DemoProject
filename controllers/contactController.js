//@desc Get all contact
//@route GET /api/contact
//@access public

const getContacts = (req, res) => {
    res.status(200).json({message : "Get all contacts"});
};


//@desc Create new contact
//@route POST /api/contact
//@access public

const createContact = (req, res) => {
    res.status(201).json({message : "Create contact"});
};


//@desc Get contact
//@route GET /api/contact/:id
//@access public

const getContact = (req, res) => {
    res.status(202).json({message : `Get contact for ${req.params.id}`});
};


//@desc Update contact
//@route PUT /api/contact/:id
//@access public

const updateContact = (req, res) => {
    res.status(203).json({message : `Update contact for ${req.params.id}`});
}


//@desc Delete contact
//@route DELETE /api/contact/:id
//@access public

const deleteContact = (req, res) => {
    res.status(200).json({message : `Delete contact for ${req.params.id}`});
};

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };