import Link from "next/link";
import Image from "next/image";
import slugify from "slugify";

const recipes = [
  {
    id: 1,
    title: "Placuszki Twarogowe",
    image: "/assets/images/recipe1.jpeg",
    prepTime: 10,
    cookTime: 20,
    tag: "śniadanie",
    author: "Jarek",
  },
  {
    id: 2,
    title: "Placuszki Twarogowe",
    image: "/assets/images/recipe1.jpeg",
    prepTime: 10,
    cookTime: 20,
    tag: "śniadanie",
    author: "Jarek",
  },
  {
    id: 3,
    title: "Placuszki Twarogowe",
    image: "/assets/images/recipe1.jpeg",
    prepTime: 10,
    cookTime: 20,
    tag: "śniadanie",
    author: "Jarek",
  },
  {
    id: 4,
    title: "Placuszki Twarogowe",
    image: "/assets/images/recipe1.jpeg",
    prepTime: 10,
    cookTime: 20,
    tag: "śniadanie",
    author: "Jarek",
  },
];

const RecipesList = () => {
  return (
    <div className="mx-auto my-[5vh] flex w-full items-center justify-center flex-wrap">
      {recipes.map((recipe) => {
        const { id, title, image, prepTime, cookTime, author, tag } = recipe;
        const slug = slugify(title, { lower: true });
        return (
          <Link href={`/${slug}`} className="recipe bg-stone-100" key={id}>
            <Image
              src={image}
              width={1000}
              height={1000}
              className="w-full h-4/6 object-cover recipe-img"
              alt={title}
            />
            <section className="flex flex-col items-center justify-center p-2">
              <h5 className="text-base text-center font-bold mb-2 w-full">
                {title}
              </h5>
              <p className="text-gray-600 text-sm">
                Przygotowanie:{" "}
                <strong className="text-red-800">{prepTime} min</strong> |
                Gotowanie:{" "}
                <strong className="text-red-800">{cookTime} min</strong>
              </p>
              <p className="text-gray-600 text-sm">
                Tag: <strong className="text-red-800 capitalize">{tag}</strong>{" "}
                | Autor: <strong className="text-red-800">{author}</strong>
              </p>
            </section>
          </Link>
        );
      })}
    </div>
  );
};

export default RecipesList;
