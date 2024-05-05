// THIS FILE DOES NOTHING

// create toker and save in cookie

const sendToken = (user, statusCode, res) => {
    const token = user.createJWT();
  
    // options for cookie
    const options = {
		expires: new Date(Date.now() + process.env.JWT_LIFETIME.substring(0,2) * 24 * 60 * 60 * 1000),
		httpOnly: true,
		// secure: false,
		// sameSite: 'lax',
		// domain: 'localhost'
	};
  
    res.status(statusCode).cookie("token", token, options).json({
		// success: true,
		user,
		token,
    });
};
  
module.exports = {sendToken}