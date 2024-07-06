import { Router } from "express";
import { fetchUsers } from "../controllers/user/fetchUsers.js";
import { loginUser } from "../controllers/user/loginUser.js";
import { logout } from "../controllers/user/logout.js";
import { refreshToken } from "../controllers/user/refreshToken.js";
import { registerUser } from "../controllers/user/registerUser.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

/** status: Working */
router.post("/register", registerUser);

/** status: Working */
router.post("/login", loginUser);

/** status: Working */
router.get("/fetchUsers", protect, fetchUsers);

/** status: Working */
router.get("/refreshToken", refreshToken);

/** status: Working */
router.post("/logout", logout);

export default router;
