import React from "react";

const ChatContainer = () => {
  return (
    <div className="h-[80vh] w-full relative flex-grow overflow-auto custom-scrollbar">
      {/* este div debería tener las clases h-full w-full pero esto genera problemas */}
      <div className="bg-zinc-950 bg-fixed  opacity-5 fixed left-0 top-0 z-0">
        <div className="flex w-full">
          <div className="flex flex-col justify-end w-full gap-1 overflow-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
