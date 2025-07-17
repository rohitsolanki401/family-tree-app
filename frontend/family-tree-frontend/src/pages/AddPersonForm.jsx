import { useState } from 'react';
import { createPerson } from '../services/personService';
import { useNavigate } from 'react-router-dom';

function AddPersonForm() {
  const [name, setName] = useState("");
    const [gender, setGender] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const navigate = useNavigate();

  const handleSubmit =  async (event) => {
    event.preventDefault();
    try{
        await createPerson({name,gender,yearOfBirth})
        setName('');
        setGender('');
        setYearOfBirth('');
        alert('Person added')
        navigate('/')
    } catch(err) {
        console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <h2>Add Person</h2>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='name'
          required
        />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
        </select>

        <input value={yearOfBirth} onChange={(e) => setYearOfBirth(e.target.value)} placeholder='year of birth' type='number' required></input>

      <button type="submit" >Add Person</button>
    </form>
  )
}
 
export default AddPersonForm
