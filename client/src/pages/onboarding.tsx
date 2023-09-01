import React, { useState } from "react";
import Image from "next/image";
import { useStateProvider } from "@/context/StateContext";
import Input from "@/components/Input";
import Avatar from "@/components/common/Avatar";

function onboarding() {
  const [{ userInfo }] = useStateProvider() as any[];
  const [name, setName] = useState("Fred");
  const [about, setAbout] = useState("");
  //image
  const [image, setImage] = useState("/avatar.svg");

  return (
    <div className="bg-black h-screen w-screen text-white flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <Image src="logo.svg" width={80} height={80} alt="loading" />
        <h1 className="text-3xl font-thin  ms-5">TextMe</h1>
      </div>
      <h2 className="text-3xl mt-9">Create Your Profile</h2>
      <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-center justify-center mt-5 gap-6">
          <Input
            name="Display Name"
            state={name}
            setState={setName}
            label
          ></Input>
          <Input name="About" state={about} setState={setAbout} label></Input>
        </div>
        <div>
          <Avatar type="xl" image={image} setImage={setImage}></Avatar>
        </div>
      </div>
    </div>
  );
}

export default onboarding;
