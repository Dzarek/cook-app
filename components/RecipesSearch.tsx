"use client";

import RecipesList from "@/components/RecipesList";
import { options, tags } from "@/constants";
import { BiFork } from "react-icons/bi";
import { GiCook } from "react-icons/gi";
import { BiSearchAlt2 } from "react-icons/bi";
import { useState, useEffect } from "react";

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
  const [activeRecipes, setActiveRecipes] = useState(allRecipes);
  const [activeCategory, setActiveKategory] = useState("wszystkie");
  const [activeAuthor, setActiveAuthor] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (kategoria) {
      handleCategory(kategoria);
    }
  }, []);

  const handleCategory = (tag: string) => {
    setActiveAuthor("");
    if (tag === "wszystkie") {
      setActiveRecipes(allRecipes);
      setActiveKategory("wszystkie");
    } else {
      setActiveKategory(tag);
      setActiveRecipes(
        allRecipes.filter((recipe) => recipe.category.includes(tag))
      );
    }
  };
  const handleAuthor = (name: string) => {
    setActiveKategory("");
    if (name === "wszyscy") {
      setActiveRecipes(allRecipes);
      setActiveAuthor("wszyscy");
    } else {
      setActiveAuthor(name);
      setActiveRecipes(
        allRecipes.filter((recipe) => recipe.author.authorName === name)
      );
    }
  };

  const handleSearchTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setActiveKategory("");
    setActiveAuthor("");
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    if (searchValue === "") {
      setActiveRecipes(allRecipes);
    } else {
      const filteredRecipes = allRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setActiveRecipes(filteredRecipes);
    }
  };

  const handleSort = (option: string) => {
    const sortedRecipes = [...activeRecipes];

    if (option === "najnowsze") {
      setActiveRecipes(
        sortedRecipes.sort((a, b) => b.createdTime - a.createdTime)
      );
    } else if (option === "najstarsze") {
      setActiveRecipes(
        sortedRecipes.sort((a, b) => a.createdTime - b.createdTime)
      );
    } else if (option === "nazwa: a-z") {
      setActiveRecipes(
        sortedRecipes.sort((a, b) => a.title.localeCompare(b.title))
      );
    } else if (option === "nazwa: z-a") {
      setActiveRecipes(
        sortedRecipes.sort((a, b) => b.title.localeCompare(a.title))
      );
    } else if (option === "czas przygotowania: rosnąco") {
      setActiveRecipes(
        sortedRecipes.sort(
          (a, b) => a.prepTime + a.cookTime - (b.prepTime + b.cookTime)
        )
      );
    } else if (option === "czas przygotowania: malejąco") {
      setActiveRecipes(
        sortedRecipes.sort(
          (a, b) => b.prepTime + b.cookTime - (a.prepTime + a.cookTime)
        )
      );
    }
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
            <>
              <li
                className={`ml-4 my-2 cursor-pointer hover:translate-x-4 transition-all capitalize tracking-wider font-medium flex items-center 
                 ${
                   activeCategory === "wszystkie" &&
                   "bg-red-900 rounded-l-lg text-white py-1 ml-16 hover:translate-x-0 transition-all"
                 }
                  `}
                onClick={() => handleCategory("wszystkie")}
              >
                <BiFork
                  className={`mr-2 rotate-45 text-red-900 text-xl  ${
                    activeCategory === "wszystkie" && " text-white"
                  }`}
                />
                wszystkie
              </li>
              {tags.map((tag, index) => {
                return (
                  <li
                    className={`ml-4 my-2 cursor-pointer hover:translate-x-4 transition-all capitalize tracking-wider font-medium flex items-center 
                 ${
                   activeCategory === tag &&
                   "bg-red-900 rounded-l-lg text-white py-1 ml-16 hover:translate-x-0 transition-all"
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
            </>
          </ul>
        </div>
        <div className="filterBy">
          <h4 className="w-full bg-red-200 p-1 px-4 text-md font-semibold font-bodyFont uppercase tracking-wider">
            Autor:
          </h4>
          {authors && (
            <ul className="py-2 overflow-hidden">
              <>
                <li
                  className={`ml-4 my-2 cursor-pointer hover:translate-x-4 transition-all capitalize tracking-wider font-medium flex items-center 
                 ${
                   activeAuthor === "wszyscy" &&
                   "bg-red-900 rounded-l-lg text-white py-1 ml-16 hover:translate-x-0 transition-all"
                 }
                  `}
                  onClick={() => handleAuthor("wszyscy")}
                >
                  <GiCook
                    className={`mr-2 text-red-900 text-xl  ${
                      activeAuthor === "wszyscy" && " text-white"
                    }`}
                  />
                  wszyscy
                </li>
                {authors.map((author) => {
                  return (
                    <li
                      className={`ml-4 my-2 cursor-pointer hover:translate-x-4 transition-all capitalize tracking-wider font-medium flex items-center 
                    ${
                      activeAuthor === author.userName &&
                      "bg-red-900 rounded-l-lg text-white py-1  ml-16  hover:translate-x-0 transition-all"
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
              </>
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
              className="text-lg p-2 px-3 lowercase rounded-md bg-zinc-700 text-white"
              onChange={(e) => handleSort(e.target.value)}
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
              className="bg-zinc-700 text-white rounded-md lowercase p-2 px-3 text-lg w-[16vw]"
              placeholder="wpisz nazwę"
              value={searchTerm}
              onChange={(e) => handleSearchTitle(e)}
            />
            <div className="text-xl text-white -ml-7">
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
