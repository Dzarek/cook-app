export const tags = [
  "śniadanie",
  "obiad",
  "kolacja",
  "impreza",
  "praca",
  "kurczak",
  // "lunch",
  "owoce",
  "ryby",
  "fit",
  "napoje",
];

export const avatars = [
  {
    id: 1,
    name: "laski",
    images: [
      "/assets/images/avatars/avatark1.webp",
      "/assets/images/avatars/avatark2.webp",
      "/assets/images/avatars/avatark3.webp",
      "/assets/images/avatars/avatark4.webp",
      "/assets/images/avatars/avatark5.webp",
      "/assets/images/avatars/avatark6.webp",
    ],
  },
  {
    id: 2,
    name: "chłopy",
    images: [
      "/assets/images/avatars/avatarm1.jpg",
      "/assets/images/avatars/avatarm2.jpg",
      "/assets/images/avatars/avatarm3.jpg",
      "/assets/images/avatars/avatarm4.jpg",
      "/assets/images/avatars/avatarm5.jpg",
      "/assets/images/avatars/avatarm6.jpg",
      "/assets/images/avatars/avatarm7.jpg",
      "/assets/images/avatars/avatarm8.jpg",
      "/assets/images/avatars/avatarm9.jpg",
      "/assets/images/avatars/avatarm10.jpg",
      "/assets/images/avatars/avatarm11.jpg",
      "/assets/images/avatars/avatarm12.jpg",
    ],
  },
  {
    id: 3,
    name: "dzieciuchy",
    images: ["/assets/images/avatars/avatark0.png"],
  },
];

export const users = [
  {
    id: 1,
    name: "Jarek",
    email: "dzarekcoding@gmail.com",
    avatar: "/assets/images/avatars/avatarm1.jpg",
    recipes: [
      {
        id: 1,
        title: "Placuszki Twarogowe",
        slug: "placuszki-twarogowe",
        image: "/assets/images/recipe1.jpeg",
        prepTime: 10,
        cookTime: 20,
        portion: 4,
        stars: 5,
        category: ["śniadanie", "fit", "lunch"],
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
    ],
  },
  {
    id: 2,
    name: "Dorota",
    email: "dzarekcoding@gmail.com",
    avatar: "/assets/images/avatars/avatark1.webp",
    recipes: [
      {
        id: 1,
        title: "Placuszki Twarogowe",
        slug: "placuszki-twarogowe",
        image: "/assets/images/recipe1.jpeg",
        prepTime: 10,
        cookTime: 20,
        portion: 4,
        stars: 5,
        category: ["śniadanie", "fit", "lunch"],
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
    ],
  },
];

export const authors = ["Dorota", "Jarek", "Ania", "Kamil", "Agata", "Justyna"];

export const options = [
  "Najnowsze",
  "Najstarsze",
  "Nazwa: A-Z",
  "Nazwa: Z-A",
  "Czas przygotowania: rosnąco",
  "Czas przygotowania: malejąco",
];
