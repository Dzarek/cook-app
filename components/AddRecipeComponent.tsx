"use client";

import { tags } from "@/constants";
import Image from "next/image";
import { Link, Element } from "react-scroll";
import { useState } from "react";
import { RiImageAddLine } from "react-icons/ri";
import { BsClockHistory } from "react-icons/bs";
import { GiRiceCooker } from "react-icons/gi";
import { BsPeople } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineAddCircle } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";

const ingredientsTest = [
  "ketchup",
  "3 szklanki mąki",
  "1 szklanka mleka",
  "50g drożdzy",
  "1 łyżeczka soli",
  "1 łyżeczka cukru",
  "4 łyżki oleju",
  "grzyby",
  "szynka drobiowa lub salami lub jakakolwiek inna byle było dobre",
  "ser żółty",
];

const steps = [
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
];

const description =
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex, placeat reiciendis magni ut distinctio quo dolore quia sit maiores atque molestiae provident accusamus quis rem facilis, accusantium earum eligendi quam autem molestias? A, veniam! Labore quas alias nulla dolor? Non nemo est voluptatem blanditiis, quis impedit vel? Harum, quaerat hic.";

const AddRecipeComponent = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newShortInfo, setNewShortInfo] = useState("");
  const [newCategory, setNewCategory] = useState([]);
  const [newPrepTime, setNewPrepTime] = useState(0);
  const [newCookTime, setNewCookTime] = useState(0);
  const [newPortion, setNewPortion] = useState(0);

  const [newIngredients, setNewIngredients] = useState(ingredientsTest);
  const [editingIngredient, setEditingIngredient] = useState(false);
  const [newIngredient, setNewIgredient] = useState("");

  const [newSteps, setNewSteps] = useState(steps);
  const [editingStep, setEditingStep] = useState(false);
  const [newStep, setNewStep] = useState("");

  const [newDescription, setNewDescription] = useState(description);

  const [confirmation, setConfirmation] = useState(false);

  const resetForm = () => {
    setNewTitle("");
    setNewShortInfo("");
    setNewCategory([]);
    setNewPrepTime(0);
    setNewCookTime(0);
    setNewPortion(0);
    setNewIngredients([]);
    setEditingIngredient(false);
    setNewIgredient("");
    setNewSteps([]);
    setEditingStep(false);
    setNewStep("");
    setNewDescription("");
  };

  const submitForm = () => {};

  return (
    <form
      onSubmit={submitForm}
      className="flex flex-col w-4/5 mx-auto mb-[10vh]"
    >
      <section className="flex justify-between w-full">
        <button className="flex flex-col items-center justify-center w-2/5 h-[50vh] border-red-900 border-dashed border-2 rounded-md">
          <RiImageAddLine className="text-6xl text-zinc-400" />
          <p className="mt-5 text-xl">dodaj zdjęcie</p>
        </button>
        <div className="w-[55%] flex flex-col">
          <div className="w-full flex justify-center items-center">
            <label
              className="font-semibold uppercase text-xl mr-3"
              htmlFor="title"
            >
              Tytuł:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="newRecipeInput font-bold text-center"
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <label
              className="font-semibold uppercase text-xl mr-3"
              htmlFor="shortInfo"
            >
              Krótki opis:
            </label>
            <textarea
              name="shortInfo"
              id="shortInfo"
              required
              value={newShortInfo}
              onChange={(e) => setNewShortInfo(e.target.value)}
              className="newRecipeInput mt-10 min-h-[20vh]"
            ></textarea>
          </div>
          <div className="w-full flex justify-center items-center mt-10">
            <label
              className="font-semibold uppercase text-xl mr-3"
              htmlFor="category"
            >
              Kategorie:
            </label>
            <ul className="flex-grow flex items-center justify-center flex-wrap">
              {tags.map((tag, index) => {
                return (
                  <li
                    key={index}
                    className="border-red-900 bg-[#fbf3f3] border-2 p-2 m-2 rounded-md cursor-pointer hover:bg-red-900 hover:text-white transition-all"
                  >
                    {tag}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
      <section className="w-2/3 mx-auto flex items-center justify-between my-[8vh]">
        <div className="flex flex-col items-center justify-center">
          <label
            htmlFor="prepTime"
            className="uppercase font-semibold text-lg  mt-5 text-gray-800"
          >
            przygotowanie
          </label>
          <div className="flex items-center mt-4">
            <BsClockHistory className="text-4xl text-red-900" />
            <input
              type="number"
              name="prepTime"
              id="prepTime"
              className="newRecipeInput w-20 mx-3 text-center"
              required
              value={newPrepTime}
              onChange={(e) => setNewPrepTime(Number(e.target.value))}
            />
            <p>min.</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <label
            htmlFor="cookTime"
            className="uppercase font-semibold text-lg  mt-5 text-gray-800"
          >
            gotowanie
          </label>
          <div className="flex items-center mt-4">
            <GiRiceCooker className="text-4xl text-red-900" />
            <input
              type="number"
              name="cookTime"
              id="cookTime"
              className="newRecipeInput w-20 mx-3 text-center"
              required
              value={newCookTime}
              onChange={(e) => setNewCookTime(Number(e.target.value))}
            />
            <p>min.</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <label
            htmlFor="portion"
            className="uppercase font-semibold text-lg  mt-5 text-gray-800"
          >
            ilość porcji
          </label>
          <div className="flex items-center mt-4">
            <BsPeople className="text-4xl text-red-900" />
            <input
              type="number"
              name="portion"
              id="portion"
              className="newRecipeInput w-20 mx-3 text-center"
              required
              value={newPortion}
              onChange={(e) => setNewPortion(Number(e.target.value))}
            />
            <p>szt.</p>
          </div>
        </div>
      </section>
      <section className="w-full my-[5vh] flex justify-between items-start">
        <div className="w-1/3 flex flex-col">
          <h2 className="text-2xl font-medium font-bodyFont mb-5 w-full bg-red-900 text-white rounded-md px-2 py-1">
            Składniki:
          </h2>
          <ul>
            {newIngredients.length > 1 &&
              newIngredients.map((item, index) => {
                return (
                  <li
                    className="text-lg font-bodyFont mb-4 border-b-2 pb-2 flex items-center justify-between"
                    key={index}
                  >
                    {item}
                    <div className="flex items-center text-2xl">
                      <Link
                        to="editIgredient"
                        spy={true}
                        smooth={true}
                        duration={1000}
                      >
                        <BiEdit
                          className="mr-3 text-green-900 cursor-pointer"
                          onClick={() => setEditingIngredient(true)}
                        />
                      </Link>

                      <MdDeleteForever className="text-red-900 cursor-pointer" />
                    </div>
                  </li>
                );
              })}
            {editingIngredient ? (
              <Element name="editIgredient">
                <h3 className="text-center w-full uppercase text-xl mt-8 font-semibold">
                  Edycja:
                </h3>
                <div className="flex items-center justify-between mt-4">
                  <input
                    type="text"
                    value={newIngredient}
                    onChange={(e) => setNewIgredient(e.target.value)}
                    className="newRecipeInput flex-grow text-center "
                  />
                  <GiConfirmed
                    className="ml-3 text-green-900 cursor-pointer text-2xl"
                    onClick={() => setEditingIngredient(false)}
                  />
                </div>
              </Element>
            ) : (
              <Element name="editIgredient">
                <div className="flex items-center justify-between mt-8">
                  <input
                    type="text"
                    placeholder="dodaj nowy składnik"
                    value={newIngredient}
                    onChange={(e) => setNewIgredient(e.target.value)}
                    className="newRecipeInput flex-grow text-center "
                  />
                  <MdOutlineAddCircle className="ml-3 text-green-900 cursor-pointer text-2xl" />
                </div>
              </Element>
            )}
          </ul>
        </div>
        <div className="ml-[10vw] flex-grow flex flex-col">
          <h2 className="text-2xl font-medium font-bodyFont mb-5 w-full bg-red-900 text-white rounded-md px-2 py-1">
            Instrukcje:
          </h2>
          <ul>
            {newSteps.length > 1 &&
              newSteps.map((item, index) => {
                return (
                  <div key={index} className="flex flex-col w-full mb-6">
                    <div className="flex flex-nowrap items-center justify-between mb-2">
                      <p className="uppercase text-red-900 text-2xl font-semibold font-headingFont mr-4">
                        krok {index + 1}
                      </p>
                      <span className="flex-grow h-[2px] bg-zinc-300 mr-5"></span>
                      <div className="flex items-center text-2xl mt-2">
                        <Link
                          to="editStep"
                          spy={true}
                          smooth={true}
                          duration={1000}
                        >
                          <BiEdit
                            className="mr-3 text-green-900 cursor-pointer"
                            onClick={() => setEditingStep(true)}
                          />
                        </Link>

                        <MdDeleteForever className="text-red-900 cursor-pointer" />
                      </div>
                    </div>
                    <p className="text-lg font-bodyFont">{item}</p>
                  </div>
                );
              })}
            {editingStep ? (
              <Element name="editIgredient">
                <h3 className="text-center w-full uppercase text-xl mt-8 font-semibold">
                  Edycja:
                </h3>
                <div className="flex items-center justify-between mt-4">
                  <input
                    type="text"
                    value={newStep}
                    onChange={(e) => setNewStep(e.target.value)}
                    className="newRecipeInput flex-grow text-center "
                  />
                  <GiConfirmed
                    className="ml-3 text-green-900 cursor-pointer text-2xl"
                    onClick={() => setEditingStep(false)}
                  />
                </div>
              </Element>
            ) : (
              <Element name="editIgredient">
                <div className="flex items-center justify-between mt-8">
                  <input
                    type="text"
                    placeholder="dodaj nowy krok"
                    value={newIngredient}
                    onChange={(e) => setNewStep(e.target.value)}
                    className="newRecipeInput flex-grow text-center "
                  />
                  <MdOutlineAddCircle className="ml-3 text-green-900 cursor-pointer text-2xl" />
                </div>
              </Element>
            )}
          </ul>
        </div>
      </section>
      <div className="w-4/5 flex justify-start items-start mx-auto my-[10vh] flex-col">
        <h2 className="flex items-center justify-between text-2xl font-medium font-bodyFont mb-5 w-full bg-red-900 text-white rounded-md px-2 py-1">
          Opis: <span>(opcjonalne)</span>
        </h2>
        <textarea
          name="newDesription"
          id="newDesription"
          required
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="newRecipeInput w-full min-h-[20vh]"
        ></textarea>
      </div>
      <button
        type="submit"
        className="mt-10 border-2 border-red-900 bg-[#fbf3f3] text-red-900 hover:bg-red-900 hover:text-white p-4 text-xl font-bodyFont  rounded-md font-semibold w-1/7 uppercase mx-auto transition-all"
      >
        Zapisz
      </button>
    </form>
  );
};

export default AddRecipeComponent;