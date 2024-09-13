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
  // {
  //   id: 3,
  //   href: "/tags",
  //   label: "tagi",
  // },

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
    <div className="bg-zinc-900 text-white w-screen h-[12vh] fixed top-0 left-0 z-10 flex items-center justify-between px-[10vw]">
      <div className="flex items-center">
        <Image
          src="/assets/images/logo.png"
          width={80}
          height={80}
          alt="logo"
          className="h-4/6 w-14 mr-5"
        />
        <h1 className="text-4xl capitalize font-bold logoFont">
          <span className="text-red-900">Stępki </span>Gotują
        </h1>
      </div>
      <nav className="w-3/6 flex justify-between items-center font-bodyFont font-bold">
        {links.map((link) => {
          return (
            <Link href={link.href} key={link.id} className="text-md capitalize">
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Navbar;
