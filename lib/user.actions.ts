"use client";

import { auth, db } from "@/firebase/clientApp";
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
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Błąd podczas wylogowywania", error);
  }
};

export const updateName = async (newName: string) => {
  await updateProfile(getUser.currentUser!, {
    displayName: newName,
  });
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
export const updateEmail = async (newEmail: string) => {
  await updateProfile(getUser.currentUser!, {
    email: newEmail,
  });
};

export const updateAvatar = async (avatar: string) => {
  await updateProfile(getUser.currentUser!, {
    photoURL: avatar,
  });
  const userRef = doc(db, "usersList", getUser.currentUser!.uid);
  setDoc(
    userRef,
    {
      avatar: avatar,
    },
    {
      merge: true,
    }
  );
};

export const updateUserProfile = async (
  newName: string,
  newEmail: string,
  avatar: string
) => {
  await updateName(newName);
  await updateEmail(newEmail);
  await updateAvatar(avatar);
};

export const updateUser = async (newName: string, avatar: string) => {
  await updateName(newName);
  await updateAvatar(avatar);
  if (getUser.currentUser!.email) {
    changePassword(getUser.currentUser!.email);
  }
};

export const changePassword = async (email: string) => {
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
