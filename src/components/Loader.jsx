import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-24 md:h-24 h-24 w-24 aspect-square rounded-full">
        <div className="rounded-full h-full w-full bg-slate-100 dark:bg-[#14213d] background-blur-md"></div>
      </div>
    </div>
  );
};

export default Loader;
