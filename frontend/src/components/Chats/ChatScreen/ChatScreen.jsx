import ChannelHeader from "./ChannelHeader";
import DisplayChats from "./DisplayChats";
import SendMsgBtn from "./SendMsgBtn";

export default function ChatScreen({ className, toggleSideBar }) {
  return (
    <div className={`max-h-screen flex flex-col flex-1 bg-dark-1 ${className}`}>
      <ChannelHeader
        channelName={""}
        toggleSideBar={toggleSideBar}
      ></ChannelHeader>
      <DisplayChats messages={messages}></DisplayChats>
      <SendMsgBtn></SendMsgBtn>
    </div>
  );
}

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
    senderName: "Ayush",
    timeStamp: 1634385900,
    message: "I'm good, Vinit. How about you?",
  },
  {
    senderName: "Ayush",
    timeStamp: 1634385900,
    message: "I'm good, Vinit. How about you?",
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
    senderName: "Vinit",
    timeStamp: 1634386800,
    message: "What have you been up to lately?",
  },
  {
    senderName: "Vinit",
    timeStamp: 1634386800,
    message: "What have you been up to lately?",
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
