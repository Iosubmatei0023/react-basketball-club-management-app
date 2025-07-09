import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db, googleProvider } from '../config/firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signOut,
  signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const docRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUser({ ...firebaseUser, ...docSnap.data() });
          } else {
            setUser({ ...firebaseUser, role: 'member' });
          }
        } catch (err) {
          setUser({ ...firebaseUser, role: 'member' });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Get user data from Firestore
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (!userData.joinDate) {
          const joinDate = new Date().toISOString();
          await setDoc(docRef, { ...userData, joinDate }, { merge: true });
          setUser({ ...user, ...userData, joinDate });
        } else {
          setUser({ ...user, ...userData });
        }
      } else {
        // Create new user document if it doesn't exist
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          created: new Date().toISOString(),
          role: 'member'
        });
        setUser({ ...user, role: 'member' });
      }
      return user;
    } catch (error) {
      throw error;
    }
  };

  const register = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update user profile
      await updateProfile(user, {
        displayName: name
      });
      
      // Create user document in Firestore
      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, {
        displayName: name,
        email: email,
        birthDate: "",
        hometown: "",
        attendedEvents: [],
        scheduledEvents: [],
        membershipStatus: { planName: "", period: "" },
        joinDate: new Date().toISOString(),
        created: new Date().toISOString(),
        role: 'member',
        newsletterJoined: false
      });
      
      setUser({ ...user, displayName: name, email, role: 'member', joinDate: new Date().toISOString() });
      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
    return <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
