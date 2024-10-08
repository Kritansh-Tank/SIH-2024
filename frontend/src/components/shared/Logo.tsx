import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginRight: "auto",
      }}
    >
      <Link
        to={"/"}
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <img
          src="logo.jpeg"
          alt="chatbot"
          style={{
            width: "75px",
            height: "75px",
            marginRight: "10px",
            marginTop: "5px",
          }}
        />
        <Typography
          sx={{
            display: { md: "block", sm: "none", xs: "none" },
            textDecoration: "none",
          }}
        >
          <span style={{ fontSize: "20px", color: "black" }}>
            Government of Rajasthan
            <br />
            Department of Technical Education
          </span>
        </Typography>
      </Link>
      <img
          src="Azadi.png"
          alt="slogan"
          style={{
            width: "100px",
            height: "75px",
            marginLeft: "640px",
            marginTop: "5px",
          }}
        />
    </div>
  );
};

export default Logo;
