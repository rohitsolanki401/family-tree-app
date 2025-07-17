import { useEffect } from "react";
import { useState } from "react";
import { deleteRelationship, getRelationships } from "../services/relationshipService.js";
import { Link } from "react-router-dom";

export default function RelationshipList() {
    const[relationships,setRelationships] = useState([]);

    useEffect(()=> {
    async function fetchRelationships() {
        try {
            const res= await getRelationships();
            setRelationships(res.data);
        } catch(err) {
            console.error(err);
        }
    }
    fetchRelationships();
    },[])

    const handleDelete = async (id) => {
            if(window.confirm('Are you sure you want to delete this relationship?')) {
                await deleteRelationship(id);
                setRelationships(prev => prev.filter(r => r._id !== id));
                getRelationships()
            }
        }
    

    return (
        <div>
            <h2>Relationships</h2>
            {relationships.map((rel) => {
            return <div key={rel._id}>{rel.person1?.name} - {rel.type} - {rel.person2?.name}
            <Link to={`/edit-relationship/${rel._id}`}>Edit</Link>
            <button onClick={()=>handleDelete(rel._id)}>Delete</button>
            </div>
            })}
        </div>
    )
}