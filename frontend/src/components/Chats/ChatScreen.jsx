import { useEffect, useRef } from "react";
import Form from "../Form/Form";
import MessageCard from "./MessageCard";

export default function ChatScreen({ className }) {
  const buildMessageClassName = (isSender) => {
    let defaultClassName = "border-2 mb-4 rounded-md ";
    if (isSender) defaultClassName += "self-start";
    else defaultClassName += "self-end";
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
    <div className={`p-2 max-h-screen flex flex-col flex-1 ${className}`}>
      <div className="py-2 mb-4 border-2 text-md font-semibold">
        Channel Name
      </div>
      <div className="overflow-y-auto flex flex-col">
        {messages.map(({ senderName, isSender, timeStamp, message }, index) => {
          return (
            <MessageCard
              key={index}
              className={buildMessageClassName(isSender)}
              senderName={senderName}
              timeStamp={timeStamp}
              message={message}
            ></MessageCard>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <Form
        className="w-full flex flex-row items-center gap-4"
        fields={formfFields}
        buttonConfigs={{
          type: "submit",
          label: "Save",
          className: "mt-1 mb-2 py-2 px-4 bg-blue-500 rounded-lg text-white",
        }}
        handleSubmit={(e) => console.log(e)}
      ></Form>
    </div>
  );
}

const containerClassName = "";
const className = "rounded-md";
const formfFields = [
  {
    type: "text",
    label: "",
    name: "chatBox",
    id: "chat",
    defaultValue: "",
    containerClassName: containerClassName,
    className: className,
    inputClassName: "p-2 w-full outline-none",
    placeholder: "Send Message",
    required: true,
    validation: {
      required: {
        value: true,
        message: "Email is required",
      },
    },
  },
];

const messages = [
  {
    senderName: "Alice",
    isSender: true,
    timeStamp: 1634385600,
    message: "Hello there!",
  },
  {
    senderName: "Bob",
    isSender: false,
    timeStamp: 1634385900,
    message: "Hi Alice, how are you?",
  },
  {
    senderName: "Alice",
    isSender: true,
    timeStamp: 1634386200,
    message: "I'm doing well, thanks for asking!",
  },
  {
    senderName: "Charlie",
    isSender: false,
    timeStamp: 1634386500,
    message: "Hey, what's up?",
  },
  {
    senderName: "Alice",
    isSender: true,
    timeStamp: 1634386800,
    message: "Not much, just working on a project.",
  },
  {
    senderName: "David",
    isSender: false,
    timeStamp: 1634387100,
    message: "That sounds interesting. Tell me more.",
  },
  {
    senderName: "Alice",
    isSender: true,
    timeStamp: 1634387400,
    message: "Sure, it's about artificial intelligence.",
  },
  {
    senderName: "Eve",
    isSender: false,
    timeStamp: 1634387700,
    message: "I love AI! What's the project's goal?",
  },
  {
    senderName: "Alice",
    isSender: true,
    timeStamp: 1634388000,
    message: "We're developing a chatbot.",
  },
  {
    senderName: "Frank",
    isSender: false,
    timeStamp: 1634388300,
    message: "That sounds cool! What's it called?",
  },
  {
    senderName: "Alice",
    isSender: true,
    timeStamp: 1634388600,
    message: "We haven't decided on a name yet.",
  },
  {
    senderName: "Grace",
    isSender: false,
    timeStamp: 1634388900,
    message: "Let me know when it's ready!",
  },
  {
    senderName: "Alice",
    isSender: true,
    timeStamp: 1634389200,
    message: "I will, thanks!",
  },
  {
    senderName: "Harry",
    isSender: false,
    timeStamp: 1634389500,
    message: "Bye for now!",
  },
  {
    senderName: "Alice",
    isSender: true,
    timeStamp: 1634389800,
    message: "Goodbye!",
  },
  {
    senderName: "Isabel",
    isSender: false,
    timeStamp: 1634390100,
    message: "Hello there!",
  },
  {
    senderName: "Alice",
    isSender: true,
    timeStamp: 1634390400,
    message: "Hi Isabel, how are you?",
  },
  {
    senderName: "Jacob",
    isSender: false,
    timeStamp: 1634390700,
    message: "I'm doing well, thanks for asking!",
  },
  {
    senderName: "Alice",
    isSender: true,
    timeStamp: 1634391000,
    message: "Hey, what's up?",
  },
  {
    senderName: "Kevin",
    isSender: false,
    timeStamp: 1634391300,
    message: "Not much, just working on a project.",
  },
  {
    senderName: "Alice",
    isSender: true,
    timeStamp: 1634391600,
    message: "That sounds interesting. Tell me more.",
  },
  {
    senderName: "Linda",
    isSender: false,
    timeStamp: 1634391900,
    message: "I love AI! What's the project's goal?",
  },
  {
    senderName: "Alice",
    isSender: true,
    timeStamp: 1634392200,
    message: "We're developing a chatbot.",
  },
  {
    senderName: "Mike",
    isSender: false,
    timeStamp: 1634392500,
    message: "That sounds cool! What's it called?",
  },
  {
    senderName: "Alice",
    isSender: true,
    timeStamp: 1634392800,
    message: "We haven't decided on a name yet.",
  },
  {
    senderName: "Nancy",
    isSender: false,
    timeStamp: 1634393100,
    message: "Let me know when it's ready!",
  },
];
