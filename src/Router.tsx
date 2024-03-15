import { useRoutes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { AllDevelopers } from "./pages/AllDevelopers";
import { AddNewDeveloper } from "./pages/AddNewDeveloper";
import { ShowSkills } from "./pages/ShowSkills";
import { AddSkill } from "./pages/AddSkill";

export const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "alldevelopers",
          element: <AllDevelopers/>
        },
        {
            path: "addnewdeveloper",
            element: <AddNewDeveloper/>
        },
        {
            path: "showskills",
            element: <ShowSkills/>
        },
        {
            path: "addskill",
            element: <AddSkill/>
        }
      ],
    },
  ]);
  return routes;
};
