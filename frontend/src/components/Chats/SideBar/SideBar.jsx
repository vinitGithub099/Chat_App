import SearchChat from "./SearchChat";
import SideBarHeader from "./SideBarHeader";
import UserInfo from "./UserInfo";

export default function SideBar({ className, sidebarOpen, toggleSideBar }) {

  return (
    <>
      {/* tablet and desktop view */}
      <div
        className={`max-sm:hidden w-auto h-screen max-sm:fixed z-10 flex flex-row ${className}`}
      >
        <div className="w-80 flex flex-col max-sm:rounded-lg py-2 bg-dark-2">
          <SideBarHeader toggleSideBar={toggleSideBar}></SideBarHeader>
          <SearchChat toggleSideBar={toggleSideBar}></SearchChat>
          <UserInfo></UserInfo>
        </div>
        <div className="sm:hidden flex flex-1 opacity-60 bg-dark-2"></div>
      </div>

      {/* mobile view */}
      {sidebarOpen ? (
        <div
          className={`sm:hidden max-sm:w-full h-screen max-sm:fixed z-10 flex flex-row ${className}`}
        >
          <div className="w-80 flex flex-col max-sm:rounded-lg py-2 bg-dark-2 rounded-tr-lg rounded-br-lg">
            <SideBarHeader toggleSideBar={toggleSideBar}></SideBarHeader>
            <SearchChat toggleSideBar={toggleSideBar}></SearchChat>
            <UserInfo></UserInfo>
          </div>
          <div className="sm:hidden flex flex-1 opacity-60 bg-dark-2"></div>
        </div>
      ) : null}
    </>
  );
}
