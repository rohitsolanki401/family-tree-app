import express from "express";
import { createPerson,getPersons,updatePerson,deletePerson } from "../controllers/personController.js";


const router = express.Router();

router.post('/',createPerson);
router.get('/',getPersons);
router.put('/',updatePerson);
router.delete('/',deletePerson);

export default router;

