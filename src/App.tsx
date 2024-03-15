import { Dispatch, createContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { getSkills } from "./firebase.api";
import { ISkill } from "./types";

interface IDeveloperContext {
  skills: ISkill[];
  setSkills: Dispatch<ISkill[]>;
}
export const DeveloperContext = createContext({} as IDeveloperContext);

function App() {
  const [skills, setSkills] = useState<ISkill[]>([]);

  useEffect(() => {
    getSkills().then(setSkills);
  }, []);

  return (
    <div>
      <DeveloperContext.Provider value={{ skills, setSkills }}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </DeveloperContext.Provider>
    </div>
  );
}

export default App;
