
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BUTTON_VARIANT } from "../../../constants/variants";
import { logout } from "../../../store/Features/Auth/authSlice";
import Modal from "../../Modal";
import classes from "./index.module.css";

const LogoutDialog = ({openLogoutDailog, handleOpenLogoutDialog}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
      dispatch(logout());
      navigate("/")
    };
  
    const header = "Do you really want to Logout?";
  
    const Footer = () => (
      <>
        <Button
          variant={BUTTON_VARIANT.TEXT}
          className={classes.leaveBtn}
          onClick={handleLogout}
        >
          Logut
        </Button>
        <Button
          variant={BUTTON_VARIANT.TEXT}
          className={classes.cancelBtn}
          onClick={handleOpenLogoutDialog}
        >
          Cancel
        </Button>
      </>
    );
  
    return (
      <Modal
        open={openLogoutDailog}
        handler={handleOpenLogoutDialog}
        classNames={{
          container: classes.logoutContainer,
          header: classes.logoutHeader,
          footer: classes.logoutFooter,
        }}
        size="sm"
        header={header}
        body={null}
        footer={<Footer />}
      />
    );
}

export default LogoutDialog