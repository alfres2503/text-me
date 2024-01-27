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
      {messageStatus === "delivered" && <BsCheckAll className="text-xl " />}
      {messageStatus === "read" && (
        <BsCheckAll className="text-xl text-green-500  " />
      )}
      {/* {messageStatus === "sent" && <span className="text-xs ">sent</span>}
      {messageStatus === "delivered" && (
        <span className="text-xs ">delivered</span>
      )}
      {messageStatus === "read" && <span className="text-xs  ">read</span>} */}
    </>
  );
};

export default MessageStatus;
