import RecipesList from "@/components/RecipesList";
import { tags } from "@/constants";
import { PiKnifeFill } from "react-icons/pi";
import { BiFork } from "react-icons/bi";
import { GiCook } from "react-icons/gi";
import { BiSearchAlt2 } from "react-icons/bi";

const authors = ["Dorota", "Jarek", "Ania", "Kamil", "Agata", "Justyna"];

const options = [
  "Najnowsze",
  "Najstarsze",
  "Nazwa: A-Z",
  "Nazwa: Z-A",
  "Czas przygotowania: rosnąco",
  "Czas przygotowania: malejąco",
];

const RecipesPage = () => {
  return (
    <div className="page w-screen">
      <header className="text-center w-full py-[10vh] flex justify-center items-center">
        <PiKnifeFill className="text-5xl text-red-900  mr-5 knifeRotate" />
        <h1 className="text-3xl font-bold font-bodyFont">Przepisy Kulinarne</h1>
        <PiKnifeFill className="text-5xl text-red-900 ml-5 knifeRotate2" />
      </header>
      <main className="flex items-start w-[100vw]  my-[5vh] justify-between ">
        <div className="bg-red-900 border-red-950  w-[10vw] h-[45px] border-t-2"></div>
        <section className="w-1/5 border-2 border-red-950 rounded-b-md rounded-br-md bg-white">
          <h3 className="uppercase text-xl font-semibold bg-red-900 text-white p-2 text-center">
            Szukaj
          </h3>
          <div className="filterBy">
            <h4 className="w-full bg-red-200 p-1 px-4 text-md font-semibold font-bodyFont uppercase tracking-wider">
              Kategorie:
            </h4>
            <ul className="py-2">
              {tags.map((tag, index) => {
                return (
                  <li
                    className="ml-4 my-2 cursor-pointer hover:translate-x-4 transition capitalize tracking-wider font-medium flex items-center"
                    key={index}
                  >
                    <BiFork className="mr-2 rotate-45 text-red-900 text-xl" />
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
            <ul className="py-2">
              {authors.map((author, index) => {
                return (
                  <li
                    className="ml-4 my-2 cursor-pointer hover:translate-x-4 transition capitalize tracking-wider font-medium flex items-center"
                    key={index}
                  >
                    <GiCook className="mr-2  text-red-900 text-xl" />
                    {author}
                  </li>
                );
              })}
            </ul>
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
              <label
                id="search"
                className="mr-3 text-xl font-bold text-red-900"
              >
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

          <div className="px-[5vw]">
            <RecipesList />
          </div>
        </section>
      </main>
    </div>
  );
};

export default RecipesPage;
