import React from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import { useRouter } from "next/router";

const login = () => {
  const router = useRouter();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profileImage },
    } = await signInWithPopup(firebaseAuth, provider);

    try {
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });

        console.log(data);

        if (!data.status) {
          router.push("/onboarding");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="h-screen w-screen bg-landscape bg-no-repeat bg-cover ">
      <div className="h-screen w-screen flex justify-end backdrop-blur-lg">
        <aside className="h-screen bg-darkGlass_md w-[40%] flex justify-center items-center  ">
          <div className="block">
            <div className="flex justify-center items-center gap-8">
              <Image
                src="/IMessage_logo.svg"
                alt="logo"
                width={200}
                height={200}
              />
              <h1 className="text-white text-7xl font-thin">
                Welcome to TextMe
              </h1>
            </div>

            <button
              className="flex items-center justify-center mt-32 ms-10 gap-7 bg-darkGlass_md p-12 rounded-3xl"
              onClick={handleLogin}
            >
              <FcGoogle className="text-7xl" />
              <span className="text-white text-7xl font-thin">
                Sing in with Google
              </span>
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default login;
