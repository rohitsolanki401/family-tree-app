import { useEffect, useState } from 'react';
import { getRelationships } from '../services/relationshipService.js';
import { useNavigate, useParams } from 'react-router-dom';
import { UpdatedRelationship } from '../services/relationshipService.js';
import { getPersons } from '../services/personService.js';

function EditRelationshipForm() {
  const [relationship, setRelationship] = useState({person1:'',person2:'',type:''});
  const [persons,setPersons] = useState([])
    const {id} = useParams()
  const navigate = useNavigate();

  useEffect(()=> {
    async function fetchData(){
        const relRes = await getRelationships();
        const foundRel = relRes.data.find(r=>r._id === id);
        if(foundRel) {
            setRelationship({
                person1:foundRel.person1?._id,
                person2:foundRel.person2?._id,
                type:foundRel.type,
            })
        }
        const personRes = await getPersons()
        setPersons(personRes.data)
    }
    fetchData()
  },[id])

  const handleSubmit =  async (event) => {
    event.preventDefault();
    await UpdatedRelationship(id,relationship)
    navigate('/relationships')
  };

  return (
    <form onSubmit={handleSubmit}>
        <h2>Edit Relationship</h2>
        
        <select value={relationship.person1} onChange={(e) => setRelationship({...relationship,person1:e.target.value})}
            required
            >
          {persons.map((p)=> <option key={p._id} value={p._id}>{p.name}</option>)}
        </select>

        <select value={relationship.person2} onChange={(e) => setRelationship({...relationship,person2:e.target.value})}
            required
            >
          {persons.map((p)=> <option key={p._id} value={p._id}>{p.name}</option>)}
        </select>

        <select value={relationship.type} onChange={(e) => setRelationship({...relationship,type:e.target.value})}>
              <option value="" disabled>Select Type</option>
            <option value="Child">Child</option>
            <option value="Spouse">Spouse</option>
        </select>


      <button type="submit" >Update Relationship</button>
    </form>
  )
}
 
export default EditRelationshipForm
