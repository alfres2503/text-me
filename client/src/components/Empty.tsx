import Image from "next/image";
import React from "react";

const Empty = () => {
  return (
    <div className=" w-full bg-black flex  flex-col h-[100vh] items-center justify-center">
      <Image src="/logo.svg" alt="logo" height={200} width={200} />
    </div>
  );
};

export default Empty;
