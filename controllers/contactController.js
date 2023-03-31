const asyncHandler = require("express-async-handler");``
const Contact = require("../models/contactModel");
//@desc Get contact
//@route GET /api/contacts
//@acccess private
const getContacts = asyncHandler( async(req,res) =>{
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@acccess private
const getContact = asyncHandler( async(req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contat not found");
    }
    res.status(200).json(contact);
});

//@desc Create New contact
//@route POST /api/contacts
//@acccess private
const createContact = asyncHandler( async(req,res)=>{
   console.log("The request body is:", req.body);
   const {name ,email, phone} = req.body;
   if(!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
   };
   const contact = await Contact.create({
    name,
     email,
     phone,
     user_id: req.user.id
   });
    res.status(201).json(contact);
});
//@desc Update contact
//@route PUT /api/contacts/:id
//@acccess private
const updateContact =asyncHandler( async (req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!= req.user.id){
     res.status(403);
     throw new Error("User does not have permission to update.");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.status(200).json(updatedContact);});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@acccess private
const deleteContact = asyncHandler( async(req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!= req.user.id){
        res.status(403);
        throw new Error("User does not have permission to delete.");
       }
     await Contact.deleteOne({_id: req.params.id})
    res.status(200).json(contact);
});
module.exports ={getContact, getContacts, updateContact, deleteContact,createContact}
  