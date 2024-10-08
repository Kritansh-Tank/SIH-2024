import { Box, useMediaQuery, useTheme } from "@mui/material";
import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/footer/Footer";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
          backgroundColor: "transparent",
        }}
      >
        <Box>
          <TypingAnim />
        </Box>
        <Box sx={{ display: "flex", mx: "auto" }}>
          <img
            src="pic.jpg"
            alt="cover"
            style={{
              display: "flex",
              margin: "auto",
              width: isBelowMd ? "80%" : "60%",
              borderRadius: 20,
              marginTop: 20,
              marginBottom: 20,
              padding: 10,
            }}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
