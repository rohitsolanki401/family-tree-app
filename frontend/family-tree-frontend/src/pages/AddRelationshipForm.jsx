import { useState } from 'react';
import { createRelationship } from '../services/relationshipService.js';
import { getPersons } from '../services/personService.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddRelationshipForm() {
  const [persons, setPersons] = useState([]);
    const [person1, setPerson1] = useState("");
    const [person2, setPerson2] = useState("");
  const [type, setType] = useState('');
  const navigate = useNavigate()

  useEffect(()=>{
   async function fetchPersons() {
    const res = await getPersons();
    setPersons(res.data);
   }
   fetchPersons();
  },[])

  const handleSubmit =  async (event) => {
    event.preventDefault();
    try{
        await createRelationship({person1,person2,type})
        alert('Relationship added')
        navigate('/relationships')
    } catch(err) {
        console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <h2>Add Relationship</h2>
         <select value={person1} onChange={(e) => setPerson1(e.target.value)} required>
            <option value="">Select Person 1</option>
           {persons.map((p)=> (
            <option key={p._id} value={p._id}>{p.name}</option>
           ))}
        </select>
        <select value={person2} onChange={(e) => setPerson2(e.target.value)} required>
            <option value="">Select Person 2</option>
           {persons.map((p)=> (
            <option key={p._id} value={p._id}>{p.name}</option>
           ))}
        </select>

        <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="" disabled>Select Type</option>
            <option value="Child">Child</option>
            <option value="Spouse">Spouse</option>
            </select>

      <button type="submit" >Add Relationship</button>
    </form>
  )
}
 
export default AddRelationshipForm
