import React, { useEffect } from "react";

const Redirect = ({ url }) => {
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return <div className="h-[500px] w-full flex justify-center items-center">
    <div >
<span className="loading loading-dots loading-xs"></span>
<span className="loading loading-dots loading-sm"></span>
<span className="loading loading-dots loading-md"></span>
<span className="loading loading-dots loading-lg"></span>
  </div>
  </div> // Optional loading message
};

export default Redirect;
