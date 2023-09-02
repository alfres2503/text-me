import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const CapturePhoto = ({ setImage, hideCapturePhoto }) => {
  const videoRef = React.useRef(null);

  const capturePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0, 400, 300);
    setImage(canvas.toDataURL("image/jpeg"));
    hideCapturePhoto(false);
  };

  useEffect(() => {
    let stream;
    const startCamera = async () => {
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      videoRef.current.srcObject = stream;
    };
    startCamera();
    return () => {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, []);

  return (
    <div className="absolute h-4/6 w-2/6 top-1/4 left-1/3 bg-darkGlass_md rounded-lg pt-2 flex items-center justify-center">
      <div className="flex flex-col gap-4 w-full justify-center ">
        <div
          className="pt-0 mb-3 pe-3 cursor-pointer flex items-end justify-end"
          onClick={() => hideCapturePhoto(false)}
        >
          <IoClose className="h-10 w-10 cursor-pointer"></IoClose>
        </div>
        <div className="flex justify-center">
          <video
            id="video"
            width="400"
            autoPlay
            ref={videoRef}
            className="rounded-lg"
            style={{ transform: "scaleX(-1)" }}
          ></video>
        </div>
        <div className="w-full flex justify-center items-center">
          <button
            className="h-16 w-16 bg-white rounded-full cursor-pointer border-8 border-teal-200 p-2"
            onClick={capturePhoto}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default CapturePhoto;
