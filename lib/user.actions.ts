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
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
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
  toast("Nick został zmieniony!", {
    icon: "✔",
    style: {
      borderRadius: "10px",
      background: "#052814",
      color: "#fff",
    },
  });
};

export const checkPassword = async (password: string, email: string) => {
  const credential = EmailAuthProvider.credential(
    getUser.currentUser!.email!,
    password
  );
  // if (getUser.currentUser?.emailVerified === false) {
  //   sendEmailVerification(getUser.currentUser!)
  //     .then(() => {
  //       // console.log("Verification email sent to the old email!");
  //       toast(
  //         `Poprzedni adres email nie został zweryfikowany! Sprawdź swoją skrzynke pocztową ${getUser.currentUser?.email}.`,
  //         {
  //           icon: "✖",
  //           style: {
  //             borderRadius: "10px",
  //             background: "#052814",
  //             color: "#fff",
  //           },
  //         }
  //       );
  //     })
  //     .catch((error) => {
  //       // console.error("Error sending verification email:", error);
  //     });
  // } else {
  reauthenticateWithCredential(getUser.currentUser!, credential)
    .then(() => {
      // console.log("User re-authenticated successfully");
      // Proceed with updating the email
      updateProfileEmail(email);
    })
    .catch((error) => {
      // console.error("Error re-authenticating:", error);
      toast("Nieprawidłowe hasło!", {
        icon: "✖",
        style: {
          borderRadius: "10px",
          background: "#280505",
          color: "#fff",
        },
      });
    });
};
// };

export const updateProfileEmail = async (newEmail: string) => {
  await updateEmail(getUser.currentUser!, newEmail)
    .then(() => {
      // console.log("Email updated successfully!");
      sendEmailVerification(getUser.currentUser!);
      toast("Adres email został zmieniony!", {
        icon: "✔",
        style: {
          borderRadius: "10px",
          background: "#052814",
          color: "#fff",
        },
      });
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        toast("Ten adres email jest już używany przez innego użytkownika!", {
          icon: "✖",
          style: {
            borderRadius: "10px",
            background: "#280505",
            color: "#fff",
          },
        });
      } else {
        // console.error("Error updating email:", error);
        toast("Coś poszło nie tak!", {
          icon: "✖",
          style: {
            borderRadius: "10px",
            background: "#280505",
            color: "#fff",
          },
        });
      }
    });
  const userRef = doc(db, "usersList", getUser.currentUser!.uid);
  setDoc(
    userRef,
    {
      email: newEmail,
    },
    {
      merge: true,
    }
  );
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
  toast("Avatar został zmieniony!", {
    icon: "✔",
    style: {
      borderRadius: "10px",
      background: "#052814",
      color: "#fff",
    },
  });
};

export const updateUser = async (newName: string, avatar: string) => {
  await updateName(newName);
  await updateAvatar(avatar);
  if (getUser.currentUser!.email) {
    changePassword();
  }
};

export const changePassword = async () => {
  await sendPasswordResetEmail(getUser, getUser.currentUser!.email!)
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

export const postRecipe = async (
  editing: boolean,
  recipeID: string,
  userID: string,
  image: string,
  newTitle: string,
  newShortInfo: string,
  newCategory: string[],
  newPrepTime: number,
  newCookTime: number,
  newPortion: number,
  newIngredients: string[],
  newSteps: string[],
  newDescription: string
) => {
  if (editing) {
    const recipeDoc = doc(db, `usersList/${userID}/recipes`, recipeID);
    const updatedRecipe = {
      image,
      title: newTitle,
      shortInfo: newShortInfo,
      category: newCategory,
      prepTime: newPrepTime,
      cookTime: newCookTime,
      portion: newPortion,
      ingredients: newIngredients,
      steps: newSteps,
      description: newDescription,
    };
    await updateDoc(recipeDoc, updatedRecipe)
      .then(() => {
        toast("Edycja zakończona sukcesem!", {
          icon: "✔",
          style: {
            borderRadius: "10px",
            background: "#052814",
            color: "#fff",
          },
        });
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        toast("Coś poszło nie tak!", {
          icon: "✖",
          style: {
            borderRadius: "10px",
            background: "#280505",
            color: "#fff",
          },
        });
      });
    window.location.href = "/profil";
  } else {
    const setDocRecipeCollectionRef = doc(
      collection(db, `usersList/${userID}/recipes`)
    );
    await setDoc(setDocRecipeCollectionRef, {
      createdTime: new Date().getTime(),
      image,
      title: newTitle,
      shortInfo: newShortInfo,
      category: newCategory,
      prepTime: newPrepTime,
      cookTime: newCookTime,
      portion: newPortion,
      ingredients: newIngredients,
      steps: newSteps,
      description: newDescription,
      likes: 0,
    })
      .then(() => {
        toast("Przepis został dodany!", {
          icon: "✔",
          style: {
            borderRadius: "10px",
            background: "#052814",
            color: "#fff",
          },
        });
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        toast("Coś poszło nie tak!", {
          icon: "✖",
          style: {
            borderRadius: "10px",
            background: "#280505",
            color: "#fff",
          },
        });
      });
  }
};

export const deleteRecipe = async (userID: string, id: string) => {
  const productDoc = doc(db, `usersList/${userID}/recipes`, id);

  await deleteDoc(productDoc);
  toast("Przepis został usunięty!", {
    icon: "✔",
    style: {
      borderRadius: "10px",
      background: "#280505",
      color: "#fff",
    },
  });
};
