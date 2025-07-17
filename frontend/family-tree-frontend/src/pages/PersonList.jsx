import { useEffect } from "react";
import { useState } from "react";
import { deletePerson, getPersons } from "../services/personService.js";
import { Link } from "react-router-dom";

export default function PersonList() {
    const[persons,setPersons] = useState([]);

    useEffect(()=> {
    async function fetchPersons() {
        try {
            const res= await getPersons();
            console.log("Persons Data:", res.data);
            setPersons(res.data);
        } catch(err) {
            console.error(err);
        }
    }
    fetchPersons();
    },[])

    const handleDelete = async (id) => {
        if(window.confirm('Are you sure you want to delete this person?')) {
            await deletePerson(id);
            setPersons(prev => prev.filter(p => p._id !== id)); // remove deleted person
            getPersons()
        }
    }

    return (
        <div>
            <h2>Persons</h2>
            {persons.map((p) => (
             <div key={p._id}>
                {p.name} - {p.gender} - {p.yearOfBirth}
             <Link to={`/edit-person/${p._id}`}>Edit</Link>
             <button onClick={()=> handleDelete(p._id)}>Delete</button>
             </div>
            ))}
        </div>
    )
}