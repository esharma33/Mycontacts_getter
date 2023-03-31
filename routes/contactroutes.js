const express = require('express');

const router = express.Router();
const {getContact, getContacts, updateContact, deleteContact,createContact} = require("../controllers/contactController");
const validateToken = require('../middleware/validateToken');
router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
   // res.send("Get all contacts") // for normal request sending message
   //for json
  // res.json({message: "Get all contacts"});
//for json along with status code


// router.route("/").post(createContact);
// if the route is same , we can write different requests on same route
 router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

// router.route("/:id").put(updateContact);

// router.route("/:id").delete(deleteContact);
 


module.exports = router;