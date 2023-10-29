import {
  AiOutlineGithub,
  AiOutlineGoogle,
  AiOutlineLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";

const className = "bg-light-3 rounded-full text-light-2 mx-2 p-1";

export const socialIconList = [
  {
    component: () => <AiOutlineGoogle size={30}></AiOutlineGoogle>,
    handleClick: (e) => console.log(e, "Google link pressed"),
    className: className,
  },
  {
    component: () => <AiOutlineLinkedin size={30}></AiOutlineLinkedin>,
    handleClick: (e) => console.log(e, "linkedin link pressed"),
    className: className,
  },
  {
    component: () => <AiOutlineGithub size={30}></AiOutlineGithub>,
    handleClick: (e) => console.log(e, "github link pressed"),
    className: className,
  },
  {
    component: () => <AiOutlineTwitter size={30}></AiOutlineTwitter>,
    handleClick: (e) => console.log(e, "twitter link pressed"),
    className: className,
  },
];
