import Person from "../models/Person.js";

// create a new person
export const createPerson = async(req,res) => {
    try{
        const {name,gender,yearOfBirth} = req.body;
        const newPerson = new Person({name,gender,yearOfBirth});
        await newPerson.save();
        res.status(201).json(newPerson);
    }  catch(error){
        res.status(500).json({error:error.message});
    }
    };

// get all persons
export const getPersons = async(req,res) => {
    try{
        const persons = await Person.find();
        res.json(persons);
    } catch(error) {
        res.status(500).json({error:error.message});
    }
};

// Update a person
export const updatePerson = async(req,res) => {
    try{
        const {id} = req.params;
        const updatedPerson = await Person.findByIdAndUpdate(id,req.body,{new:true});
        res.json(updatedPerson);
    } catch(error) {
                res.status(500).json({error:error.message});
    }
};

// Delete a person
export const deletePerson = async(req,res) => {
    try{
        const {id} = req.params;
        const deletedPerson = await Person.findByIdAndDelete(id);
        res.json({message:'Person deleted successfully'});
    } catch(error) {
                res.status(500).json({error:error.message});
    }
};