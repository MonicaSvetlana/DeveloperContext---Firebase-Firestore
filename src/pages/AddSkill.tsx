import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { ISkill } from "../types";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { Button } from "react-bootstrap";

export const AddSkill = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISkill>();

  const navigate = useNavigate();

  const save = async (data: ISkill) => {
    await addDoc(collection(db, "skills"), data);
    reset();
    navigate(-1);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(save)}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="skill">Add a Skill</Form.Label>
          <Form.Control
            id="skill"
            type="text"
            placeholder="Enter a skill"
            {...register("skill", { required: "Fill the field" })}
          />
          {errors.skill && <Form.Text>{errors.skill.message}</Form.Text>}
        </Form.Group>
        <Button variant="primary" type="submit">
          Add skill
        </Button>
      </Form>
    </>
  );
};
