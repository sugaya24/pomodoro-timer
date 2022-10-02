import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { auth } from "../lib/firebase";

type User = {
  uid: string | null | undefined;
  displayName: string | null | undefined;
  email: string | null | undefined;
  photoURL: string | null | undefined;
};

type TUserContext = {
  user?: User | null;
  firebaseUser: FirebaseUser | null;
  logout: () => void;
  isLoading: boolean;
};

const UserContext = createContext({} as TUserContext);

export const AuthProvider: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>();
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);

  const logout = () => {
    auth.signOut();
    console.log("logged out");
  };

  useEffect(() => {
    const userFetch = async (fbUser: FirebaseUser) => {
      const res = await fetch(`/api/users/${fbUser.uid}`);
      const data = await res.json();
      return data;
    };
    const registerUser = async (fbUser: FirebaseUser) => {
      const res = await fetch(`/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: fbUser.uid,
          displayName: fbUser.displayName,
          email: fbUser.email,
          photoURL: fbUser.photoURL,
        }),
      });
      return await res.json();
    };

    const unsubscribeAuth = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const data = await userFetch(fbUser);
        if (data.user) {
          setUser({
            uid: data.user.uid,
            displayName: data.user.displayName,
            email: data.user.email,
            photoURL: data.user.photoURL,
          });
        } else {
          const data = await registerUser(fbUser);
          setUser({
            uid: data.newUser.uid,
            displayName: data.newUser.displayName,
            email: data.newUser.email,
            photoURL: data.newUser.photoURL,
          });
        }
      } else {
        setUser(null);
      }

      setFirebaseUser(fbUser);
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        firebaseUser,
        logout,
        isLoading: user === undefined,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
