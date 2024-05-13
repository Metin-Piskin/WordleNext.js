"use client";
import React, { useState, useEffect, FC } from "react";
import KeyboardInput from "./KeyboardInput";
import Hexagon from "./Hexagon";

interface KeyboardProps {
  url: string;
}

const Keyboard: FC<KeyboardProps> = ({url}) => {
  const [inputLetters, setInputLetters] = useState<string>("");
  const [targetWord, setTargetWord] = useState<string>("");
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    const countdown = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, []);
console.log(targetWord)
  useEffect(() => {
    if (secondsLeft === 0) {
      setAlert(true);
    }
  }, [secondsLeft]);
  useEffect(() => {
    async function fetchWord() {
      const response = await fetch(url).then(
        (res) => res.json()
      );

      const randomIndex = Math.floor(Math.random() * response.length);
      const randomWord = response[randomIndex];

      setTargetWord(randomWord);
    }

    fetchWord();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && inputLetters.length === targetWord.length) {
        checkWord();
      } else if (e.key === "Backspace") {
        setInputLetters((prevLetters) => prevLetters.slice(0, -1));
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        if (inputLetters.length < targetWord.length) {
          setInputLetters((prevLetters) => prevLetters + e.key.toLowerCase());
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [inputLetters, targetWord]);

  const checkWord = () => {
    const newCorrectLetters = [...correctLetters];
    const enteredWord = inputLetters;

    for (let i = 0; i < targetWord.length; i++) {
      if (
        enteredWord[i] === targetWord[i] &&
        newCorrectLetters[i] !== targetWord[i]
      ) {
        newCorrectLetters[i] = targetWord[i];
      }
    }

    setCorrectLetters(newCorrectLetters);

    if (
      enteredWord.length === targetWord.length &&
      newCorrectLetters.join("") === targetWord
    ) {
      fetchWord();
    }

    setInputLetters("");
  };

  useEffect(() => {
    setCorrectLetters(Array(targetWord.length).fill(""));
  }, [targetWord]);

  async function fetchWord() {
    const response = await fetch(url).then(
      (res) => res.json()
    );

    const randomIndex = Math.floor(Math.random() * response.length);
    const randomWord = response[randomIndex];

    setTargetWord(randomWord);
    setSecondsLeft(secondsLeft + 15);
    setScore(score + targetWord.length * 5);
  }

  return (
    <>
      {alert ? (
        <div className="h-screen flex flex-col justify-center items-center gap-10">
          <div className="text-5xl">Süre Bitti</div>
          <div className="text-5xl">{score}</div>
          <div
            className="bg-yellow-400 p-3 cursor-pointer rounded-lg text-lg"
            onClick={() => location.reload()}
          >
            Tekrar Oyna
          </div>
        </div>
      ) : (
        <div className=" h-screen">
          <div style={{ position: "fixed", top: "10px", right: "10px" }}>
            Geri Sayım: {secondsLeft} saniye
          </div>
          <div style={{ position: "fixed", top: "10px", left: "10px" }}>
            Score: {score}
          </div>
          <div className="flex items-center justify-center gap-5 pt-20">
            {targetWord.split("").map((targetLetter, index) => {
              const correctLetterIndex = correctLetters.findIndex(
                (letter, i) =>
                  i % targetWord.length === index && letter === targetLetter
              );
              return (
                <Hexagon
                  key={index}
                  Letter={correctLetterIndex !== -1 ? targetLetter : "#"}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-5 mt-40">
            {inputLetters.split("").map((letter, index) => (
              <KeyboardInput key={index} Letter={letter} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Keyboard;
