import { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import { getPersons } from '../services/personService';
import { getRelationships } from '../services/relationshipService';

export default function TreeView() {
    const [treeData, setTreeData] = useState([]);

    useEffect(() => {
        async function fetchTreeData() {
            const personRes = await getPersons();
            const relationshipRes = await getRelationships();

            const persons = personRes.data;
            const relationships = relationshipRes.data;

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

            // Hardcode root node
            const sunil = persons.find(p => p.name.toLowerCase() === 'sunil');
            if (!sunil) {
                console.log('Sunil not found in person list');
                return;
            }

            const formattedTree = buildTree(sunil._id);
            setTreeData([formattedTree]);
        }

        fetchTreeData();
    }, []);

    return (
        <div style={{ width: '100%', height: '500px' }}>
            {treeData.length > 0 && <Tree data={treeData} orientation="vertical" />}
        </div>
    );
}
