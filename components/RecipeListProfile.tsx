"use client";

import Link from "next/link";
import Image from "next/image";
import { IoEnter } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { deleteRecipe } from "@/lib/user.actions";

type RecipeType = {
  id: string;
  title: string;
  image: string;
  prepTime: number;
  cookTime: number;
  author: {
    authorName: string;
    authorAvatar: string;
  };
  category: string[];
  likes: number;
};

const RecipesListProfile = ({
  recipes,
  userID,
}: {
  recipes: Recipe[];
  userID: string;
}) => {
  const [confirmDelete, setConfirmDelete] = useState<RecipeType | null>(null);
  const [recipesList, setRecipesList] = useState(recipes);

  const handleDelete = (id: string) => {
    const updateProducts = recipesList.filter((item) => item.id !== id);
    deleteRecipe(userID, id);
    setRecipesList(updateProducts);
    setConfirmDelete(null);
  };

  return (
    <div className="mx-auto my-[5vh] flex w-full items-center justify-center flex-wrap">
      {recipesList.map((recipe) => {
        const {
          id,
          title,
          image,
          prepTime,
          cookTime,
          author,
          category,
          likes,
        } = recipe;

        return (
          <div
            key={id}
            className="flex items-strech w-[25vw] justify-between border-2 border-gray-600 shadow-xl rounded-md m-[1.5vw]"
          >
            {confirmDelete && (
              <div className="z-20 rounded-md border-2 border-white flex flex-col fixed w-[40vw] h-[50vh] bg-red-800 text-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4 items-center justify-center">
                <span className="mb-8 w-full text-center text-xl px-4 py-2 bg-white text-black uppercase font-bold">
                  {confirmDelete.title}
                </span>
                <MdDeleteForever className="text-5xl mb-2" />
                <h2 className="text-2xl text-center">
                  Czy napewo chcesz usunąć ten przepis?
                </h2>
                <div className="flex items-center justify-center mt-10">
                  <button
                    onClick={() => setConfirmDelete(null)}
                    className="p-5 bg-white text-red-900 uppercase rounded-md text-2xl mx-4 transition-all border-2 border-white hover:bg-black hover:text-white"
                  >
                    NIE
                  </button>
                  <button
                    onClick={() => handleDelete(confirmDelete.id)}
                    className="p-5 bg-white text-red-900 uppercase rounded-md text-2xl mx-4 transition-all border-2 border-white hover:bg-black hover:text-white"
                  >
                    TAK
                  </button>
                </div>
              </div>
            )}
            <div className="flex flex-col w-[4vw]  bg-neutral-50 items-center  justify-around ">
              <Link href={`/przepisy/${id}`}>
                {" "}
                <IoEnter className="cursor-pointer text-2xl text-cyan-950 transition-all hover:text-blue-700" />
              </Link>
              <Link href="/dodaj">
                {" "}
                <BiEdit className="cursor-pointer text-2xl text-green-900 transition-all hover:text-green-700" />
              </Link>
              <MdDeleteForever
                onClick={() => setConfirmDelete(recipe)}
                className="cursor-pointer text-2xl text-red-900 transition-all hover:text-red-700"
              />
            </div>

            <div className="recipeProfile bg-neutral-50   transition-transform">
              <Image
                src={image}
                width={500}
                height={500}
                className="w-full h-3/5 object-cover recipe-imgProfile"
                alt={title}
              />
              <section className="h-2/6 flex flex-col items-center justify-center p-2 my-2">
                <h5 className="text-base text-center font-bold mb-2 w-full">
                  {title.toUpperCase()}
                </h5>
                <p className="text-gray-600 text-sm mb-2">
                  Przygotowanie:{" "}
                  <strong className="text-red-800">{prepTime} min</strong> |
                  Gotowanie:{" "}
                  <strong className="text-red-800">{cookTime} min</strong>
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  Kategorie:{" "}
                  <strong className="text-red-800 capitalize">
                    {category.length > 1
                      ? category[0] + ", inne..."
                      : category[0]}
                  </strong>{" "}
                  | Autor:{" "}
                  <strong className="text-red-800">{author.authorName}</strong>
                </p>
                <p className="flex justify-center items-center">
                  <FaHeart className="mr-2 text-gray-500" />{" "}
                  <strong className="text-red-800">{likes}</strong>
                </p>
              </section>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecipesListProfile;
