"use client";

import Link from "next/link";
import Image from "next/image";
// import slugify from "slugify";
import { IoEnter } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";

export const recipes = [
  {
    id: 1,
    title: "Placuszki Twarogowe",
    slug: "placuszki-twarogowe",
    image: "/assets/images/recipe1.jpeg",
    prepTime: 10,
    cookTime: 20,
    portion: 4,
    category: ["śniadanie", "fit", "lunch"],
    author: {
      name: "Jarek",
      avatar: "/assets/images/avatars/avatarm1.jpg",
    },
    shortInfo:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam enim, animi et nam, facere alias laudantium voluptatum aperiam, error temporibus ratione reiciendis optio sequi odio officiis explicabo maxime sit!",
    ingredients: [
      "ketchup",
      "3 szklanki mąki",
      "1 szklanka mleka",
      "50g drożdzy",
      "1 łyżeczka soli",
      "1 łyżeczka cukru",
      "4 łyżki oleju",
      "grzyby",
      "szynka drobiowa lub salami",
      "ser żółty",
    ],
    steps: [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
    ],
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel ipsa obcaecati alias quos delectus suscipit ab. Nam voluptas, facere mollitia sapiente nihil rerum ipsum minima, neque aliquam debitis temporibus quis eligendi rem consectetur porro, aliquid voluptates magnam sed omnis? Eligendi fugit porro facere officia aspernatur officiis placeat fuga mollitia maxime?",
  },
  {
    id: 2,
    title: "Placuszki Twarogowe",
    slug: "placuszki-twarogowe",
    image: "/assets/images/recipe1.jpeg",
    prepTime: 10,
    cookTime: 20,
    portion: 4,
    category: ["śniadanie", "fit", "lunch"],
    author: {
      name: "Jarek",
      avatar: "/assets/images/avatars/avatarm2.jpg",
    },
    shortInfo:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam enim, animi et nam, facere alias laudantium voluptatum aperiam, error temporibus ratione reiciendis optio sequi odio officiis explicabo maxime sit!",
    ingredients: [
      "ketchup",
      "3 szklanki mąki",
      "1 szklanka mleka",
      "50g drożdzy",
      "1 łyżeczka soli",
      "1 łyżeczka cukru",
      "4 łyżki oleju",
      "grzyby",
      "szynka drobiowa lub salami",
      "ser żółty",
    ],
    steps: [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
    ],
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel ipsa obcaecati alias quos delectus suscipit ab. Nam voluptas, facere mollitia sapiente nihil rerum ipsum minima, neque aliquam debitis temporibus quis eligendi rem consectetur porro, aliquid voluptates magnam sed omnis? Eligendi fugit porro facere officia aspernatur officiis placeat fuga mollitia maxime?",
  },
  {
    id: 3,
    title: "Placuszki Twarogowe",
    slug: "placuszki-twarogowe",
    image: "/assets/images/recipe1.jpeg",
    prepTime: 10,
    cookTime: 20,
    portion: 4,
    category: ["śniadanie", "fit", "lunch"],
    author: {
      name: "Jarek",
      avatar: "/assets/images/avatars/avatarm5.jpg",
    },
    shortInfo:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam enim, animi et nam, facere alias laudantium voluptatum aperiam, error temporibus ratione reiciendis optio sequi odio officiis explicabo maxime sit!",
    ingredients: [
      "ketchup",
      "3 szklanki mąki",
      "1 szklanka mleka",
      "50g drożdzy",
      "1 łyżeczka soli",
      "1 łyżeczka cukru",
      "4 łyżki oleju",
      "grzyby",
      "szynka drobiowa lub salami",
      "ser żółty",
    ],
    steps: [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
    ],
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel ipsa obcaecati alias quos delectus suscipit ab. Nam voluptas, facere mollitia sapiente nihil rerum ipsum minima, neque aliquam debitis temporibus quis eligendi rem consectetur porro, aliquid voluptates magnam sed omnis? Eligendi fugit porro facere officia aspernatur officiis placeat fuga mollitia maxime?",
  },
  {
    id: 4,
    title: "Placuszki Twarogowe",
    slug: "placuszki-twarogowe",
    image: "/assets/images/recipe1.jpeg",
    prepTime: 10,
    cookTime: 20,
    portion: 4,
    category: ["śniadanie", "fit", "lunch"],
    author: {
      name: "Jarek",
      avatar: "/assets/images/avatars/avatarm6.jpg",
    },
    shortInfo:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam enim, animi et nam, facere alias laudantium voluptatum aperiam, error temporibus ratione reiciendis optio sequi odio officiis explicabo maxime sit!",
    ingredients: [
      "ketchup",
      "3 szklanki mąki",
      "1 szklanka mleka",
      "50g drożdzy",
      "1 łyżeczka soli",
      "1 łyżeczka cukru",
      "4 łyżki oleju",
      "grzyby",
      "szynka drobiowa lub salami",
      "ser żółty",
    ],
    steps: [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
    ],
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel ipsa obcaecati alias quos delectus suscipit ab. Nam voluptas, facere mollitia sapiente nihil rerum ipsum minima, neque aliquam debitis temporibus quis eligendi rem consectetur porro, aliquid voluptates magnam sed omnis? Eligendi fugit porro facere officia aspernatur officiis placeat fuga mollitia maxime?",
  },
];

const RecipesListProfile = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {};

  return (
    <div className="mx-auto my-[5vh] flex w-full items-center justify-center flex-wrap">
      {recipes.map((recipe) => {
        const { id, title, image, prepTime, cookTime, author, category, slug } =
          recipe;
        // const slug = slugify(title, { lower: true });
        return (
          <div
            key={id}
            className="flex items-strech w-[25vw] justify-between border-2 rounded-md m-[1.5vw]"
          >
            {confirmDelete && (
              <div className="z-20 rounded-md border-2 border-white flex flex-col fixed w-[40vw] h-[50vh] bg-red-950 text-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4 items-center justify-center">
                <span className="mb-14 w-full text-center text-xl px-4 py-2 bg-white text-black uppercase font-bold">
                  {title}
                </span>
                <h2 className="text-2xl text-center">
                  Czy napewo chcesz usunąć ten przepis?
                </h2>
                <div className="flex items-center justify-center mt-10">
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="p-5 bg-white text-red-900 uppercase rounded-md text-2xl mx-4 transition-all border-2 border-white hover:bg-black hover:text-white"
                  >
                    NIE
                  </button>
                  <button
                    onClick={handleDelete}
                    className="p-5 bg-white text-red-900 uppercase rounded-md text-2xl mx-4 transition-all border-2 border-white hover:bg-black hover:text-white"
                  >
                    TAK
                  </button>
                </div>
              </div>
            )}
            <div className="flex flex-col w-[4vw]  bg-stone-100 items-center justify-around">
              <Link href={`/przepisy/${slug}`}>
                {" "}
                <IoEnter className="cursor-pointer text-2xl text-cyan-950 transition-all hover:text-blue-700" />
              </Link>
              <Link href="/dodaj">
                {" "}
                <BiEdit className="cursor-pointer text-2xl text-green-900 transition-all hover:text-green-700" />
              </Link>
              <MdDeleteForever
                onClick={() => setConfirmDelete(true)}
                className="cursor-pointer text-2xl text-red-900 transition-all hover:text-red-700"
              />
            </div>

            <div className="recipeProfile bg-stone-100  transition-transform">
              <Image
                src={image}
                width={1000}
                height={1000}
                className="w-full h-4/6 object-cover recipe-imgProfile"
                alt={title}
              />
              <section className="flex flex-col items-center justify-center p-2">
                <h5 className="text-base text-center font-bold mb-2 w-full">
                  {title}
                </h5>
                <p className="text-gray-600 text-sm mb-1">
                  Przygotowanie:{" "}
                  <strong className="text-red-800">{prepTime} min</strong> |
                  Gotowanie:{" "}
                  <strong className="text-red-800">{cookTime} min</strong>
                </p>
                <p className="text-gray-600 text-sm">
                  Tag:{" "}
                  <strong className="text-red-800 capitalize">
                    {category.length > 1
                      ? category[0] + ", inne..."
                      : category[0]}
                  </strong>{" "}
                  | Autor:{" "}
                  <strong className="text-red-800">{author.name}</strong>
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
