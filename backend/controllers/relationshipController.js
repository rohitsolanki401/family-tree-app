import Relationship from "../models/Relationship.js";

// create a new relationship
export const createRelationship = async(req,res) => {
    try{
        const {person1,person2,type} = req.body;
        const newRelationship = new Relationship({person1,person2,type});
        await newRelationship.save();
        res.status(201).json(newRelationship);
    }  catch(error){
        res.status(500).json({error:error.message});
    }
    };

// get all relationships
export const getRelationships = async(req,res) => {
    try{
        const relationships = await Relationship.find().populate('person1 person2');
        res.json(relationships);
    } catch(error) {
        res.status(500).json({error:error.message});
    }
};

// Update a relationship
export const updateRelationship = async(req,res) => {
    try{
        const {id} = req.params;
        const updatedRelationship = await Relationship.findByIdAndUpdate(id,req.body,{ new: true });
        res.json(updatedRelationship);
    } catch(error) {
                res.status(500).json({error:error.message});
    }
};

// Delete a relationship
export const deleteRelationship = async(req,res) => {
    try{
        const {id} = req.params;
        await Relationship.findByIdAndDelete(id);
        res.json({message:'Relationship deleted successfully'});
    } catch(error) {
                res.status(500).json({error:error.message});
    }
};