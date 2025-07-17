import { useEffect, useState } from 'react';
import { createPerson, getPersons } from '../services/personService';
import { useNavigate, useParams } from 'react-router-dom';
import { updatedPerson } from '../services/personService.js';

function EditPersonForm() {
  const [person, setPerson] = useState({name:'',gender:'',yearOfBirth:''});
    const {id} = useParams()
  const navigate = useNavigate();

  useEffect(()=> {
    async function fetchPerson(){
        const res = await getPersons();
        const found = res.data.find(p=>p._id === id);
        if(found) {
            setPerson(found)
        }
    }
    fetchPerson()
  },[id])

  const handleSubmit =  async (event) => {
    event.preventDefault();
    await updatedPerson(id,person)
    navigate('/')
  };

  return (
    <form onSubmit={handleSubmit}>
        <h2>Edit Person</h2>
        <input 
          type="text" 
          value={person.name}
          onChange={(e) => setPerson({...person,name:e.target.value})}
          placeholder='name'
          required
        />
        <select value={person.gender} onChange={(e) => setPerson({...person,gender:e.target.value})}>
              <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
        </select>

        <input value={person.yearOfBirth} onChange={(e) => setPerson({...person,yearOfBirth:e.target.value})} placeholder='year of birth' type='number' required></input>

      <button type="submit" >Edit Person</button>
    </form>
  )
}
 
export default EditPersonForm
