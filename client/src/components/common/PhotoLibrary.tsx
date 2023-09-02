import React from "react";
import { IoClose } from "react-icons/io5";
import Image from "next/image";

const PhotoLibrary = ({ setImage, hidePhotoLibrary }) => {
  const images = [
    "avatars/1.svg",
    "avatars/2.svg",
    "avatars/3.svg",
    "avatars/4.svg",
    "avatars/5.svg",
    "avatars/6.svg",
    "avatars/7.svg",
    "avatars/8.svg",
    "avatars/9.svg",
  ];

  return (
    <div className="fixed top-0 left-0 max-h-[100vh] max-w-[100vw] h-full w-full flex justify-center items-center ">
      <div className="h-max w-max bg-darkGlass_sm backdrop-blur-sm gap-6 rounded-lg p-4">
        <div
          className="pt-0 mb-3 pe-1 cursor-pointer flex items-end justify-end"
          onClick={() => hidePhotoLibrary(false)}
        >
          <IoClose className="h-10 w-10 cursor-pointer"></IoClose>
        </div>
        <div className="grid grid-cols-3 justify-center items-center gap-5">
          {images.map((image, index) => (
            <div
              onClick={() => {
                setImage(images[index]);
                hidePhotoLibrary(false);
              }}
            >
              <div className="h-24 w-24 cursor-pointer relative">
                <Image src={image} alt="avatar" fill />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoLibrary;
