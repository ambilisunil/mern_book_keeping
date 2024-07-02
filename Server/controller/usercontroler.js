
const User = require("../models/user");
const RegexEscape = require("regex-escape");
const { OAuth2Client } = require("google-auth-library");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
exports.index = async function (req, res) {
  console.log(res.connection.localAddress);
};
const jwt = require("jsonwebtoken");



const verifyGoogleToken = async (token)=> {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: "Invalid user detected. Please try again" };
  }
}

exports.signup = async (req,res)=> {

  try {

    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);

      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }
      const profile = verificationResponse.payload;
      const user = new User({ name: profile?.name,
        imageUrl: profile?.picture,
        emailId: profile?.email});

      await user.save();
      res.status(201).json({
        message: "Signup was successful",
        user: {
          ...user.toObject(),
          token: jwt.sign({ email: profile?.email }, "myScret", {
            expiresIn: "1d",
          }),
        },
      });
    }
  } catch (error) {
    if(error.keyValue.emailId){
      res.status(400).json({
        statusCode:400,
        message: "Alredy Registerd Plese Login.",
      });
    }
    res.status(500).json({
      message: "An error occurred. Registration failed.",error
    });
  }
}

exports.Login = async (req,res)=> {

  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;
      const existsInDB =  await User.findOne({emailId:profile?.email});

      if (!existsInDB) {
        const user = new User({ name: profile?.name,
          imageUrl: profile?.picture,
          emailId: profile?.email});
  
        await user.save();
        res.status(201).json({
          message: "Signup was successful",
          user: {
            ...user.toObject(),
            token: jwt.sign(user.toObject(), process.env.JWT_SECRET, {
              expiresIn: "1d",
            }),
          },
        });; }

        res.status(201).json({
          message: "Login was successful",
          user: {
           ...existsInDB.toObject(),
            token: jwt.sign(existsInDB.toObject(), process.env.JWT_SECRET, {
              expiresIn: "1d",
            }),
          },
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error?.message || error,    });
      }
    }