import React from 'react'
import PersonList from './pages/PersonList.jsx';
import RelationshipList from './pages/RelationshipList.jsx';
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import AddPersonForm from './pages/AddPersonForm.jsx';
import AddRelationshipForm from './pages/AddRelationshipForm.jsx';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
    <nav>
      <Link to="/">Persons</Link> |
      <Link to="/relationships">Relationships</Link> |
      <Link to="/add-person">Add Person</Link> |
      <Link to="/add-relationship">Add Relationships</Link>
    </nav>

    <Routes>
      <Route path='/' element={<PersonList />} />
      <Route path='/relationships' element={<RelationshipList />} />
      <Route path='/add-person' element={<AddPersonForm />} />
      <Route path='/add-relationship' element={<AddRelationshipForm />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
