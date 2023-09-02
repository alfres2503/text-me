import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useStateProvider } from "@/context/StateContext";
import Input from "@/components/Input";
import Avatar from "@/components/common/Avatar";
import { ONBOARD_USER_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import { reducerCases } from "@/context/constants";
import { useRouter } from "next/router";

function onboarding() {
  const router = useRouter();
  const [{ userInfo, newUser }, dispatch] = useStateProvider() as any[];
  const [name, setName] = useState("" || userInfo?.name);
  const [about, setAbout] = useState("");
  //image
  const [image, setImage] = useState("/avatar.svg");

  useEffect(() => {
    if (!newUser && !userInfo?.email) {
      router.push("/login");
    } else if (!newUser && userInfo?.email) {
      router.push("/");
    }
  }, [newUser, userInfo, router]);

  const onboardUserHandler = async () => {
    if (validateDetails()) {
      const email = userInfo.email;
      try {
        const { data } = await axios.post(ONBOARD_USER_ROUTE, {
          name,
          about,
          email,
          image,
        });

        if (data.status) {
          dispatch({ type: reducerCases.SET_NEW_USER, newUser: true });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              name,
              email,
              image,
              status: about,
            },
          });
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateDetails = () => {
    if (name.length < 3) {
      return false;
    }
    return true;
  };

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
          <div className="flex items-center justify-center ">
            <button
              className="flex items-center justify-end mt-16 ms-10 gap-7 bg-black border p-5 rounded-xl"
              onClick={onboardUserHandler}
            >
              Create Profile
            </button>
          </div>
        </div>
        <div>
          <Avatar type="xl" image={image} setImage={setImage}></Avatar>
        </div>
      </div>
    </div>
  );
}

export default onboarding;
