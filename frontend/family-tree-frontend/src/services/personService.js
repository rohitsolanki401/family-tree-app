import axios from 'axios';

const API_URL = 'http://localhost:5000/api/persons';

export const getPersons = () => axios.get(API_URL);
export const createPerson = (personData) => axios.post(API_URL,personData);
export const updatedPerson = (id,updateData) => axios.put(`${API_URL}/${id}`,updateData);
export const deletePerson = (id) => axios.delete(`${API_URL}/${id}`);


