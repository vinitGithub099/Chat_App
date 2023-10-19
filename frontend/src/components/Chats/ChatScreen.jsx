import { useEffect, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import Form from "../Form/Form";
import MessageCard from "./MessageCard";

export default function ChatScreen({ className, toggleSideBar }) {
  return (
    <div className={`p-2 max-h-screen flex flex-col flex-1 ${className}`}>
      <ChannelHeader
        channelName={""}
        toggleSideBar={toggleSideBar}
      ></ChannelHeader>
      <DisplayChatsComponent messages={messages}></DisplayChatsComponent>
      <SendMessageComponent></SendMessageComponent>
    </div>
  );
}

function ChannelHeader({ channelName, toggleSideBar }) {
  return (
    <div className="py-2 mb-4 border-2 flex flex-row items-center">
      <div className="mobile:hidden py-1 pr-4" onClick={toggleSideBar}>
        <GiHamburgerMenu size={20}></GiHamburgerMenu>
      </div>
      <div className="text-xl font-semibold">
        {channelName ? channelName : "Channel Name"}
      </div>
    </div>
  );
}

function DisplayChatsComponent({ messages }) {
  const userName = useSelector((state) => state.auth.name);

  const buildMessageClassName = (senderName) => {
    let defaultClassName = "border-2 mb-4 rounded-md ";
    if (userName == senderName) defaultClassName += "self-end";
    else defaultClassName += "self-start";
    return defaultClassName;
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className="overflow-y-auto flex flex-col">
      {messages.map(({ senderName, timeStamp, message }, index) => {
        return (
          <MessageCard
            key={index}
            className={buildMessageClassName(senderName)}
            senderName={senderName}
            timeStamp={timeStamp}
            message={message}
          ></MessageCard>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}

function SendMessageComponent() {
  return (
    <Form
      className="w-full flex flex-row items-center gap-2"
      fields={formFields}
      buttonConfigs={{
        type: "submit",
        label: "Send",
        className: "py-2 px-4 bg-blue-500 rounded-lg text-white",
      }}
      handleSubmit={(e) => console.log(e)}
    ></Form>
  );
}

const containerClassName = "";
const className = "rounded-md";
const formFields = [
  {
    type: "text",
    label: "",
    name: "chatBox",
    id: "chat",
    defaultValue: "",
    containerClassName: containerClassName,
    className: className,
    inputClassName: "p-2 w-full outline-none rounded-md",
    placeholder: "Send Message",
    required: true,
  },
];

const messages = [
  {
    senderName: "Vinit",
    timeStamp: 1634385600,
    message: "Hey Ayush, how's it going?",
  },
  {
    senderName: "Ayush",
    timeStamp: 1634385900,
    message: "I'm good, Vinit. How about you?",
  },
  {
    senderName: "Vinit",
    timeStamp: 1634386200,
    message:
      "I'm doing well, thanks!I'm doing well, thanks!I'm doing well, thanks!I'm doing well, thanks!I'm doing well, thanks!I'm doing well, thanks!I'm doing well, thanks!I'm doing well, thanks!I'm doing well, thanks!I'm doing well, thanks!I'm doing well, thanks!I'm doing well, thanks!I'm doing well, thanks!I'm doing well, thanks!I'm doing well, thanks!I'm doing well, thanks!I'm doing well, thanks!I'm doing well, thanks!I'm doing well, thanks!I'm doing well, thanks!I'm doing well, thanks!I'm doing well, thanks!",
  },
  {
    senderName: "Ayush",
    timeStamp: 1634386500,
    message: "That's great to hear.",
  },
  {
    senderName: "Vinit",
    timeStamp: 1634386800,
    message: "What have you been up to lately?",
  },
  {
    senderName: "Ayush",
    timeStamp: 1634387100,
    message: "I've been working on a new project at work.",
  },
  {
    senderName: "Vinit",
    timeStamp: 1634387400,
    message: "Tell me more about it.",
  },
  {
    senderName: "Ayush",
    timeStamp: 1634387700,
    message: "It's a software development project for a client.",
  },
  {
    senderName: "Vinit",
    timeStamp: 1634388000,
    message: "Sounds interesting. What technologies are you using?",
  },
  {
    senderName: "Ayush",
    timeStamp: 1634388300,
    message: "We're primarily using Python and Django for the backend.",
  },
  {
    senderName: "Vinit",
    timeStamp: 1634388600,
    message: "Nice! Python is a great choice for web development.",
  },
  {
    senderName: "Ayush",
    timeStamp: 1634388900,
    message: "Yes, it's versatile and has a strong ecosystem.",
  },
  {
    senderName: "Vinit",
    timeStamp: 1634389200,
    message: "Absolutely. Good luck with your project!",
  },
  {
    senderName: "Ayush",
    timeStamp: 1634389500,
    message: "Thanks, Vinit! How about you? Any exciting projects?",
  },
  {
    senderName: "Vinit",
    timeStamp: 1634389800,
    message: "I'm working on a mobile app for a startup.",
  },
  {
    senderName: "Ayush",
    timeStamp: 1634390100,
    message: "That sounds cool. What's it about?",
  },
  {
    senderName: "Vinit",
    timeStamp: 1634390400,
    message: "It's a social networking app.",
  },
  {
    senderName: "Ayush",
    timeStamp: 1634390700,
    message: "Interesting. I'd love to hear more about it.",
  },
  {
    senderName: "Vinit",
    timeStamp: 1634391000,
    message: "Sure, I'll fill you in later. Got to run for a meeting now.",
  },
  {
    senderName: "Ayush",
    timeStamp: 1634391300,
    message: "No problem. Catch you later, Vinit!",
  },
];
