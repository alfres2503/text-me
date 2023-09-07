import React from "react";
import {
  BsCheck,
  BsCheck2All,
  BsCheck2Circle,
  BsCheckAll,
} from "react-icons/bs";

const MessageStatus = ({ messageStatus }) => {
  return (
    <>
      {messageStatus === "sent" && <BsCheck className="text-xl " />}
      {messageStatus === "delivered" && <BsCheck2Circle className="text-xl " />}
      {messageStatus === "read" && <BsCheck2All className="text-xl  " />}
    </>
  );
};

export default MessageStatus;
