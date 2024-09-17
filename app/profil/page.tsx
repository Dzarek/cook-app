"use client";

import RecipesList from "@/components/RecipesList";
import Image from "next/image";
import { GiChefToque } from "react-icons/gi";
import { MdChangeCircle } from "react-icons/md";
import { useState } from "react";

const Profil = () => {
  const [nick, setNick] = useState("Jarek");
  const [email, setEmail] = useState("dzarekcoding@gmail.com");
  return (
    <div className="page w-screen">
      <header className="text-center w-full py-[10vh] flex justify-center items-center">
        <GiChefToque className="text-5xl text-red-900  mr-5 recipeRotate4" />
        <h1 className="text-3xl font-bold font-bodyFont">Kucharz - Jarek</h1>
        <GiChefToque className="text-5xl text-red-900 ml-5 recipeRotate2" />
      </header>
      <main className="flex justify-between items-strech w-full mx-auto">
        <section className="w-2/6 border-t-2 border-red-950 bg-zinc-800 ">
          <h3 className="uppercase text-xl font-semibold bg-zinc-900 text-white p-2 text-center ">
            Profil:
          </h3>
          <div className="pb-12 flex flex-col w-4/5 items-center justify-center mx-auto mt-10">
            <div className="rounded-full w-4/5 mb-5 mx-auto flex flex-col items-center justify-center ">
              <Image
                src="/assets/images/avatars/avatarm1.jpg"
                width={400}
                height={400}
                alt="avatar"
                className="rounded-full w-full object-fill border-2 border-red-900 "
              />
              <button className="bg-white mt-3 flex items-center justify-center uppercase p-2 px-3 font-semibold rounded-md hover:bg-red-900 hover:text-white transition-all">
                Zmień Avatara{" "}
                <MdChangeCircle className="text-3xl ml-3 text-red-800" />
              </button>
            </div>
            <form className="w-full flex flex-col items-center justify-center">
              <div className="w-full flex justify-center items-center my-3">
                <label
                  htmlFor="nick"
                  className="font-semibold uppercase text-xl mr-5 text-red-600"
                >
                  Nick:
                </label>
                <input
                  type="text"
                  name="nick"
                  id="nick"
                  value={nick}
                  onChange={(e) => setNick(e.target.value)}
                  className="profilInput font-semibold text-center"
                />
              </div>
              <div className="w-full flex justify-center items-center my-3">
                <label
                  htmlFor="nick"
                  className="font-semibold uppercase text-xl mr-3 text-red-600"
                >
                  Email:
                </label>
                <input
                  type="text"
                  name="nick"
                  id="nick"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="profilInput font-semibold text-center"
                />
              </div>

              <div className="w-full flex justify-start items-center my-3">
                <p className="font-semibold uppercase text-xl mr-3 text-red-600">
                  Hasło:
                </p>
                <button
                  type="button"
                  className="bg-white uppercase p-2 px-3 font-semibold rounded-md hover:bg-red-900 hover:text-white transition-all"
                >
                  Zmiana hasła
                </button>
              </div>
              <button
                type="submit"
                disabled={true}
                className="bg-zinc-500 my-10 text-zinc-300 opacity-45 w-1/3  block lowercase p-1 px-2 font-semibold rounded-md hover:bg-red-900 hover:text-white transition-all"
              >
                zapisz zmiany
              </button>
            </form>
            <p className="text-white text-xl font-bold font-bodyFont">
              Liczba dodanych przepisów:{" "}
              <span className="text-red-600 text-2xl">4</span>
            </p>
          </div>
        </section>
        <section className="w-4/6 border-t-2 border-red-950">
          <h3 className="uppercase text-xl font-semibold bg-red-900 text-white p-2 text-center ">
            Moje przepisy:
          </h3>
          <div className="px-[5vw]">
            <RecipesList />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profil;
