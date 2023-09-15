//import { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";

const SearchAndAdd = ({ search, setSearch }) => {
 
  return (
    <div className="flex items-center justify-center gap-3 py-6 border border-t-neutral-400 border-b-neutral-400 ">
      <input
        type="text"
        placeholder="Search Note"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border-2 border-black p-2 rounded-md bg-zinc-100 text-black text-[13px] font-normal font-['Inter'] "
      />

      <button
        className="
      w-10 h-10 bg-white rounded-[5px] border-2 border-black flex items-center justify-center text-3xl text-black"
      >
        <IoMdAdd />
      </button>
    </div>
  );
};

export default SearchAndAdd;
