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
    const unsubscribeAuth = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        setUser({
          uid: fbUser.uid,
          displayName: fbUser.displayName,
          email: fbUser.email,
          photoURL: fbUser.photoURL,
        });
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
