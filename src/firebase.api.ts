import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";
import { IDeveloper, ISkill } from "./types";

export const skillCollection = collection(db, "skills");

export const developerCollection = collection(db, "developers");

export const getSkills = async () => {
    let data = await getDocs(skillCollection);
    return data.docs.map((el) => ({ id: el.id, ...el.data() } as ISkill));
  };
  


  export const getDevelopers = async () => {
    let data = await getDocs(developerCollection);
    return data.docs.map((el) => ({ id: el.id, ...el.data() } as IDeveloper));
  };
  export const getDeveloper = async (id: string) => {
    const docSnap = await getDoc(doc(db, "developers", id));
  
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as IDeveloper;
    } else {
      return {} as IDeveloper;
    }
  };