// BgImage.tsx
import React from "react";

const BgImage = () => {
  return (
    <section id="background image">
      <div
        className="
          fixed
          inset-0
          -z-10
          bg-gradient-to-br 
          from-[rgb(20,20,20)] 
          to-[rgb(3,3,3)]
        "
      ></div>
    </section>
  );
};

export default BgImage;
