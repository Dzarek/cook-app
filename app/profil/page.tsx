"use client";

import Image from "next/image";
import { GiChefToque } from "react-icons/gi";
import { MdChangeCircle } from "react-icons/md";
import { FaStar, FaRegStar } from "react-icons/fa";
import { BsQuestionCircleFill } from "react-icons/bs";
import { useState } from "react";
import AvatarModal from "@/components/AvatarModal";
import RecipesListProfile from "@/components/RecipeListProfile";

const Profil = () => {
  const [nick, setNick] = useState("Jarek");
  const [email, setEmail] = useState("dzarekcoding@gmail.com");
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [detailContent, setDetailContent] = useState({
    level: 2,
  });
  const [showLvl, setShowLvl] = useState(false);
  const [openAvatarModal, setOpenAvatarModal] = useState(false);
  return (
    <div className="page w-screen">
      <header className="text-center w-full py-[10vh] flex justify-center items-center">
        <GiChefToque className="text-5xl text-red-900  mr-5 recipeRotate4" />
        <h1 className="text-3xl font-bold font-bodyFont">Kucharz - Jarek</h1>
        <GiChefToque className="text-5xl text-red-900 ml-5 recipeRotate2" />
      </header>
      <main className="flex justify-between items-strech w-full mx-auto">
        <section className="w-2/6 border-t-2 border-red-950 bg-red-100 ">
          <h3 className="uppercase text-xl font-semibold bg-red-950 text-white p-2 text-center ">
            Profil:
          </h3>
          <div className="pb-12 flex flex-col w-4/5 items-center justify-center mx-auto mt-10">
            <div className="rounded-full w-4/5 mb-10 mx-auto flex flex-col items-center justify-center ">
              <Image
                src="/assets/images/avatars/avatarm1.jpg"
                width={400}
                height={400}
                alt="avatar"
                className="rounded-full w-full object-fill border-2 border-red-900 "
              />
              <button
                onClick={() => setOpenAvatarModal(true)}
                className="bg-white mt-3 text-md flex items-center justify-center  p-2 px-3 font-semibold rounded-md hover:bg-red-900 hover:text-white transition-all changeAvatarBtn"
              >
                zmień avatara{" "}
                <MdChangeCircle className="text-xl ml-3 text-red-800" />
              </button>
            </div>
            <form className="w-full flex flex-col items-center justify-center">
              <div className="w-full flex justify-center items-center my-3">
                <label
                  htmlFor="nick"
                  className="font-bold uppercase text-lg mr-5 text-red-900"
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
                  className="font-bold uppercase text-lg mr-5 text-red-900"
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
                <p className="font-bold uppercase text-lg mr-3 text-red-900">
                  Hasło:
                </p>
                <button
                  type="button"
                  className="bg-white uppercase p-2 px-3 font-semibold rounded-md hover:bg-red-900 hover:text-white transition-all text-md"
                >
                  Zmiana hasła
                </button>
              </div>
              <button
                type="submit"
                disabled={disabledBtn}
                className={`bg-zinc-500 mb-10 mt-5 text-zinc-300 opacity-45 w-1/3  block lowercase p-1 px-2 font-semibold rounded-md  transition-all ${
                  !disabledBtn &&
                  "hover:bg-red-900 hover:text-white cursor-pointer "
                }`}
              >
                zapisz zmiany
              </button>
            </form>
            <div className="w-full bg-white p-5 rounded-md">
              {showLvl && (
                <div className="rounded-md fixed p-4 z-10 top-[50%] left-[50%] w-[30vw] h-[40vh] translate-x-[-50%] translate-y-[-50%] bg-zinc-100 border-2 border-red-900 flex flex-col justify-center items-center text-center">
                  <p className="mb-4 text-center font-semibold">
                    Poziom kucharza zależny jest <br /> od ilości polubionych
                    przepisów:
                  </p>
                  <ul>
                    <li className="flex items-center justify-start">
                      {">3 ="} <FaStar className="ml-1" />
                    </li>
                    <li className="flex items-center justify-start">
                      {">7 ="} <FaStar className="ml-1" />
                      <FaStar className="ml-1" />
                    </li>
                    <li className="flex items-center justify-start">
                      {">15 ="} <FaStar className="ml-1" />
                      <FaStar className="ml-1" />
                      <FaStar className="ml-1" />
                    </li>
                    <li className="flex items-center justify-start">
                      {">20 ="} <FaStar className="ml-1" />
                      <FaStar className="ml-1" />
                      <FaStar className="ml-1" />
                      <FaStar className="ml-1" />
                    </li>
                    <li className="flex items-center justify-start">
                      {">25 ="} <FaStar className="ml-1" />
                      <FaStar className="ml-1" />
                      <FaStar className="ml-1" />
                      <FaStar className="ml-1" />
                      <FaStar className="ml-1" />
                    </li>
                  </ul>
                </div>
              )}
              <p className="text-zinc-900 text-md font-bold font-bodyFont flex items-center justify-center">
                Liczba dodanych przepisów:{" "}
                <span className="text-white font-bold text-xl bg-red-900 rounded-md py-1 px-3 ml-2">
                  4
                </span>
              </p>
              <p className="text-zinc-900 text-md font-bold font-bodyFont flex justify-center  mt-5">
                <BsQuestionCircleFill
                  onMouseEnter={() => setShowLvl(true)}
                  onMouseLeave={() => setShowLvl(false)}
                  className="lvlAsk mr-2 text-sm"
                />{" "}
                Poziom Kucharza:{" "}
                {[...Array(detailContent.level)].map((item, index) => {
                  return <FaStar className="starIcon " key={index} />;
                })}
                {[...Array(5 - detailContent.level)].map((item, index) => {
                  return (
                    <FaRegStar className="starIcon starRotate" key={index} />
                  );
                })}
              </p>
            </div>
          </div>
        </section>
        <section className="w-4/6 border-t-2 border-red-950">
          <h3 className="uppercase text-xl font-semibold bg-red-900 text-white p-2 text-center ">
            Moje przepisy:
          </h3>
          <div className="px-[5vw]">
            <RecipesListProfile />
          </div>
        </section>
      </main>
      {openAvatarModal && (
        <AvatarModal setOpenAvatarModal={setOpenAvatarModal} />
      )}
    </div>
  );
};

export default Profil;
