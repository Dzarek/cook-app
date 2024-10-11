"use client";
import { useGlobalContext } from "./authContext";
import { editLike } from "@/lib/user.actions";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const LikeControl = ({
  likes,
  userID,
  recipeID,
}: {
  likes: string[];
  userID: string;
  recipeID: string;
}) => {
  const { activeUser } = useGlobalContext();
  const [activeLikes, setActiveLikes] = useState(likes);

  const handleDislike = async () => {
    let currentLikes = [...activeLikes];
    currentLikes = currentLikes.filter((like) => like !== activeUser.uid);
    setActiveLikes(currentLikes);
    editLike(userID, recipeID, currentLikes);
  };
  const handleLike = async () => {
    let currentLikes = [...activeLikes];
    currentLikes = [...currentLikes, activeUser.uid];
    setActiveLikes(currentLikes);
    editLike(userID, recipeID, currentLikes);
  };

  if (activeUser && activeLikes.includes(activeUser.uid)) {
    return (
      <div className="absolute bottom-[10%] right-[10%] flex items-center justify-center">
        <p className="mr-3 text-xl">Smakuje Ci!</p>
        <FaHeart onClick={handleDislike} className="dislikeBtn" />
        <h2 className="ml-3 text-2xl font-bold">{activeLikes.length}</h2>
      </div>
    );
  } else {
    return (
      <div className="absolute bottom-[10%] right-[10%] flex items-center justify-center">
        <p className="mr-3 text-xl">Smaczne?</p>
        <FaRegHeart onClick={handleLike} className="likeBtn" />
        <h2 className="ml-3 text-2xl font-bold">{activeLikes.length}</h2>
      </div>
    );
  }
};

export default LikeControl;
