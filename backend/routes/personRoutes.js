import express from "express";
import { createPerson,getPersons,updatePerson,deletePerson } from "../controllers/personController.js";


const router = express.Router();

router.post('/',createPerson);
router.get('/',getPersons);
router.put('/:id',updatePerson);
router.delete('/:id',deletePerson);

export default router;

