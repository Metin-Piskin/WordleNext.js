import React from "react";
import Keyboard from "@/Components/Keyboard";

const TrWord = () => {
  return (
    <div className="h-screen">
      <Keyboard url="http://localhost:3000/api/LanguageTr" />
    </div>
  );
};

export default TrWord;
