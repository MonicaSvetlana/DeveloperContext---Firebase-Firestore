export interface IDeveloper {
  id: string;
  name: string;
  surname: string;
  email: string;
  skills: string[];
  salary: number;
}

export interface ISkill {
  id: string;
  skill: string;
}
