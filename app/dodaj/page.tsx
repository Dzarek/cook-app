"use client";

import { tags } from "@/constants";
import Image from "next/image";
import { useState } from "react";
import { GiNotebook } from "react-icons/gi";
import { RiImageAddLine } from "react-icons/ri";
import { BsClockHistory } from "react-icons/bs";
import { GiRiceCooker } from "react-icons/gi";
import { BsPeople } from "react-icons/bs";

const NewRecipePage = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newShortInfo, setNewShortInfo] = useState("");
  const [newCategory, setNewCategory] = useState([]);
  const [newPrepTime, setNewPrepTime] = useState(0);
  const [newCookTime, setNewCookTime] = useState(0);
  const [newPortion, setNewPortion] = useState(0);

  const submitForm = () => {};

  return (
    <div className="page w-screen">
      <header className="text-center w-full py-[10vh] flex justify-center items-center">
        <GiNotebook className="text-4xl text-red-900  mr-5 recipeRotate" />
        <h1 className="text-3xl font-bold font-bodyFont">
          Tworzenie Nowego Przepisu
        </h1>
        <GiNotebook className="text-4xl text-red-900 ml-5 recipeRotate2" />
      </header>
      <form onSubmit={submitForm} className="flex flex-col w-4/5 mx-auto">
        <section className="flex justify-between w-full">
          <button className="flex flex-col items-center justify-center w-2/5 h-[50vh] border-red-900 border-dashed border-2 rounded-md">
            <RiImageAddLine className="text-6xl text-zinc-400" />
            <p className="mt-5 text-xl">dodaj zdjęcie</p>
          </button>
          <div className="w-[55%] flex flex-col">
            <div className="w-full flex justify-center items-center">
              <label
                className="font-semibold uppercase text-xl mr-3"
                htmlFor="title"
              >
                Tytuł:
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="newRecipeInput font-bold"
              />
            </div>
            <div className="w-full flex justify-center items-center">
              <label
                className="font-semibold uppercase text-xl mr-3"
                htmlFor="shortInfo"
              >
                Krótki opis:
              </label>
              <textarea
                name="shortInfo"
                id="shortInfo"
                required
                value={newShortInfo}
                onChange={(e) => setNewShortInfo(e.target.value)}
                className="newRecipeInput mt-10 min-h-[20vh]"
              ></textarea>
            </div>
            <div className="w-full flex justify-center items-center mt-10">
              <label
                className="font-semibold uppercase text-xl mr-3"
                htmlFor="category"
              >
                Kategorie:
              </label>
              <ul className="flex-grow flex items-center justify-center flex-wrap">
                {tags.map((tag, index) => {
                  return (
                    <li
                      key={index}
                      className="border-red-900 bg-[#fbf3f3] border-2 p-2 m-2 rounded-md cursor-pointer hover:bg-red-900 hover:text-white transition-all"
                    >
                      {tag}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
        <section className="w-2/3 mx-auto flex items-center justify-between my-[8vh]">
          <div className="flex flex-col items-center justify-center">
            <label
              htmlFor="prepTime"
              className="uppercase font-semibold text-lg  mt-5 text-gray-800"
            >
              przygotowanie
            </label>
            <div className="flex items-center mt-4">
              <BsClockHistory className="text-4xl text-red-900" />
              <input
                type="number"
                name="prepTime"
                id="prepTime"
                className="newRecipeInput w-20 mx-3"
                required
                value={newPrepTime}
                onChange={(e) => setNewPrepTime(Number(e.target.value))}
              />
              <p>min.</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <label
              htmlFor="cookTime"
              className="uppercase font-semibold text-lg  mt-5 text-gray-800"
            >
              gotowanie
            </label>
            <div className="flex items-center mt-4">
              <GiRiceCooker className="text-4xl text-red-900" />
              <input
                type="number"
                name="cookTime"
                id="cookTime"
                className="newRecipeInput w-20 mx-3"
                required
                value={newCookTime}
                onChange={(e) => setNewCookTime(Number(e.target.value))}
              />
              <p>min.</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <label
              htmlFor="portion"
              className="uppercase font-semibold text-lg  mt-5 text-gray-800"
            >
              ilość porcji
            </label>
            <div className="flex items-center mt-4">
              <BsPeople className="text-4xl text-red-900" />
              <input
                type="number"
                name="portion"
                id="portion"
                className="newRecipeInput w-20 mx-3"
                required
                value={newPortion}
                onChange={(e) => setNewPortion(Number(e.target.value))}
              />
              <p>szt.</p>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default NewRecipePage;
