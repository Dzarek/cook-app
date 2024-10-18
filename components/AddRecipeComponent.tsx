"use client";

import { tags } from "@/constants";
import Image from "next/image";
import { Link, Element } from "react-scroll";
import { useState, useEffect } from "react";
import { BsClockHistory } from "react-icons/bs";
import { GiRiceCooker } from "react-icons/gi";
import { BsPeople } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineAddCircle } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { postRecipe } from "@/lib/user.actions";
import toast from "react-hot-toast";
import UploadImage from "./cloudinary/UploadImage";
import { useGlobalContext } from "./authContext";
import VoiceIngredient from "./voice/VoiceIngredient";
import VoiceLongText from "./voice/VoiceLongText";

const AddRecipeComponent = ({
  edycja,
  userID,
}: {
  edycja: string;
  userID: string;
}) => {
  const [newTitle, setNewTitle] = useState("");
  const [newShortInfo, setNewShortInfo] = useState("");
  const [newCategory, setNewCategory] = useState<string[]>([]);
  const [newPrepTime, setNewPrepTime] = useState(0);
  const [newCookTime, setNewCookTime] = useState(0);
  const [newPortion, setNewPortion] = useState(0);
  const [newIngredients, setNewIngredients] = useState<string[]>([]);
  const [editingIngredient, setEditingIngredient] = useState<number>(-1);
  const [newIngredient, setNewIgredient] = useState("");
  const [newSteps, setNewSteps] = useState<string[]>([]);
  const [editingStep, setEditingStep] = useState<number>(-1);
  const [newStep, setNewStep] = useState("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [newImage, setNewImage] = useState<string>("");
  const [activeVoice, setActiveVoice] = useState("");

  const { editRecipe, setEditRecipe } = useGlobalContext();

  useEffect(() => {
    if (edycja) {
      setNewImage(editRecipe.image);
      setNewTitle(editRecipe.title);
      setNewShortInfo(editRecipe.shortInfo);
      setNewCategory(editRecipe.category);
      setNewPrepTime(editRecipe.prepTime);
      setNewCookTime(editRecipe.cookTime);
      setNewPortion(editRecipe.portion);
      setNewIngredients(editRecipe.ingredients);
      setNewSteps(editRecipe.steps);
      setNewDescription(editRecipe.description);
    }
  }, []);

  const handleNewCategory = (tag: string) => {
    if (newCategory.includes(tag)) {
      setNewCategory(newCategory.filter((category) => category !== tag));
    } else {
      setNewCategory([...newCategory, tag]);
    }
  };

  const handleAddIngredient = () => {
    const updatedItems = [...newIngredients];
    setNewIngredients([...updatedItems, newIngredient]);
    setNewIgredient("");
  };
  const handleAddStep = () => {
    const updatedItems = [...newSteps];
    setNewSteps([...updatedItems, newStep]);
    setNewStep("");
  };

  const handleEditIngredient = (index: number) => {
    const updatedItems = [...newIngredients];
    updatedItems[index] = newIngredient;
    setNewIngredients(updatedItems);
    setNewIgredient("");
    setEditingIngredient(-1);
  };
  const handleEditStep = (index: number) => {
    const updatedItems = [...newSteps];
    updatedItems[index] = newStep;
    setNewSteps(updatedItems);
    setNewStep("");
    setEditingStep(-1);
  };

  const handleDeleteIngedient = (index: number) => {
    const updatedItems = [...newIngredients];
    updatedItems.splice(index, 1);
    setNewIngredients(updatedItems);
  };
  const handleDeleteStep = (index: number) => {
    const updatedItems = [...newSteps];
    updatedItems.splice(index, 1);
    setNewSteps(updatedItems);
  };

  const resetForm = () => {
    setNewImage("");
    setNewTitle("");
    setNewShortInfo("");
    setNewCategory([]);
    setNewPrepTime(0);
    setNewCookTime(0);
    setNewPortion(0);
    setNewIngredients([]);
    setEditingIngredient(-1);
    setNewIgredient("");
    setNewSteps([]);
    setEditingStep(-1);
    setNewStep("");
    setNewDescription("");
    setEditRecipe(null);
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let editing = edycja ? true : false;
    let recipeID = edycja;
    if (
      userID !== "" &&
      newImage !== "" &&
      newTitle !== "" &&
      newShortInfo !== "" &&
      newCategory.length > 0 &&
      newPrepTime > 0 &&
      newCookTime > 0 &&
      newPortion > 0 &&
      newIngredients.length > 0 &&
      newSteps.length > 0
      // newDescription !== ""
    ) {
      await postRecipe(
        editing,
        recipeID,
        userID,
        newImage,
        newTitle,
        newShortInfo,
        newCategory,
        newPrepTime,
        newCookTime,
        newPortion,
        newIngredients,
        newSteps,
        newDescription
      );
      resetForm();
    } else {
      toast("Uzupełnij wszystkie pola!", {
        icon: "✖",
        style: {
          borderRadius: "10px",
          background: "#280505",
          color: "#fff",
        },
      });
    }
  };

  return (
    <form
      onSubmit={submitForm}
      className="flex flex-col w-4/5 mx-auto mb-[10vh]"
    >
      <section className="flex justify-between w-full">
        {newImage === "" ? (
          <UploadImage setNewImage={setNewImage} />
        ) : (
          <div className="flex flex-col items-center justify-center w-2/5">
            <div className="flex flex-col items-center justify-center w-full h-[50vh] border-red-900 border-dashed border-2 rounded-md relative">
              <Image
                src={newImage}
                width={500}
                height={500}
                alt="recipeImg"
                className="w-full h-full object-cover rounded-md "
              />
            </div>
            <button
              type="button"
              className="p-2 bg-red-900 text-white uppercase text-md font-semibold rounded-md hover:bg-red-950 duration-500 mt-2"
              onClick={() => setNewImage("")}
            >
              Zmień obraz
            </button>
          </div>
        )}
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
                    onClick={() => handleNewCategory(tag)}
                    key={index}
                    className={
                      newCategory.includes(tag)
                        ? "bg-red-900 text-white transition-all border-red-900 border-2 p-2 m-2 rounded-md cursor-pointer"
                        : "border-red-900 bg-[#fbf3f3] border-2 p-2 m-2 rounded-md cursor-pointer hover:bg-red-900 hover:text-white transition-all"
                    }
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
              min={0}
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
              min={0}
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
              min={0}
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
            {newIngredients.length > 0 &&
              newIngredients.map((item, index) => {
                return (
                  <li
                    className={
                      index === editingIngredient
                        ? "text-lg font-bodyFont mb-2 border-b-2 py-2 flex items-center justify-between editAddRecipeItem rounded-md"
                        : "text-lg font-bodyFont mb-2 border-b-2 py-2 flex items-center justify-between"
                    }
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
                          onClick={() => {
                            setEditingIngredient(index);
                            setNewIgredient(item);
                          }}
                        />
                      </Link>

                      <MdDeleteForever
                        onClick={() => handleDeleteIngedient(index)}
                        className="text-red-900 cursor-pointer"
                      />
                    </div>
                  </li>
                );
              })}
            {editingIngredient >= 0 ? (
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
                    onClick={() => handleEditIngredient(editingIngredient)}
                  />
                </div>
              </Element>
            ) : (
              <Element name="editIgredient">
                <div>
                  <div className="flex items-center justify-between mt-8">
                    <input
                      type="text"
                      placeholder="dodaj nowy składnik"
                      value={newIngredient}
                      onChange={(e) => setNewIgredient(e.target.value)}
                      className="newRecipeInput flex-grow text-center "
                    />
                    <MdOutlineAddCircle
                      className="ml-3 text-green-900 cursor-pointer text-4xl"
                      onClick={handleAddIngredient}
                    />
                  </div>

                  {activeVoice !== "stepsVoice" && (
                    <VoiceIngredient
                      newIngredients={newIngredients}
                      setNewIgredients={setNewIngredients}
                      toastText="powiedz nazwę składnika"
                      setActiveVoice={setActiveVoice}
                    />
                  )}
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
            {newSteps.length > 0 &&
              newSteps.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={
                      index === editingStep
                        ? "flex flex-col w-full mb-6 editAddRecipeItem"
                        : "flex flex-col w-full mb-6"
                    }
                  >
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
                            onClick={() => {
                              setEditingStep(index);
                              setNewStep(item);
                            }}
                          />
                        </Link>

                        <MdDeleteForever
                          onClick={() => handleDeleteStep(index)}
                          className="text-red-900 cursor-pointer"
                        />
                      </div>
                    </div>
                    <p className="text-lg font-bodyFont">{item}</p>
                  </div>
                );
              })}
            {editingStep >= 0 ? (
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
                    onClick={() => handleEditStep(editingStep)}
                  />
                </div>
              </Element>
            ) : (
              <Element name="editIgredient">
                <div>
                  <div className="flex items-center justify-between mt-8">
                    <input
                      type="text"
                      placeholder="dodaj nowy krok"
                      value={newStep}
                      onChange={(e) => setNewStep(e.target.value)}
                      className="newRecipeInput flex-grow text-center "
                    />
                    <MdOutlineAddCircle
                      className="ml-3 text-green-900 cursor-pointer text-4xl"
                      onClick={handleAddStep}
                    />
                  </div>
                  {activeVoice !== "ingredientVoice" && (
                    <VoiceLongText
                      setNewText={setNewStep}
                      newText={newStep}
                      toastText="powiedz nowy krok instrukcji"
                      setActiveVoice={setActiveVoice}
                    />
                  )}
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
