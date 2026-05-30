import React from "react";

const Heading = ({ text1, text2 }: { text1: string; text2: string }) => {
  return (
    <h2
      className="section-title font-display font-700 leading-tight"
      style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", fontWeight: 700 }}
    >
      {text1} <span className="text-primary-400">{text2}</span>
    </h2>
  );
};

export default Heading;
