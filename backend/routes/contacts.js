const express = require('express');
const {getContacts,postContact,updateContact,deleteContact}= require('../controllers/contacts')

const router=express.Router();

router.get('/contacts/',getContacts)
router.post('/contacts',postContact)
router.put('/contacts/:id',updateContact)
router.delete('/contacts/:id',deleteContact)

module.exports=router;