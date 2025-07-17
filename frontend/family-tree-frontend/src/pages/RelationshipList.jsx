import { useEffect } from "react";
import { useState } from "react";
import { getRelationships } from "../services/relationshipService.js";


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

    return (
        <div>
            <h2>Relationships</h2>
            {relationships.map((rel) => {
             <div key={rel._id}>{rel.person1?.name} - {rel.type} - {rel.person2?.name}</div>
            })}
        </div>
    )
}