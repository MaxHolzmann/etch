"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

export default function Home() {
  const ref = useRef(null);

  const [isMouseDown, setMouseDown] = useState(false);
  const [coloredCells, setColoredCells] = useState(new Set());
  const gridElement = document.getElementById("grid");

  const shake = () => {
    setColoredCells(new Set());

    gridElement.classList.add("animate-shake");
    gridElement.classList.add("animate-twice");
    gridElement.classList.add("animate-duration-[400ms]");
  };

  // listening for if mouse is being held down or not
  useEffect(() => {
    const handleMouseDown = () => setMouseDown(true);
    const handleMouseUp = () => setMouseDown(false);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseEnter = (index) => {
    if (isMouseDown) {
      setColoredCells((prev) => new Set(prev).add(index));
      gridElement.classList.remove("animate-shake");
      gridElement.classList.remove("animate-twice");
      gridElement.classList.remove("animate-duration-[400ms]");
    }
  };
  // changing color on the grid element with a ternary operator ensures that we cannot recolor anything besides the grid divs
  const gridSize = 64;
  const gridNumber = gridSize * gridSize;
  const grid = Array(gridNumber)
    .fill(0)
    .map((_, index) => {
      const isColored = coloredCells.has(index);
      return (
        <div
          key={index}
          className={` p-1 select-none ${
            isColored ? "bg-black text-white" : "bg-white text-black"
          }`}
          onMouseEnter={() => handleMouseEnter(index)}
        ></div>
      );
    });
  return (
    <div className="bg-white">
      <header className="text-center text-5xl text-black p-4 mb-10">
        <h1 className="">Etch-a-Sketch</h1>
      </header>
      <div className="flex flex-col justify-center items-center">
        <button
          onClick={shake}
          className="text-white bg-green-400 p-2  mb-5 rounded-xl text-2xl"
        >
          Shake!
        </button>
        <div className="text-center flex justify-center pb-10">
          <div
            id="grid"
            className="grid grid-cols-64 justify-center border-black border-2"
          >
            {grid}
          </div>
        </div>
      </div>
    </div>
  );
}
