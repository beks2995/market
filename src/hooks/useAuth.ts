import { useState, useEffect } from "react";
import { firebase } from '../firebase/firebase'; 
import {User} from "../types/types";

const useAuth = (): User => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
};

export default useAuth;
