"use client";

import RecipesList from "@/components/RecipesList";
import { options, tags } from "@/constants";
import { BiFork } from "react-icons/bi";
import { GiCook } from "react-icons/gi";
import { BiSearchAlt2 } from "react-icons/bi";
import { useState } from "react";

type RecipeSearchType = {
  allRecipes: Recipe[];
  kategoria: string | undefined;
  authors: User[] | undefined;
};

const RecipesSearch = ({
  allRecipes,
  kategoria,
  authors,
}: RecipeSearchType) => {
  const [activeCategory, setActiveKategory] = useState("");
  const [activeAuthor, setActiveAuthor] = useState("");
  const [activeRecipes, setActiveRecipes] = useState(allRecipes);

  const handleCategory = (tag: string) => {
    setActiveAuthor("");
    setActiveKategory(tag);
    setActiveRecipes(
      allRecipes.filter((recipe) => recipe.category.includes(tag))
    );
  };
  const handleAuthor = (name: string) => {
    setActiveKategory("");
    setActiveAuthor(name);
    setActiveRecipes(allRecipes.filter((recipe) => recipe.author === name));
  };

  return (
    <main className="flex items-start w-[100vw]  my-[5vh] justify-between ">
      <div className="bg-red-900 border-red-950  w-[10vw] h-[45px] border-t-2"></div>
      <section className="w-1/5 border-2 border-red-950 rounded-b-md rounded-br-md bg-white">
        <h3 className="uppercase text-xl font-semibold bg-red-900 text-white p-2 text-center">
          Filtruj
        </h3>
        <div className="filterBy">
          <h4 className="w-full bg-red-200 p-1 px-4 text-md font-semibold font-bodyFont uppercase tracking-wider">
            Kategorie:
          </h4>
          <ul className="py-2 overflow-hidden">
            {tags.map((tag, index) => {
              return (
                <li
                  className={`ml-4 my-2 cursor-pointer hover:translate-x-4 transition-all capitalize tracking-wider font-medium flex items-center 
                 ${
                   activeCategory === tag &&
                   "bg-red-900 rounded-l-lg text-white py-1 ml-14 hover:translate-x-0 transition-all"
                 }
                  `}
                  key={index}
                  onClick={() => handleCategory(tag)}
                >
                  <BiFork
                    className={`mr-2 rotate-45 text-red-900 text-xl  ${
                      activeCategory === tag && " text-white"
                    }`}
                  />
                  {tag}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="filterBy">
          <h4 className="w-full bg-red-200 p-1 px-4 text-md font-semibold font-bodyFont uppercase tracking-wider">
            Autor:
          </h4>
          {authors && (
            <ul className="py-2">
              {authors.map((author) => {
                return (
                  <li
                    className={`ml-4 my-2 cursor-pointer hover:translate-x-4 transition-all capitalize tracking-wider font-medium flex items-center 
                    ${
                      activeAuthor === author.userName &&
                      "bg-red-900 rounded-l-lg text-white py-1 ml-14 hover:translate-x-0 transition-all"
                    }
                     `}
                    key={author.id}
                    onClick={() => handleAuthor(author.userName)}
                  >
                    <GiCook
                      className={`mr-2 text-red-900 text-xl  ${
                        activeAuthor === author.userName && " text-white"
                      }`}
                    />
                    {author.userName}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
      <section className="w-4/5 border-t-2 border-red-950">
        <h3 className="uppercase text-xl font-semibold bg-red-900 text-white p-2 text-center ">
          Lista przepisów:
        </h3>
        <div className="sort mx-auto w-full flex items-center justify-center mt-10 -mb-5">
          <section className="mr-10">
            <label id="sort" className="mr-3 text-xl font-bold text-red-900">
              Sortuj według:
            </label>
            <select
              name="sort"
              id="sort"
              className="text-lg p-1 px-3 lowercase rounded-md bg-stone-200"
            >
              {options.map((option, index) => {
                return (
                  <option value={option} key={index}>
                    {option}
                  </option>
                );
              })}
            </select>
          </section>
          <section className="flex items-center justify-center">
            <label id="search" className="mr-3 text-xl font-bold text-red-900">
              Szukaj:
            </label>
            <input
              type="text"
              id="search"
              name="search"
              className="bg-stone-200 rounded-md lowercase p-1 px-3 text-lg w-[16vw]"
              placeholder="wpisz nazwę"
            />
            <div className="text-xl text-black -ml-7">
              <BiSearchAlt2 />
            </div>
          </section>
        </div>
        {allRecipes && (
          <div className="px-[5vw]">
            <RecipesList recipes={activeRecipes} />
          </div>
        )}
      </section>
    </main>
  );
};

export default RecipesSearch;
