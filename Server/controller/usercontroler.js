
const User = require("../models/user");
const RegexEscape = require("regex-escape");
const { OAuth2Client } = require("google-auth-library");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
exports.index = async function (req, res) {
  console.log(res.connection.localAddress);
};
const jwt = require("jsonwebtoken");

exports.create_User = async function (req, res) {
  try {
    
    const user = new User(req.body);

        await user.save();
        res.status(201).send({ statusCode: 201, User,message:"User added" });
  } catch (e) {
    console.log(e)
    res.status(400).send({ statusCode: 400, error: e });
  }
};

exports.edit_User = async function (req, res) {

  try {
    User.findOneAndUpdate({_id:req.params.id}, {$set:req.body}, {new: true}, (err, doc) => {
      if (err) {
          console.log("Something wrong when updating data!");
      }
      res.send({ statusCode: 200, message: "User updated" });
  });
   
  } catch (e) {
    res.status(400).send({ statusCode: 400, error: e });
  }
};

/*
 */



exports.deletedUser = async function (req, res) {
  try {
    const user = await User.findOne({
      
      _id: req.params.id,
    })

    if (!user) {
      throw new Error("No Such User");
    }
 

    await user.remove();
    res.send({ statusCode: 200, meaasge: "User deleted" });
  } catch (error) {
    res.status(400).send({ statusCode: 400, error: error.message });
  }
};




exports.view_User = async function (req, res) {
 let user=await User.findOne({_id:req.params.id})
 
  res.status(200).send({ statusCode: 200, user });
};


exports.list_User = async function (req, res) {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const page = parseInt(req.query.page) || 1;
    let findFilter={}
    console.log(req.query)
    if(req.query.q){
      let search = [
        { 
        title: {
          $regex: RegexEscape(req.query.q),
          $options: "i",
        },
      },   { 
        author: {
          $regex: RegexEscape(req.query.q),
          $options: "i",
        },
      }
      ];
     
      findFilter = {$or: search };
    }
    
    console.log(findFilter)

  User.countDocuments(findFilter, async function (err, count) {
    console.log(count)
      if (!err) {
        const Users = await User.find(findFilter)
          .lean()
          .sort({ name: 1 })
          .limit(limit)
          .skip(page - 1);

       

        return res.status(200).send({
          statusCode: 200,
          Users,
          total: count,
          limit,
          page,
        });
      }
    });
  } catch (e) {
    console.log(e)
    res.status(500).send({ statusCode: 500, e});
  }
};





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
    // console.log({ verified: verifyGoogleToken(req.body.credential) });
    console.log(req.body)

    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      console.log({verificationResponse})

      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }
      const profile = verificationResponse.payload;
      const user = new User({ name: profile?.name,
        imageUrl: profile?.picture,
        email: profile?.email});

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
    res.status(500).json({
      message: "An error occurred. Registration failed.",
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

      const existsInDB = DB.find((person) => person?.email === profile?.email);

      if (!existsInDB) {
        return res.status(400).json({
          message: "You are not registered. Please sign up",
        }); }

        res.status(201).json({
          message: "Login was successful",
          user: {
            firstName: profile?.given_name,
            lastName: profile?.family_name,
            picture: profile?.picture,
            email: profile?.email,
            token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET, {
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