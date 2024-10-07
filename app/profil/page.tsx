import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import ProfilComponent from "@/components/ProfilComponent";
import { GiChefToque } from "react-icons/gi";
import { getRecipes } from "@/lib/actions";

const Profil = async () => {
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

  const currentUser = session.user;
  const userRecipes = await getRecipes(session.uid);

  return (
    <div className="page w-screen">
      <header className="text-center w-full py-[10vh] flex justify-center items-center">
        <GiChefToque className="text-5xl text-red-900  mr-5 recipeRotate4" />
        <h1 className="text-3xl font-bold font-bodyFont">
          Kucharz - {currentUser.name}
        </h1>
        <GiChefToque className="text-5xl text-red-900 ml-5 recipeRotate2" />
      </header>
      {currentUser && userRecipes && (
        <ProfilComponent currentUser={currentUser} userRecipes={userRecipes} />
      )}
    </div>
  );
};

export default Profil;
