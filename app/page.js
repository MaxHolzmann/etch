"use client";
import Image from "next/image";
import { useRef } from "react";

export default function Home() {
  const ref = useRef(null);

  const changeColor = (e) => {
    console.log(e._targetInst.memorizedProps);
  };

  let gridNumber;
  gridNumber = 64;
  const grid = Array(gridNumber)
    .fill(0)
    .map((_, index) => (
      <div
        key={index}
        className="border-black border-2 text-black bg-white p-5 hover:bg-black"
        onMouseEnter={changeColor}
      >
        {index + 1}
      </div>
    ));
  return (
    <div className="bg-white">
      <header className="text-center text-5xl text-black p-4 mb-10">
        <h1 className="">Etch-a-Sketch</h1>
      </header>
      <div className="text-center flex justify-center pb-10">
        <div className="grid grid-cols-8">{grid}</div>
      </div>
    </div>
  );
}
