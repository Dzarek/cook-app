"use client";

import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

const saveToLocalStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const loadFromLocalStorage = (key: string, defaultValue: any) => {
  if (typeof window === "undefined") return defaultValue;

  try {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    localStorage.removeItem(key); // Clear corrupted data
    return defaultValue;
  }
};

const InfoUpdate = () => {
  const [openInfo, setOpenInfo] = useState(true);

  useEffect(() => {
    const stored = loadFromLocalStorage("openInfo", true);
    setOpenInfo(stored);
  }, []);

  const handleCloseBtn = () => {
    setOpenInfo(false);
    saveToLocalStorage("openInfo", false);
  };

  return (
    <>
      {openInfo ? (
        <div className="z-[40] flex flex-col justify-around items-center p-4 fixed top-[50%] left-[50%] h-[90vh] w-[90vw] xl:h-[70vh] xl:w-[70vw] translate-x-[-50%] translate-y-[-50%] bg-zinc-900 border-red-900 border-2 rounded-md text-white">
          <button onClick={handleCloseBtn} className="text-4xl mx-auto my-5">
            <MdClose />
          </button>
          <h2 className="text-center text-xl xl:text-2xl font-bold mb-5">
            Komunikat Administratora
          </h2>
          <p className="text-center mb-10 xl:text-xl font-semibold">
            Witajcie Kucharze! <br /> W aplikacji mamy kilka zmian:
          </p>
          <ul className="">
            <li className="mb-4">
              <span className="font-semibold text-red-600">
                1. Ranking Kucharzy:
              </span>{" "}
              liczba polubień niezbędnych do otrzymania tytułu Mistrza Kuchni
              jest liczona teraz według tegorocznych przepisów.
            </li>
            <li className="mb-4">
              <span className="font-semibold text-red-600">
                2. Dodawanie przepisów:
              </span>{" "}
              dodając przepis można teraz określić kategorie składnika.
            </li>
            <li className="mb-4">
              <span className="font-semibold text-red-600">3. Profil:</span> w
              zakładce profil znajdziemy teraz listę polubionych przez nas
              przepisów.
            </li>
          </ul>
          <p className="text-center mt-5 font-semibold">A TERAZ DO GARÓW! 😁</p>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default InfoUpdate;
