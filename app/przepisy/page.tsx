import RecipesList from "@/components/RecipesList";
import { tags } from "@/constants";
import { PiKnifeFill } from "react-icons/pi";

const authors = ["Dorota", "Jarek", "Ania", "Kamil", "Agata", "Justyna"];

const RecipesPage = () => {
  return (
    <div className="page w-screen">
      <header className="text-center w-full py-[10vh] flex justify-center items-center">
        <PiKnifeFill className="text-5xl text-red-900  mr-5 knifeRotate" />
        <h1 className="text-3xl font-bold font-bodyFont">Przepisy Kulinarne</h1>
        <PiKnifeFill className="text-5xl text-red-900 ml-5 knifeRotate2" />
      </header>
      <main className="flex items-start w-4/5 mx-auto my-[5vh] justify-between">
        <section className="w-1/4 border-2 border-red-950 rounded-md bg-white">
          <h3 className="uppercase text-xl font-semibold bg-red-900 text-white p-2 text-center">
            Szukaj
          </h3>
          <div className="filterBy">
            <h4 className="w-full bg-red-200 p-1 px-4 text-lg">Kategorie:</h4>
            <ul className="ml-4 list-disc">
              {tags.map((tag, index) => {
                return (
                  <li
                    className="ml-4 my-2 cursor-pointer hover:translate-x-2 transition"
                    key={index}
                  >
                    {tag}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="filterBy">
            <h4 className="w-full bg-red-200 p-1 px-4 text-lg">Autor:</h4>
            <ul className="ml-4 list-disc">
              {authors.map((author, index) => {
                return (
                  <li
                    className="ml-4 my-2 cursor-pointer hover:translate-x-2 transition"
                    key={index}
                  >
                    {author}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
        <section className="w-2/3 ">
          <h3 className="uppercase text-2xl font-semibold text-center text-red-900">
            Lista przepisów:
          </h3>
          <RecipesList />
        </section>
      </main>
    </div>
  );
};

export default RecipesPage;
