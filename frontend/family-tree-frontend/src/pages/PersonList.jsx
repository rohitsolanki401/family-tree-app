import { useEffect } from "react";
import { useState } from "react";
import { getPersons } from "../services/personService.js";


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

    return (
        <div>
            <h2>Persons</h2>
            {persons.map((p) => {
             return <div key={p._id}>{p.name} - {p.gender} - {p.yearOfBirth}</div>
            })}
        </div>
    )
}