import { PiKnifeFill } from "react-icons/pi";
import { getAllUsers, getAllRecipes } from "@/lib/actions";
import RecipesSearch from "@/components/RecipesSearch";
// import moment from "moment/min/moment-with-locales";

const RecipesPage = async ({
  searchParams,
}: {
  searchParams: { kategoria: string };
}) => {
  const authors = await getAllUsers();
  const allRecipes = await getAllRecipes();

  const sortedRecipes = allRecipes.sort(
    (a, b) => b.createdTime - a.createdTime
  );

  // console.log(allRecipes);
  // console.log(moment().valueOf());
  const { kategoria } = searchParams;
  // console.log(kategoria);

  return (
    <div className="page w-screen">
      <header className="text-center w-full py-[10vh] flex justify-center items-center">
        <PiKnifeFill className="text-5xl text-red-900  mr-5 knifeRotate" />
        <h1 className="text-3xl font-bold font-bodyFont">Przepisy Kulinarne</h1>
        <PiKnifeFill className="text-5xl text-red-900 ml-5 knifeRotate2" />
      </header>

      <RecipesSearch
        kategoria={kategoria}
        authors={authors}
        allRecipes={sortedRecipes}
      />
    </div>
  );
};

export default RecipesPage;
