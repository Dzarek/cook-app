import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import AddRecipeComponent from "@/components/AddRecipeComponent";
import { GiNotebook } from "react-icons/gi";

const NewRecipePage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="page flex flex-col items-center justify-center">
        <p className="text-2xl">Odmowa dostępu!</p>
        <Link
          href="/logowanie"
          className="mt-5 p-2 rounded-md bg-red-900 text-white"
        >
          {" "}
          zaloguj się
        </Link>
      </div>
    );
  }

  const userID = session.uid;

  return (
    <div className="page w-screen">
      <header className="text-center w-full py-[10vh] flex justify-center items-center">
        <GiNotebook className="text-4xl text-red-900  mr-5 recipeRotate" />
        <h1 className="text-3xl font-bold font-bodyFont">
          Tworzenie Nowego Przepisu
        </h1>
        <GiNotebook className="text-4xl text-red-900 ml-5 recipeRotate2" />
      </header>
      <AddRecipeComponent userID={userID} />
    </div>
  );
};

export default NewRecipePage;
