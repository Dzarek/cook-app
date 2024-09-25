"use server";

import { db } from "@/app/firebase/clientApp";
import { collection, getDocs } from "firebase/firestore";

export const getAllUsers = async () => {
  const allUsersCollectionRef = collection(db, "usersList");
  try {
    const data = await getDocs(allUsersCollectionRef);
    let items = data.docs
      .filter((doc) => doc.id !== "0")
      .map((doc) => ({ id: doc.id, ...(doc.data() as User) }));

    items = items.filter((el) => el.activeUser === true);
    return items;
  } catch (error) {
    console.log(error);
  }
};

export const getAllRecipes = async () => {
  const allUsersCollectionRef = collection(db, "usersList");
  try {
    const data = await getDocs(allUsersCollectionRef);
    let items = data.docs
      .filter((doc) => doc.id !== "0")
      .map((doc) => ({ id: doc.id, ...(doc.data() as User) }));

    items = items.filter((el) => el.activeUser === true);

    let bigItemsArray: Recipe[] = [];

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

        bigItemsArray.push(...itemsAllUsers);
      })
    );

    return bigItemsArray;
  } catch (error) {
    console.log(error);
    return [];
  }
};
