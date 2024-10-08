import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { IoMdMic } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { LuPlusCircle } from "react-icons/lu";
import { FaLanguage } from "react-icons/fa";
import { Menu, MenuItem } from "@mui/material";

type Message = {
  role: "user" | "assistant";
  content: string;
};
const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [transcript, setTranscript] = useState<string>("");

  // const startListening = () => {
  //   const SpeechRecognition =
  //     window.SpeechRecognition || (window as any).webkitSpeechRecognition;
  //   const recognition = new SpeechRecognition();

  //   recognition.interimResults = true;
  //   recognition.lang = selectedLanguage === "Hindi" ? "hi-IN" : "en-US";

  //   recognition.onresult = (event: any) => {
  //     const currentTranscript = event.results[event.resultIndex][0].transcript;
  //     setTranscript(currentTranscript);
  //   };

  //   recognition.onend = () => {
  //     handleSubmit();
  //   };

  //   recognition.start();
  // };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    handleMenuClose();
  };

  const handleSubmit = async () => {
    const content = transcript || inputRef.current?.value || "";
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setTranscript("");

    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);
  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 0,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "85%",
            height: "79.5vh",
            bgcolor: "#02040F",
            borderRadius: 2,
            flexDirection: "column",
            mx: 3,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            sx={{
              display: "flex",
              width: "200px",
              justifyContent: "left",
              alignItems: "left",
              border: "1px solid white",
              borderRadius: 1,
              marginTop: "50px",
              backgroundColor: "black",
              color: "white",
              transition: "background-color 0.3s, color 0.3s",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            <LuPlusCircle
              style={{
                width: "25px",
                height: "25px",
                color: "inherit",
                marginLeft: "3px",
              }}
            />
            <Typography
              sx={{
                marginLeft: 1,
                color: "inherit",
                fontWeight: 500,
              }}
            >
              New Chat
            </Typography>
          </IconButton>
          <IconButton
            onClick={handleDeleteChats}
            sx={{
              display: "flex",
              width: "200px",
              justifyContent: "left",
              alignItems: "left",
              border: "1px solid white",
              borderRadius: 1,
              marginTop: "50px",
              backgroundColor: "black",
              color: "white",
              transition: "background-color 0.3s, color 0.3s",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            <MdDelete
              style={{
                width: "25px",
                height: "25px",
                color: "inherit",
              }}
            />
            <Typography
              sx={{
                marginLeft: 1,
                color: "inherit",
                fontWeight: 500,
              }}
            >
              Delete Chats
            </Typography>
          </IconButton>
          <IconButton
            onClick={handleMenuClick}
            sx={{
              display: "flex",
              width: "200px",
              justifyContent: "left",
              alignItems: "left",
              border: "1px solid white",
              borderRadius: 1,
              marginTop: "50px",
              backgroundColor: "black",
              color: "white",
              transition: "background-color 0.3s, color 0.3s",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            <FaLanguage
              style={{
                width: "30px",
                height: "30px",
                color: "inherit",
                marginLeft: "6px",
              }}
            />
            <Typography
              sx={{ marginLeft: 1, color: "inherit", fontWeight: 500 }}
            >
              {selectedLanguage}
            </Typography>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5 + 8,
                width: "20ch",
              },
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem
              onClick={() => handleLanguageChange("English")}
              sx={{ color: "#02040F" }}
            >
              English
            </MenuItem>
            <MenuItem
              onClick={() => handleLanguageChange("Hindi")}
              sx={{ color: "#02040F" }}
            >
              Hindi
            </MenuItem>
          </Menu>
          <Avatar
            sx={{
              marginTop: "auto",
              bgcolor: "#F8F8FF",
              color: "#02040F",
              fontWeight: 700,
              borderRadius: 1,
              marginBottom: "20px",
              width: "200px",
            }}
          >
            {auth?.user?.name || "User"}
          </Avatar>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "30px",
            color: "black",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          Student Assistance Chatbot
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            //@ts-ignore
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "#F9FAFA",
            display: "flex",
            margin: "auto",
            border: "2px solid #000",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            /*value={transcript}*/
            onChange={() => {}}
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "black",
              fontSize: "20px",
            }}
            placeholder="Type a new message here"
          />
          <IconButton /*onClick={startListening}*/ sx={{ color: "black" }}>
            <IoMdMic />
          </IconButton>
          <IconButton onClick={handleSubmit} sx={{ color: "black", mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
