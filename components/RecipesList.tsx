import Link from "next/link";
import Image from "next/image";
// import slugify from "slugify";

export const recipes = [
  {
    id: 1,
    title: "Placuszki Twarogowe",
    slug: "placuszki-twarogowe",
    image: "/assets/images/recipe1.jpeg",
    prepTime: 10,
    cookTime: 20,
    portion: 4,
    category: ["śniadanie", "fit", "lunch"],
    author: {
      name: "Jarek",
      avatar: "/assets/images/avatars/avatar1.webp",
    },
    shortInfo:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam enim, animi et nam, facere alias laudantium voluptatum aperiam, error temporibus ratione reiciendis optio sequi odio officiis explicabo maxime sit!",
    ingredients: [
      "ketchup",
      "3 szklanki mąki",
      "1 szklanka mleka",
      "50g drożdzy",
      "1 łyżeczka soli",
      "1 łyżeczka cukru",
      "4 łyżki oleju",
      "grzyby",
      "szynka drobiowa lub salami",
      "ser żółty",
    ],
    steps: [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
    ],
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel ipsa obcaecati alias quos delectus suscipit ab. Nam voluptas, facere mollitia sapiente nihil rerum ipsum minima, neque aliquam debitis temporibus quis eligendi rem consectetur porro, aliquid voluptates magnam sed omnis? Eligendi fugit porro facere officia aspernatur officiis placeat fuga mollitia maxime?",
  },
  {
    id: 2,
    title: "Placuszki Twarogowe",
    slug: "placuszki-twarogowe",
    image: "/assets/images/recipe1.jpeg",
    prepTime: 10,
    cookTime: 20,
    portion: 4,
    category: ["śniadanie", "fit", "lunch"],
    author: {
      name: "Jarek",
      avatar: "/assets/images/avatars/avatar1.webp",
    },
    shortInfo:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam enim, animi et nam, facere alias laudantium voluptatum aperiam, error temporibus ratione reiciendis optio sequi odio officiis explicabo maxime sit!",
    ingredients: [
      "ketchup",
      "3 szklanki mąki",
      "1 szklanka mleka",
      "50g drożdzy",
      "1 łyżeczka soli",
      "1 łyżeczka cukru",
      "4 łyżki oleju",
      "grzyby",
      "szynka drobiowa lub salami",
      "ser żółty",
    ],
    steps: [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
    ],
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel ipsa obcaecati alias quos delectus suscipit ab. Nam voluptas, facere mollitia sapiente nihil rerum ipsum minima, neque aliquam debitis temporibus quis eligendi rem consectetur porro, aliquid voluptates magnam sed omnis? Eligendi fugit porro facere officia aspernatur officiis placeat fuga mollitia maxime?",
  },
  {
    id: 3,
    title: "Placuszki Twarogowe",
    slug: "placuszki-twarogowe",
    image: "/assets/images/recipe1.jpeg",
    prepTime: 10,
    cookTime: 20,
    portion: 4,
    category: ["śniadanie", "fit", "lunch"],
    author: {
      name: "Jarek",
      avatar: "/assets/images/avatars/avatar1.webp",
    },
    shortInfo:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam enim, animi et nam, facere alias laudantium voluptatum aperiam, error temporibus ratione reiciendis optio sequi odio officiis explicabo maxime sit!",
    ingredients: [
      "ketchup",
      "3 szklanki mąki",
      "1 szklanka mleka",
      "50g drożdzy",
      "1 łyżeczka soli",
      "1 łyżeczka cukru",
      "4 łyżki oleju",
      "grzyby",
      "szynka drobiowa lub salami",
      "ser żółty",
    ],
    steps: [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
    ],
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel ipsa obcaecati alias quos delectus suscipit ab. Nam voluptas, facere mollitia sapiente nihil rerum ipsum minima, neque aliquam debitis temporibus quis eligendi rem consectetur porro, aliquid voluptates magnam sed omnis? Eligendi fugit porro facere officia aspernatur officiis placeat fuga mollitia maxime?",
  },
  {
    id: 4,
    title: "Placuszki Twarogowe",
    slug: "placuszki-twarogowe",
    image: "/assets/images/recipe1.jpeg",
    prepTime: 10,
    cookTime: 20,
    portion: 4,
    category: ["śniadanie", "fit", "lunch"],
    author: {
      name: "Jarek",
      avatar: "/assets/images/avatars/avatar1.webp",
    },
    shortInfo:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam enim, animi et nam, facere alias laudantium voluptatum aperiam, error temporibus ratione reiciendis optio sequi odio officiis explicabo maxime sit!",
    ingredients: [
      "ketchup",
      "3 szklanki mąki",
      "1 szklanka mleka",
      "50g drożdzy",
      "1 łyżeczka soli",
      "1 łyżeczka cukru",
      "4 łyżki oleju",
      "grzyby",
      "szynka drobiowa lub salami",
      "ser żółty",
    ],
    steps: [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, hic.",
    ],
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel ipsa obcaecati alias quos delectus suscipit ab. Nam voluptas, facere mollitia sapiente nihil rerum ipsum minima, neque aliquam debitis temporibus quis eligendi rem consectetur porro, aliquid voluptates magnam sed omnis? Eligendi fugit porro facere officia aspernatur officiis placeat fuga mollitia maxime?",
  },
];

const RecipesList = () => {
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
                | Autor: <strong className="text-red-800">{author.name}</strong>
              </p>
            </section>
          </Link>
        );
      })}
    </div>
  );
};

export default RecipesList;
