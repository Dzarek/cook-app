"use client";
import LikeBtn from "./uiverse/LikeBtn";

const LikeControl = ({ likes }: { likes: number }) => {
  return (
    <div className="absolute bottom-[10%] right-[10%] flex items-center justify-center">
      <p className="mr-3 text-xl">Smaczne?</p>
      <LikeBtn />
      <h2 className="ml-3 text-2xl font-bold">{likes}</h2>
    </div>
  );
};

export default LikeControl;
