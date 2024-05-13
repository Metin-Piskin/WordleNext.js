import React from "react";
import Keyboard from "@/Components/Keyboard";

const TrWord = () => {
  return (
    <div className="h-screen">
      <Keyboard url="https://wordle-next-js-pi.vercel.app/api/LanguageTr" />
    </div>
  );
};

export default TrWord;
