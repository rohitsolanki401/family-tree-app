import {  useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import { getPersons } from '../services/personService';
import { getRelationships } from '../services/relationshipService';

export default function TreeView() {
    const[treeData,setTreeData] = useState([])

    useEffect(()=> {
        async function fetchTreeData() {
            const personRes = await getPersons();
            const relationshipRes = await getRelationships();

const rootPerson = personRes.data.find(person =>
  relationshipRes.data.some(rel => rel.person1?._id === person._id && rel.type === 'Child')
);
if (!rootPerson) {
  console.log("No root person with child relationships found.");
  return;
}
            const formattedData = {
                name:rootPerson.name,
                children:[
                    ...relationshipRes.data
                .filter(rel => rel.person1?._id === rootPerson._id && rel.type === 'Child')
                .map(rel => ({ name:rel.person2?.name,
                    })),
                ]
            };
            console.log('formattedData:', formattedData);
              setTreeData([formattedData])
            }
        
            fetchTreeData()
        },[])

        return (
            <div style={{ width: '100%', height: '500px' }}>
                {treeData.length > 0 && <Tree data={treeData} orientation='vertical'/>}
            </div>
        )

    }