import { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import { getPersons } from '../services/personService';
import { getRelationships } from '../services/relationshipService';

export default function TreeView() {
    const [treeData, setTreeData] = useState([]);
    const[selectedPersonId, setSelectedPersonId] = useState('')
    const[persons, setPersons] = useState([])
    const[relationships,setRelationships] = useState([])

    useEffect(() => {
        async function fetchTreeData() {
            const personRes = await getPersons();
            const relationshipRes = await getRelationships();

            setPersons(personRes.data);
            setRelationships(relationshipRes.data);
        }
        fetchTreeData();
    },[]);

    useEffect(()=> {
        if(selectedPersonId){
            const formattedTree = buildTree(selectedPersonId)
            setTreeData([formattedTree])
        } else {
            setTreeData([])
        }
    },[selectedPersonId,persons,relationships])

            const getPersonById = (id) => persons.find(p => p._id === id);

            function buildTree(personId) {
                console.log("personId",personId)
                const rootPerson = getPersonById(personId);
                if (!rootPerson) return null;
                
                const spouseRel = relationships.find(
                    rel =>
                        rel.type === 'Spouse' &&
                        (rel.person1?._id === personId || rel.person2?._id === personId)
                );

                const spouseName = spouseRel
                    ? (spouseRel.person1?._id === personId
                        ? spouseRel.person2?.name
                        : spouseRel.person1?.name)
                    : null;

                const rootName = spouseName
                    ? `husband & wife : ${rootPerson.name} & ${spouseName}`
                    : rootPerson.name;

                // Find children
                const childrenRels = relationships.filter(
                    rel => rel.type === 'Child' && rel.person1?._id === personId
                );

                const children = childrenRels
                    .map(rel => buildTree(rel.person2?._id));

                return {
                    name: rootName,
                    children: children.length > 0 ? children : undefined,
                };
            }

    //         // Hardcode root node
    //         const sunil = persons.find(p => p.name.toLowerCase() === 'sunil');
    //         if (!sunil) {
    //             console.log('Sunil not found in person list');
    //             return;
    //         }

    //         const formattedTree = buildTree(sunil._id);
    //         setTreeData([formattedTree]);
    //     }

    

    return (
        <div style={{ width: '100%', height: '500px' }}>
        <div>
            <label>Select Root Person:</label>
            <select
            value={selectedPersonId}
            onChange={(e) => setSelectedPersonId(e.target.value)}
            >
            <option value="">Select</option>
            {persons.map(p => (
                <option key={p._id} value={p._id}>{p.name}</option>
            ))}
            </select>
        </div>
            {treeData.length > 0 && <Tree data={treeData} orientation="vertical" />}
        </div>
    );
}
