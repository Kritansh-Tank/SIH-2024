import { TypeAnimation } from "react-type-animation";

const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        "AI-Powered Student Assistance Chatbot",
        1000,
        "Department of Technical Education",
        2000,
        "Government of Rajasthan",
        1500,
      ]}
      speed={50}
      style={{
        fontSize: "30px",
        color: "black",
        display: "inline-block",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;
