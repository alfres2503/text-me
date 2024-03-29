import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";

const SearchBar = () => {
  const [{ contactSearch }, dispatch] = useStateProvider() as any;

  return (
    <div className="bg-zinc-950 flex py-3 pl-5 items-center gap-3 h-14">
      <div className="bg-zinc-900 flex items-center gap-5 px-3  py-1 rounded-lg flex-grow ">
        <div>
          <BiSearchAlt2 className="text-white cursor-pointer text-lg" />
        </div>
        <div>
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="bg-transparent text-sm focus:outline-none text-white w-full"
            value={contactSearch}
            onChange={(e) =>
              dispatch({
                type: reducerCases.SET_CONTACTS_SEARCH,
                contactSearch: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="pr-5 pl-3">
        <BsFilter className="text-white cursor-pointer text-lg" />
      </div>
    </div>
  );
};

export default SearchBar;
