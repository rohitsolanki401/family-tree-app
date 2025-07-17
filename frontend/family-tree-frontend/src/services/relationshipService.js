import axios from 'axios';

const API_URL = 'http://localhost:5000/api/relationships';

export const getRelationships = () => axios.get(API_URL);
export const createRelationship = (relationshipData) => axios.post(API_URL,relationshipData);
export const UpdatedRelationship = (id,updateData) => axios.put(`${API_URL}/${id}`,updateData);
export const deleteRelationship = (id) => axios.delete(`${API_URL}/${id}`);


