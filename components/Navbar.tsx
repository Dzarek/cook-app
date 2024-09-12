import Link from "next/link";
import Image from "next/image";

const links = [
  {
    id: 1,
    href: "/",
    label: "strona główna",
  },
  {
    id: 2,
    href: "/przepisy",
    label: "przepisy",
  },
  {
    id: 3,
    href: "/tags",
    label: "tagi",
  },

  {
    id: 4,
    href: "/dodaj-przepis",
    label: "dodaj przepis",
  },
  {
    id: 5,
    href: "/logowanie",
    label: "logowanie",
  },
];

const Navbar = () => {
  return (
    <div className="bg-red-950 text-white w-screen h-[12vh] fixed top-0 left-0 flex items-center justify-around">
      <div className="flex items-center">
        <Image
          src="/assets/images/logo.png"
          width={80}
          height={80}
          alt="logo"
          className="h-5/6 mr-5"
        />
        <h1 className="text-2xl uppercase">Stępki Gotują</h1>
      </div>
      <nav className="w-1/3 flex justify-between items-center">
        {links.map((link) => {
          return (
            <Link href={link.href} key={link.id} className="text-xl capitalize">
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Navbar;
