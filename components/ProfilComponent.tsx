"use client";

import Image from "next/image";
import { MdChangeCircle } from "react-icons/md";
import { FaStar, FaRegStar } from "react-icons/fa";
import { BsQuestionCircleFill } from "react-icons/bs";
import { useState, useEffect } from "react";

import AvatarModal from "@/components/AvatarModal";
import RecipesListProfile from "@/components/RecipeListProfile";

import { updateUserProfile, changePassword } from "@/lib/user.actions";
import toast from "react-hot-toast";

type ProfilTypes = {
  currentUser: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  userRecipes: Recipe[];
};

const ProfilComponent = ({ currentUser, userRecipes }: ProfilTypes) => {
  const [nick, setNick] = useState(currentUser.name || "");
  const [email, setEmail] = useState(currentUser.email || "");
  const [avatar, setAvatar] = useState(
    currentUser.image || "/assets/images/avatars/avatar0.webp"
  );
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [showLvl, setShowLvl] = useState(false);
  const [openAvatarModal, setOpenAvatarModal] = useState(false);

  useEffect(() => {
    if (
      nick !== currentUser.name ||
      email !== currentUser.email ||
      avatar !== currentUser.image
    ) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [nick, email, avatar]);

  const totalLikes = userRecipes.reduce((sum, recipe) => sum + recipe.likes, 0);

  let level = 0;
  if (totalLikes > 24) {
    level = 5;
  } else if (totalLikes > 19) {
    level = 4;
  } else if (totalLikes > 14) {
    level = 3;
  } else if (totalLikes > 9) {
    level = 2;
  } else if (totalLikes > 2) {
    level = 1;
  }

  const handleUpdateProfile = async () => {
    await updateUserProfile(nick, email, avatar);
    toast("Profil został edytowany!", {
      icon: "✖",
      style: {
        borderRadius: "10px",
        background: "#052814",
        color: "#fff",
      },
    });
  };
  const handleUpdatePassword = async () => {
    await changePassword(email);
    toast("Hasło zostało zmienione!", {
      icon: "✖",
      style: {
        borderRadius: "10px",
        background: "#052814",
        color: "#fff",
      },
    });
  };

  return (
    <>
      <main className="flex justify-between items-strech w-full mx-auto">
        <section className="w-2/6 border-t-2 border-red-950 bg-red-100 ">
          <h3 className="uppercase text-xl font-semibold bg-red-950 text-white p-2 text-center ">
            Profil:
          </h3>
          <div className="pb-12 flex flex-col w-4/5 items-center justify-center mx-auto mt-10">
            <div className="rounded-full w-4/5 mb-10 mx-auto flex flex-col items-center justify-center ">
              <Image
                src={avatar}
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
            <form
              onSubmit={handleUpdateProfile}
              className="w-full flex flex-col items-center justify-center"
            >
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

              <button
                type="submit"
                disabled={disabledBtn}
                className={
                  disabledBtn
                    ? "bg-zinc-500 mb-10 mt-5 text-zinc-300 opacity-45 w-1/3  block lowercase p-1 px-2 font-semibold rounded-md  transition-all"
                    : "bg-red-900 mb-10 mt-5 text-white w-1/3  block lowercase p-1 px-2 font-semibold rounded-md  transition-all duration-300 cursor-pointer hover:bg-red-950 profileBtnSaveChanges"
                }
              >
                zapisz zmiany
              </button>
            </form>
            <div className="w-full flex justify-start items-center mb-10">
              <p className="font-bold uppercase text-lg mr-3 text-red-900">
                Hasło:
              </p>
              <button
                onClick={handleUpdatePassword}
                type="button"
                className="bg-white uppercase p-2 px-3 font-semibold rounded-md hover:bg-red-900 hover:text-white transition-all text-md"
              >
                Wyślij link do zmiany hasła
              </button>
            </div>
            <div className="w-full bg-white p-5 rounded-md">
              {showLvl && (
                <div className="rounded-md fixed p-4 z-10 top-[50%] left-[50%] w-[30vw] h-[40vh] translate-x-[-50%] translate-y-[-50%] bg-zinc-100 border-2 border-red-900 flex flex-col justify-center items-center text-center">
                  <p className="mb-4 text-center font-semibold">
                    Poziom kucharza zależny jest <br /> od ilości polubionych
                    przepisów:
                  </p>
                  <ul>
                    <li className="flex items-center justify-start">
                      {">=3 ="} <FaStar className="ml-1" />
                    </li>
                    <li className="flex items-center justify-start">
                      {">=10 ="} <FaStar className="ml-1" />
                      <FaStar className="ml-1" />
                    </li>
                    <li className="flex items-center justify-start">
                      {">=15 ="} <FaStar className="ml-1" />
                      <FaStar className="ml-1" />
                      <FaStar className="ml-1" />
                    </li>
                    <li className="flex items-center justify-start">
                      {">=20 ="} <FaStar className="ml-1" />
                      <FaStar className="ml-1" />
                      <FaStar className="ml-1" />
                      <FaStar className="ml-1" />
                    </li>
                    <li className="flex items-center justify-start">
                      {">=25 ="} <FaStar className="ml-1" />
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
                  {userRecipes.length}
                </span>
              </p>
              <p className="text-zinc-900 text-md font-bold font-bodyFont flex justify-center  mt-5">
                <BsQuestionCircleFill
                  onMouseEnter={() => setShowLvl(true)}
                  onMouseLeave={() => setShowLvl(false)}
                  className="lvlAsk mr-2 text-sm"
                />{" "}
                Poziom Kucharza:{" "}
                {[...Array(level)].map((item, index) => {
                  return <FaStar className="starIcon " key={index} />;
                })}
                {[...Array(5 - level)].map((item, index) => {
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
            <RecipesListProfile recipes={userRecipes} />
          </div>
        </section>
      </main>
      {openAvatarModal && (
        <AvatarModal
          setOpenAvatarModal={setOpenAvatarModal}
          activeAvatar={avatar}
          setActiveAvatar={setAvatar}
        />
      )}
    </>
  );
};

export default ProfilComponent;
