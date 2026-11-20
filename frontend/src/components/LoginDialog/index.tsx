import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { FiClock, FiHome, FiLock, FiLogIn } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./index.module.css";

type AuthPromptReason = "expired" | "unauthenticated";

interface LoginDialogProps {
  open?: boolean;
  reason?: AuthPromptReason;
  onClose?: () => void;
}

const COPY_BY_REASON: Record<
  AuthPromptReason,
  {
    title: string;
    subtitle: string;
    description: string;
    primaryCta: string;
  }
> = {
  expired: {
    title: "Session Expired",
    subtitle: "Authentication required",
    description:
      "For your security, your session has timed out due to inactivity. Please sign in again to pick up right where you left off.",
    primaryCta: "Log In Again",
  },
  unauthenticated: {
    title: "Sign In Required",
    subtitle: "Account access needed",
    description:
      "You need to be signed in to access this page or continue. Sign in to your account and we'll bring you right back here.",
    primaryCta: "Sign In",
  },
};

const LoginDialog = ({
  open = true,
  reason = "expired",
  onClose,
}: LoginDialogProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const copy = COPY_BY_REASON[reason];

  const handleClose = () => {
    onClose?.();
  };

  const redirectToHome = () => {
    handleClose();
    navigate("/");
  };

  const redirectToLogin = () => {
    handleClose();
    navigate("/login", {
      state: {
        from: `${location.pathname}${location.search}`,
      },
    });
  };

  return (
    <Dialog
      open={open}
      handler={handleClose}
      size="sm"
      dismiss={{ enabled: false }}
      className={classes.loginDialog}
    >
      <DialogHeader className={classes.loginDialogHeader}>
        <div className={classes.iconBadge} aria-hidden="true">
          {reason === "expired" ? <FiClock size={22} /> : <FiLock size={22} />}
        </div>
        <div>
          <h2 className={classes.title}>{copy.title}</h2>
          <p className={classes.subtitle}>{copy.subtitle}</p>
        </div>
      </DialogHeader>

      <DialogBody className={classes.loginDialogBody}>
        <p>{copy.description}</p>
      </DialogBody>

      <DialogFooter className={classes.loginDialogFooter}>
        <Button
          variant="outlined"
          onClick={redirectToHome}
          className={classes.cancelBtn}
          ripple={false}
        >
          <FiHome size={16} />
          <span>Go to Home</span>
        </Button>

        <Button
          onClick={redirectToLogin}
          className={classes.navigateBtn}
          ripple={false}
        >
          <FiLogIn size={16} />
          <span>{copy.primaryCta}</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default LoginDialog;