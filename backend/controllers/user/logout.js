/**
 * * status: working
 * @description logout user
 * @method POST
 * @endpoint /api/user/logout
 */
export const logout = async (req, res) => {
  res.clearCookie("refresh_token");
  res.redirect("/");
  res.status(200).json({
    message: "logout",
  });
};
