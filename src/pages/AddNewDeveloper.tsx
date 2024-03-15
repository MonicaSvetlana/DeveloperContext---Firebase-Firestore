import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { IDeveloper } from "../types";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { DeveloperContext } from "../App";

export const AddNewDeveloper = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IDeveloper>();

  const navigate = useNavigate();
  const { skills } = useContext(DeveloperContext);

  const save = async (data: IDeveloper) => {
    data.salary = parseFloat(data.salary.toString());
    await addDoc(collection(db, "developers"), data);
    reset();
    navigate(-1);
  };
  return (
    <>
      <Form onSubmit={handleSubmit(save)}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            id="name"
            type="text"
            placeholder="Enter your name here."
            {...register("name", { required: "Fill the field" })}
          />
          {errors.name && <Form.Text>{errors.name.message}</Form.Text>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="surname">Surname</Form.Label>
          <Form.Control
            id="surname"
            type="text"
            placeholder="Enter your name here."
            {...register("surname", { required: "Fill the field" })}
          />
          {errors.surname && <Form.Text>{errors.surname.message}</Form.Text>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email address</Form.Label>
          <Form.Control
            id="email"
            type="email"
            placeholder="name@example.com"
            {...register("email", {
              required: "Fill the field",
            })}
          />
          {errors.email && <Form.Text>{errors.email.message}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="skills">Skills</Form.Label>
          <Form.Select
            id="skills"
            {...register("skills", { required: "Fill the field" })}
            multiple
          >
            {skills.map((elm) => {
              return <option key={elm.id}>{elm.skill}</option>;
            })}
          </Form.Select>
          {errors.skills && <Form.Text>{errors.skills.message}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="salary">Salary</Form.Label>
          <Form.Control
            id="salary"
            type="text"
            placeholder="Enter your salary here."
            {...register("salary", {
              required: "Fill the field",
              pattern: {
                value: /\d+/,
                message: "Please enter a numeric value.",
              },
            })}
          />
          {errors.salary && <Form.Text>{errors.salary.message}</Form.Text>}
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Developer
        </Button>
      </Form>
    </>
  );
};
