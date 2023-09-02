import React, { useEffect } from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";

const login = () => {
  const router = useRouter();

  const [{ userInfo, newUser }, dispatch] = useStateProvider() as any[]; // dispatch is a function that allows us to update the state

  // to fix the bug of the user being able to go back to the login page after logging in
  useEffect(() => {
    if (userInfo?.email && !newUser) {
      router.push("/");
    }
  }, [userInfo, newUser, router]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profileImage },
    } = await signInWithPopup(firebaseAuth, provider);

    try {
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });

        if (!data.status) {
          dispatch({ type: reducerCases.SET_NEW_USER, newUser: true });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id: data.id,
              name,
              email,
              profileImage,
              status: "",
            },
          });
          router.push("/onboarding");
        } else {
          const {
            id,
            name,
            email,
            profilePictureUrl: profileImage,
            status,
          } = data;
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id: data.data.id,
              name: data.data.name,
              email: data.data.email,
              profileImage,
              status: "",
            },
          });
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="h-screen w-screen bg-landscape bg-no-repeat bg-cover ">
      <div className="h-screen w-screen flex justify-end backdrop-blur-sm">
        <aside className="h-screen bg-darkGlass_md w-[40%] flex justify-center items-center  ">
          <div className="block">
            <div className="flex justify-center items-center gap-4">
              <Image src="/logo.svg" alt="logo" width={80} height={80} />
              <h1 className="text-white text-3xl font-thin">
                Welcome to TextMe
              </h1>
            </div>

            <button
              className="flex items-center justify-center mt-16 ms-10 gap-7 bg-darkGlass_md p-6 rounded-3xl"
              onClick={handleLogin}
            >
              <FcGoogle className="text-2xl" />
              <span className="text-white text-2xl font-thin">
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
