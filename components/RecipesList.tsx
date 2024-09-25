import Link from "next/link";
import Image from "next/image";
// import slugify from "slugify";

const RecipesList = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <div className="mx-auto my-[5vh] flex w-full items-center justify-center flex-wrap">
      {recipes.map((recipe) => {
        const { id, title, image, prepTime, cookTime, author, category, slug } =
          recipe;
        // const slug = slugify(title, { lower: true });
        return (
          <Link
            href={`/przepisy/${slug}`}
            className="recipe bg-stone-100 hover:scale-105 transition-transform"
            key={id}
          >
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
              <p className="text-gray-600 text-sm mb-1">
                Przygotowanie:{" "}
                <strong className="text-red-800">{prepTime} min</strong> |
                Gotowanie:{" "}
                <strong className="text-red-800">{cookTime} min</strong>
              </p>
              <p className="text-gray-600 text-sm">
                Tag:{" "}
                <strong className="text-red-800 capitalize">
                  {category.length > 1
                    ? category[0] + ", inne..."
                    : category[0]}
                </strong>{" "}
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
