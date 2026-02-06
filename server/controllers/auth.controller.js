const { findById } = require("../repositories/user.repository");
const authService = require("../services/auth.service");
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../services/jwt.helper");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const result = await authService.login(username, password);
    const accessToken = generateAccessToken(result);
    const refreshToken = generateRefreshToken(result);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,        
      sameSite: "lax",      
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
      accessToken: accessToken
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "Invalid credentials",
    });
  }
};

exports.refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken)
    return res.status(400).json({ message: "Refresh token missing" });

  try {
    const decoded = verifyRefreshToken(refreshToken, REFRESH_SECRET);

    const user = await findById(decoded.id);
    if (!user)
      return res.status(401).json({ message: "Invalid refresh token" });

    const newAccessToken = jwt.sign(
      { id: user._id, username: user.username },
      ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    return res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (err) {
    return res.status(403).json({ message: "Refresh token expired" });
  }
};
