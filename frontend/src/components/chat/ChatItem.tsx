import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}

const speakText = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "hi-IN";
  window.speechSynthesis.speak(utterance);
};

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();

  return role === "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "transparent",
        gap: 2,
        borderRadius: 2,
        my: 1,
      }}
    >
      <Avatar
        sx={{
          ml: "0",
          bgcolor: "transparent",
        }}
      >
        <img src="chatbot.png" alt="chatbot" width={"30px"} />
      </Avatar>

      <Box>
        {!messageBlocks && (
          <Typography
            sx={{ fontSize: "20px", color: "black", marginTop: "4px" }}
            onClick={() => speakText(content)}
          >
            {content}
          </Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block, index) => {
            if (isCodeBlock(block)) {
              return (
                <SyntaxHighlighter
                  key={index}
                  style={coldarkDark}
                  language="javascript"
                >
                  {block}
                </SyntaxHighlighter>
              );
            } else {
              return (
                <Typography
                  key={index}
                  sx={{ fontSize: "20px", color: "black", marginTop: "4px" }}
                  onClick={() => speakText(block)}
                >
                  {block}
                </Typography>
              );
            }
          })}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "transparent",
        gap: 2,
        borderRadius: 2,
        flexDirection: "row-reverse",
      }}
    >
      <Avatar
        sx={{
          ml: "0",
          bgcolor: "#02040F",
          color: "white",
          fontWeight: "600",
        }}
      >
        {auth?.user?.name[0]}
        {auth?.user?.name.split(" ")[1][0]}
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography
            sx={{ fontSize: "20px", color: "black", marginTop: "4px" }}
          >
            {content}
          </Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block, index) => {
            if (isCodeBlock(block)) {
              return (
                <SyntaxHighlighter
                  key={index}
                  style={coldarkDark}
                  language="javascript"
                >
                  {block}
                </SyntaxHighlighter>
              );
            } else {
              return (
                <Typography
                  key={index}
                  sx={{ fontSize: "20px", color: "black", marginTop: "4px" }}
                >
                  {block}
                </Typography>
              );
            }
          })}
      </Box>
    </Box>
  );
};

export default ChatItem;
