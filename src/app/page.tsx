import React from "react";
import FlagButton from "@/Components/FlagButton";

const Home = () => {
  return (
    <div className="h-screen flex flex-col text-center pt-20">
      <div className="text-7xl font-bold">Wordle</div>
      <div className="flex gap-6 justify-center items-center mt-32">
        <FlagButton href="EnWord" ImageSrc="/britishflag.png" />
        <FlagButton href="TrWord" ImageSrc="/türkflag.png" />
      </div>
    </div>
  );
};

export default Home;
