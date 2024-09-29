import Link from "next/link";
import Image from "next/image";
// import slugify from "slugify";
import { FaHeart } from "react-icons/fa";

const RecipesList = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <div className="mx-auto my-[5vh] flex w-full items-center justify-center flex-wrap">
      {recipes.map((recipe) => {
        const {
          id,
          title,
          image,
          prepTime,
          cookTime,
          author,
          category,
          // slug,
          likes,
        } = recipe;
        // const slug = slugify(title, { lower: true });
        return (
          <Link
            href={`/przepisy/${id}`}
            className="recipe  bg-neutral-50 
            cursor-pointer overflow-hidden relative transition-all duration-300 hover:-translate-y-2  rounded-lg shadow-xl flex flex-row items-center justify-center  before:absolute before:w-full hover:before:top-0 before:duration-300 before:-top-1 before:h-1 before:bg-red-900
            "
            key={id}
          >
            <Image
              src={image}
              width={500}
              height={500}
              className="w-full h-4/6 object-fill recipe-img"
              alt={title}
            />
            <section className="h-2/6 flex flex-col items-center justify-center p-2">
              <h5 className="text-base text-center font-bold mb-2 w-full">
                {title.toUpperCase()}
              </h5>
              <p className="text-gray-600 text-sm mb-2">
                Przygotowanie:{" "}
                <strong className="text-red-800">{prepTime} min</strong> |
                Gotowanie:{" "}
                <strong className="text-red-800">{cookTime} min</strong>
              </p>
              <p className="text-gray-600 text-sm mb-2">
                Kategorie:{" "}
                <strong className="text-red-800 capitalize">
                  {category.length > 1
                    ? category[0] + ", inne..."
                    : category[0]}
                </strong>{" "}
                | Autor:{" "}
                <strong className="text-red-800">{author.authorName}</strong>
              </p>
              <p className="flex justify-center items-center">
                <FaHeart className="mr-2 text-gray-500" />{" "}
                <strong className="text-red-800">{likes}</strong>
              </p>
            </section>
          </Link>
        );
      })}
    </div>
  );
};

export default RecipesList;
