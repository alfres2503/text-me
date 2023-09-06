import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GET_ALL_CONTACTS } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";
import ChatListItem from "./ChatListItem";

const ContactsList = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [{}, dispatch] = useStateProvider() as any;

  useEffect(() => {
    const getContacts = async () => {
      try {
        const {
          data: { users },
        } = await axios.get(GET_ALL_CONTACTS);

        console.log(users);
        setAllContacts(users);
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="h-24 flex items-end px-3 py-4">
        <div className="flex items-center gap-12 text-white">
          <BiArrowBack
            className="cursor-pointer text-xl"
            onClick={() =>
              dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE })
            }
          />
        </div>
        <span className="text-white ms-2">New Chat</span>
      </div>
      <div className="bg-zinc-950 h-full  flex-auto overflow-auto custom-scrollbar">
        <div className="flex py-1 px-3 items-center gap-3 h-14">
          <div className="bg-zinc-900 flex items-center gap-5 px-3  py-1 rounded-lg flex-grow ">
            <div>
              <BiSearchAlt2 className="text-white cursor-pointer text-lg" />
            </div>
            <div>
              <input
                type="text"
                placeholder="Search contacts"
                className="bg-transparent text-sm focus:outline-none text-white w-full"
              />
            </div>
          </div>
        </div>
        {Object.entries(allContacts).map(([initialLetter, userList]) => {
          return (
            <div key={Date.now() + initialLetter}>
              <div className="text-white pl-10 py-5">{initialLetter}</div>
              {userList.map((contact) => {
                return (
                  <ChatListItem
                    data={contact}
                    isContactPage={true}
                    key={contact.id}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactsList;
