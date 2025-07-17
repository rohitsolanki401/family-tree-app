import express from "express";
import { createRelationship,getRelationships,updateRelationship,deleteRelationship } from "../controllers/relationshipController.js";


const router = express.Router();

router.post('/',createRelationship);
router.get('/',getRelationships);
router.put('/',updateRelationship);
router.delete('/',deleteRelationship);

export default router;

