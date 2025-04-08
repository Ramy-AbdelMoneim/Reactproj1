import React from "react";
export default function Search({ readtext, search, inputtext }) {
  return (
    <div className="flex gap-1.5">
      <input
        type="text"
        className="border rounded-full text-center"
        value={inputtext}
        onChange={(e) => readtext(e.target.value)}
      />
      <button className="cursor-pointer" onClick={() => search()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </div>
  );
}
