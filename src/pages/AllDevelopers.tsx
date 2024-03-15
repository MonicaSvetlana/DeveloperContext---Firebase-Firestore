import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import { Button, InputGroup, ListGroup, Table } from "react-bootstrap";
import { IDeveloper } from "../types";
import { db } from "../firebase-config";
import Form from "react-bootstrap/Form";
import { DeveloperContext } from "../App";

export const AllDevelopers = () => {
  const [developer, setDeveloper] = useState<IDeveloper[]>([]);
  const { skills } = useContext(DeveloperContext);
  const [selectValue, setSelectValue] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [salaryValue, setSalaryValue] = useState<string>("");

  useEffect(() => {
    getDevelopers();
  }, []);

  const getDevelopers = async () => {
    let developerData = await getDocs(collection(db, "developers"));
    let data: IDeveloper[] = developerData.docs.map((elm) => {
      return { id: elm.id, ...elm.data() } as IDeveloper;
    });
    setDeveloper(data);
  };

  const deleteDeveloper = async (id: string) => {
    await deleteDoc(doc(db, "developers", id));
    getDevelopers();
  };

  const searchedDeveloper = useMemo(() => {
    let data = developer;

    if (selectValue.length !== 0) {
      data = data.filter((elm) =>
        selectValue.every((el) => elm.skills.includes(el))
      );
    }
    if (inputValue !== "") {
      data = data.filter((elm) =>
        elm.name.toLowerCase().startsWith(inputValue.toLowerCase())
      );
    }
    if (salaryValue !== "") {
      data = data.filter((elm) => elm.salary === Number(salaryValue));
    }

    return data;
  }, [developer, selectValue, salaryValue, inputValue]);

  return (
    <>
      <div className="d-flex flex-column gap-3 m-3">
        <div className="d-flex justify-content-around flex-wrap gap-3">
          {skills.map((elm, i) => {
            return (
              <Form.Group
                key={i}
                className="d-flex justify-content-around gap-3"
                style={{}}
              >
                <Form.Label htmlFor={"selectedValue" + i}>
                  {elm.skill}
                </Form.Label>
                <Form.Check
                  aria-label="Checkbox for Skills"
                  key={i}
                  value={elm.skill}
                  id={"selectedValue" + i}
                  onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                    let val = e.target.value;
                    if (e.target.checked) {
                      setSelectValue([...selectValue, val]);
                    } else {
                      setSelectValue(selectValue.filter((el) => el !== val));
                    }
                  }}
                />
              </Form.Group>
            );
          })}
        </div>
        <InputGroup className="mb-3">
          <Form.Control
            id="search"
            type="search"
            placeholder="Search by name "
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
            id="number"
            type="number"
            placeholder="Search by salary"
            value={salaryValue}
            onChange={(e) => setSalaryValue(e.target.value)}
          />
        </InputGroup>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Skills</th>
            <th>Salary</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {searchedDeveloper && searchedDeveloper.length > 0 ? (
            searchedDeveloper.map((elm) => {
              return (
                <tr key={elm.id}>
                  <td>{elm.name}</td>
                  <td>{elm.surname}</td>
                  <td>{elm.email}</td>
                  <td>
                    {elm.skills &&
                      elm.skills.map((skill, i) => {
                        return (
                          <ListGroup key={i}>
                            <ListGroup.Item>{skill}</ListGroup.Item>
                          </ListGroup>
                        );
                      })}
                  </td>
                  <td>{elm.salary}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deleteDeveloper(elm.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>No developers found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};
