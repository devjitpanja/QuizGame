import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useGlobal } from "./Context/Global";
function Completed() {
  const { score } = useGlobal();
  return (
    <div className="bg-[#250b6d] w-screen h-screen flex justify-center items-center">
      <div className="bg-white w-[90%] max-w-[600px]  rounded-lg px-3 py-6 flex flex-col gap-5">
        <div className="w-full flex  flex-col justify-center items-center gap-5">
          <h1 className="text-[2rem] font-[600] text-[#11013b]">
            Your score is
          </h1>
          <p className="font-[500] text-[1.5rem]">{score}</p>
          <button
            className="h-[40px] bg-[#250b6d] w-full rounded-md text-white hover:bg-[#250b6de5]"
            onClick={() => window.location.reload()}
          >
            Play again
          </button>
        </div>
      </div>
    </div>
  );
}

export default Completed;
