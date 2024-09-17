import { recipes } from "@/components/RecipesList";
import Image from "next/image";
import { BsClockHistory } from "react-icons/bs";
import { GiRiceCooker } from "react-icons/gi";
import { BsPeople } from "react-icons/bs";
import { FaSpoon } from "react-icons/fa6";
import { BiFork } from "react-icons/bi";

const OneRecipePage = ({ params: { slug } }: { params: { slug: string } }) => {
  const oneRecipe = recipes.find((recipe) => recipe.slug === slug);
  if (oneRecipe) {
    const {
      title,
      image,
      prepTime,
      cookTime,
      category,
      author,
      description,
      steps,
      ingredients,
      shortInfo,
      portion,
    } = oneRecipe;
    return (
      <div className="page w-screen">
        <header className="text-center w-full py-[10vh] flex justify-center items-center">
          <FaSpoon className="text-3xl text-red-900  mr-5 spoonRotate" />
          <h1 className="text-3xl font-bold font-bodyFont">{title}</h1>
          <BiFork className="text-4xl text-red-900 ml-5 forkRotate" />
        </header>
        <main className="w-4/5 mx-auto flex justify-between items-center">
          <Image
            src={image}
            width={1000}
            height={1000}
            alt={title}
            className="w-2/5 h-[50vh] object-fill rounded-md"
          />
          <section className="w-[55%]">
            <p className="text-lg font-bodyFont mb-10">{shortInfo}</p>
            <div className="w-4/5 mx-auto flex justify-between items-center">
              <div className="flex flex-col items-center justify-center">
                <BsClockHistory className="text-5xl text-red-900" />
                <p className="uppercase font-semibold text-lg  mt-5 text-gray-800">
                  przygotowanie
                </p>
                <span className="text-gray-500 font-bold text-lg">
                  {prepTime} min.
                </span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <GiRiceCooker className="text-5xl text-red-900" />
                <p className="uppercase font-semibold text-lg  mt-5 text-gray-800">
                  gotowanie
                </p>
                <span className="text-gray-500 font-bold text-lg">
                  {cookTime} min.
                </span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <BsPeople className="text-5xl text-red-900" />
                <p className="uppercase font-semibold text-lg  mt-5 text-gray-800">
                  ilość porcji
                </p>
                <span className="text-gray-500 font-bold text-lg">
                  {portion} szt.
                </span>
              </div>
            </div>
            <div className="flex items-center justify-start mt-14">
              <h4 className="font-semibold uppercase text-xl mr-3">
                Kategorie:
              </h4>
              {category.map((item, index) => {
                return (
                  <span
                    key={index}
                    className="bg-red-900 px-2 py-1 text-white rounded-md mx-2 font-semibold"
                  >
                    {item}
                  </span>
                );
              })}
            </div>
          </section>
        </main>
        <div className="w-4/5 flex justify-between items-start mx-auto my-[10vh]">
          <section className="w-1/4 flex flex-col">
            <h2 className="text-2xl font-medium font-bodyFont mb-5 w-full bg-red-900 text-white rounded-md px-2 py-1">
              Składniki:
            </h2>
            <ul>
              {ingredients.map((item, index) => {
                return (
                  <li
                    className="text-lg font-bodyFont mb-4 border-b-2 pb-2"
                    key={index}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </section>
          <section className="ml-[10vw] flex-grow flex flex-col">
            <h2 className="text-2xl font-medium font-bodyFont mb-5 w-full bg-red-900 text-white rounded-md px-2 py-1">
              Instrukcje:
            </h2>
            <ul>
              {steps.map((item, index) => {
                return (
                  <div key={index} className="flex flex-col w-full mb-6">
                    <div className="flex flex-nowrap items-center justify-between mb-2">
                      <p className="uppercase text-red-900 text-2xl font-semibold font-headingFont mr-4">
                        krok {index + 1}
                      </p>
                      <span className="flex-grow h-[2px] bg-zinc-300"></span>
                    </div>
                    <p className="text-lg font-bodyFont">{item}</p>
                  </div>
                );
              })}
            </ul>
          </section>
        </div>
        {description && (
          <div className="w-4/5 flex justify-start items-start mx-auto my-[10vh] flex-col">
            <h2 className="text-2xl font-medium font-bodyFont mb-5 w-full bg-red-900 text-white rounded-md px-2 py-1">
              Opis:
            </h2>
            <p className="text-lg font-bodyFont text-justify">{description}</p>
          </div>
        )}
        <div className="w-full mx-auto flex items-center justify-center mt-20 mb-14">
          <h4 className="font-semibold uppercase text-2xl mr-4 text-zinc-400">
            Autor:
          </h4>
          <Image
            src={author.avatar}
            width={100}
            height={100}
            alt="avatar"
            className="rounded-full w-14 h-14 object-fill"
          />
          <span className="px-2 py-1 text-xl text-red-900 rounded-md font-semibold font-bodyFont">
            {author.name}
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="page w-screen">
        <header className="text-center w-full py-[10vh] flex justify-center items-center">
          <h1 className="text-3xl font-bold font-bodyFont">
            Nie znaleziono przepisu
          </h1>
        </header>
      </div>
    );
  }
};

export default OneRecipePage;
