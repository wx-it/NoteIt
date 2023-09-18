import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

const SearchAndAdd = ({ search, setSearch, addNote }) => {
  const [newNote, setNewNote] = useState(false);
  const [title, setTitle] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    addNote({ title });
    setTitle("");
    setNewNote(!newNote);
  };

  return (
    <div className=" w-full" >
      <div className="flex items-center justify-center gap-3 py-6 px-2 border border-t-neutral-400 border-b-neutral-400 ">
        <input
          type="text"
          placeholder="Search Note"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 border-black p-2 rounded-md bg-zinc-100 text-black text-[13px] font-normal font-['Inter'] "
        />

        <button
          onClick={() => setNewNote(!newNote)}
          className="
      w-10 h-10 bg-white rounded-[5px] border-2 border-black flex items-center justify-center text-3xl text-black"
        >
          <IoMdAdd />
        </button>
      </div>
      {newNote && (
        <div className="w-full flex items-center justify-center flex-col p-4">
          <input
            type="text"
            placeholder="Title"
            className="border-2 border-black rounded-md text-[14px] p-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="flex items-center justify-end w-full gap-2 py-4">
            <button
              onClick={() => setNewNote(!newNote)}
              className="border-2 border-black py-1 px-3 rounded-md bg-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="border-2 border-black py-1 px-3 rounded-md text-white bg-black"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndAdd;
