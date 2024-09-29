"use client";

import { db, auth } from "@/app/firebase/clientApp";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  getAuth,
  sendPasswordResetEmail,
} from "firebase/auth";
import toast from "react-hot-toast";

const getUser = getAuth();

export const login = async (email: string, password: string) => {
  logout();
  await signInWithEmailAndPassword(auth, email, password);
  const getData = doc(db, `usersList/${getUser.currentUser!.uid}`);
  const data2 = await getDoc(getData);
  if (data2.data()) {
    const item = data2.data();
    if (item!.activeAccount === false) {
      logout();
      // alert("Konto zostało usunięte!");
      toast("Konto zostało usunięte!", {
        icon: "✖",
        style: {
          borderRadius: "10px",
          background: "#280505",
          color: "#fff",
        },
      });
    }
  }
  // if (getUser!.currentUser!.displayName === null) {
  //   setModalName(true);
  // }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Błąd podczas wylogowywania", error);
  }
};

export const changePasswordWhenLogin = async (email: string) => {
  await sendPasswordResetEmail(getUser, email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

export const updateName = async (newName: string) => {
  await updateProfile(getUser.currentUser!, {
    displayName: newName,
  });
  // setName(getUser.currentUser!.displayName);
  const userRef = doc(db, "usersList", getUser.currentUser!.uid);
  setDoc(
    userRef,
    {
      userName: newName,
    },
    {
      merge: true,
    }
  );
};

export const updateUser = async (newName: string) => {
  if (getUser.currentUser!.displayName === null) {
    updateName(newName);
    // changePassword();
  }
  // setModalName(false);
};

//   const changePassword = async () => {
//   await sendPasswordResetEmail(getUser, getUser.currentUser.email)
//     .then(() => {
//       // Password reset email sent!
//       // ..
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // ..
//     });
// };
