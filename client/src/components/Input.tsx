import React from "react";

function Input({ name, state, setState, label = false }) {
  return (
    <div className="flex gap-1 flex-col">
      {label && (
        <label
          htmlFor={name}
          className="text-white text-xl mb-1 font-thin px-1"
        >
          {name}
        </label>
      )}
      <div>
        <input
          type="text"
          name={name}
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="bg-whiteGlass_sm  w-full text-white text-2xl p-3 backdrop-blur-lg rounded-md"
        />
      </div>
    </div>
  );
}

export default Input;
