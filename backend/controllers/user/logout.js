/**
 * * status: working
 * @description fetch user details if token is availble
 * @method POST /api/user/logout
 * @purpose to logout the user
 */
export const logout = async (req, res) => {
  res.clearCookie("refresh_token");
  res.redirect("/");
  res.status(200).json({
    message: "logout",
  });
};
