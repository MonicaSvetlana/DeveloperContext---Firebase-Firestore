import { useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import { getSkills } from "../firebase.api";
import { DeveloperContext } from "../App";

export const ShowSkills = () => {
  const { skills, setSkills } = useContext(DeveloperContext);
  const delSkill = async (id: string) => {
    await deleteDoc(doc(db, "skills", id));
    getSkills().then(setSkills);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Skills</th>
            <th>Delete skill</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((elm, i) => {
            return (
              <tr key={i}>
                <td>{elm.skill}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      delSkill(elm.id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
