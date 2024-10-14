"use client";

import { db, auth } from "@/firebase/clientApp";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";

const getUser = getAuth();

export const createNewUser = async (
  email: string,
  password: string,
  newName: string
) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      toast("Utworzono nowego kucharza!", {
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
  const userRef = doc(db, "usersList", getUser.currentUser!.uid);
  await setDoc(
    userRef,
    {
      userName: newName,
      activeUser: true,
      email: email,
      avatar: "/assets/images/avatars/avatar0.webp",
    },
    {
      merge: true,
    }
  );
};

export const disableUser = async (userID: string) => {
  const userRef = doc(db, "usersList", userID);
  await setDoc(
    userRef,
    {
      activeUser: false,
    },
    {
      merge: true,
    }
  );
  toast("Kucharz został usunięty!", {
    style: {
      borderRadius: "10px",
      background: "#280505",
      color: "#fff",
    },
  });
};

export const getBackup = async () => {
  const allUsersCollectionRef = collection(db, "usersList");
  try {
    const data = await getDocs(allUsersCollectionRef);
    let items = data.docs
      .filter((doc) => doc.id !== "0")
      .map((doc) => ({ ID: doc.id, ...(doc.data() as User) }));

    items = items.filter((el) => el.activeUser === true);
    let backupArray: any[] = [];
    await Promise.all(
      items.map(async (el) => {
        const allUsersCollectionData = collection(
          db,
          `usersList/${el.id}/recipes`
        );
        const data = await getDocs(allUsersCollectionData);
        const itemsAllUsers = data.docs.map((doc) => {
          const recipeData = doc.data();
          const recipe: Recipe = {
            id: doc.id,
            createdTime: recipeData.createdTime,
            author: {
              authorName: el.userName,
              authorAvatar: el.avatar,
              authorID: el.id,
            },
            title: recipeData.title,
            slug: recipeData.slug,
            image: recipeData.image,
            prepTime: recipeData.prepTime,
            cookTime: recipeData.cookTime,
            portion: recipeData.portion,
            category: recipeData.category,
            shortInfo: recipeData.shortInfo,
            ingredients: recipeData.ingredients,
            steps: recipeData.steps,
            description: recipeData.description || "",
            likes: recipeData.likes,
          };

          return recipe;
        });
        const itemsArray: any[] = [];
        itemsAllUsers.map((item) => {
          itemsArray.push(item);
        });
        backupArray.push({
          id: el.id,
          name: el.userName,
          itemsArray,
        });
      })
    );

    return backupArray;
  } catch (error) {
    console.log(error);
    return [];
  }
};
