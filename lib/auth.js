import {createContext, useContext, useEffect, useState} from "react";
import cookie from "js-cookie";

import {createUser} from "./db";
import firebase from "./firebase";

const authContext = createContext();

export function AuthProvider({children}) {
  const auth = useProviderAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProviderAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async rawUser => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const {token, ...userWithoutToken} = user;

      createUser(user.uid, userWithoutToken);

      setUser(user);
      cookie.set("invoice-app-auth", true, {expires: 1});

      setLoading(false);
      return user;
    } else {
      setUser(false);
      cookie.remove("invoice-app-auth");

      setLoading(false);
      return false;
    }
  };

  const signinWithGoogle = () => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(response => {
        handleUser(response.user);
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signinWithGoogle,
    signout,
  };
}

const formatUser = async user => {
  const token = await user.getIdToken();
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    photoUrl: user.photoUrl || `image.jpg`,
    token,
  };
};
