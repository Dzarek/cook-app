import { tags } from "@/constants";
import Image from "next/image";
import Link from "next/link";

// const welcomeVideo = "/assets/video/header.mp4";

export default function Home() {
  return (
    <div className="main mx-auto w-screen">
      <header className="relative mx-auto flex justify-center items-center w-3/4 h-[60vh] mt-[22vh]">
        {/* <video
          src={welcomeVideo}
          autoPlay
          muted
          loop
          playsInline
          // type="video/mp4"
          className="w-3/5 h-1/2 object-cover"
        ></video> */}
        <Image
          src="/assets/images/header.png"
          width={1000}
          height={1000}
          alt="headerImg"
          className="w-3/5 h-full object-cover"
        />
        <div className="tags w-2/6 h-full bg-stone-800 text-white p-5 flex flex-col items-center justify-center">
          <h3 className="text-center mb-10 text-2xl uppercase">Tagi:</h3>
          <nav className="flex flex-col items-center justify-center text-red-800 text-xl capitalize">
            {tags.map((tag, index) => {
              return (
                <>
                  {tag === "śniadanie" ? (
                    <Link className="mb-2" href={`/tags/sniadanie`} key={index}>
                      {tag}
                    </Link>
                  ) : (
                    <Link className="mb-2" href={`/tags/${tag}`} key={index}>
                      {tag}
                    </Link>
                  )}
                </>
              );
            })}
          </nav>
        </div>
      </header>
      <div className="recipesList">
        <div className="oneRecipe"></div>
      </div>
    </div>
  );
}
