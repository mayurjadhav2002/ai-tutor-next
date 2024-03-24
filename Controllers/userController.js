var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const randomstring = require("randomstring");
const { VerifyEmail } = require("../mails/verifyAccount");
const { OAuth2Client } = require("google-auth-library");

const { default: mongoose } = require("mongoose");
const client_id = process.env.GOOGLE_AUTH_CLIENT_ID;
const client = new OAuth2Client(client_id);
const GOOGLE_DISCOVERY_URL =
  "https://accounts.google.com/.well-known/openid-configuration";
const axios = require("axios");

// const dbStats = async () => {
//   try {
//     // Use the dbStats command to get the storage statistics
//     const stats = await mongoose.connection.db.command({
//       dbStats: 1,
//       scale: 1024,
//     }); // scale: 1024 to get sizes in KB
//     return stats;
//   } catch (error) {
//     // console.error("Error fetching dbStats:", error);
//     throw error;
//   }
// };

// jwt token generation, whenever user sign in this token will be send.
const token_generation = async (id) => {
  try {
    const token = await jwt.sign({ _id: id }, process.env.JWT_SECRET_KEY);
    return token;
  } catch (error) {
    throw new Error(error);
  }
};
async function AccounVerificationToken() {
  try {
    return randomstring.generate();
  } catch (error) {
    res.status(400).send({ msg: "error in token generation" });
  }
}

const password_encrypt = async (password) => {
  try {
    const pass = await bcrypt.hash(password, 10);
    return pass;
  } catch (error) {
    throw new Error(error.message);
  }
};

const register_new_user = async (req, res) => {
  const email = req.body.email;

  try {
    const encrypt_pass = await password_encrypt(req.body.password);

    // Checking whether user with given email already exists or not
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(201).send({
        success: false,
        code: "exists",
        msg: "User with this email already exists",
      });
    }

    const account_verification_token = await AccounVerificationToken();
    const user = new User({
      name: req.body.name,
      email: email,
      password: encrypt_pass,
      tc: req.body.tc,
      verification_token: account_verification_token,
      signInType: [{ normal: true }],
    });

    const result = await user.save();

    if (result) {
      const token = await token_generation(result._id);
      let user2 = await User.findOneAndUpdate(
        { email: result.email },
        { access_token: token },
        {
          new: true,
        }
      );
      // Send the response first
      res.status(201).send({
        success: true,
        code: "success",
        msg: "New Account Created",
        data: user2,
      });

      // Then handle the asynchronous operation
      await VerifyEmail({
        token: account_verification_token,
        email: email,
        name: req.body.name,
      });
    } else {
      res.status(400).send({
        success: false,
        code: "error",
        msg: "Error in creating the account",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      code: "internal error",
      msg: "Internal error occurred",
    });
  }
};

const signin = async (req, res) => {
  const email = req.body.email;
  // Check whether the user exists or not
  try {
    if (req.body.password === "") {
      return res.status(400).send({
        succes: false,
        msg: "please check your credentials",
        typeError: "Password",
      });
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(201).send({ success: false, msg: "User Not exists" });
    }
    if (!user.signInType[0].normal) {
      return res.status(201).send({
        success: false,
        code: "oauth",
        msg: "Please Sign in using Google or github",
      });
    }

    // If user Exists

    const password_Verify = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (password_Verify) {
      const token = await token_generation(user._id);
      user = await User.findOneAndUpdate(
        { email: email },
        { access_token: token },
        {
          new: true,
        }
      );
      const userAccount = {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        verified_account: user.verified_account,
        access_token: token,
      };
      return res.status(200).send({ success: true, data: userAccount });
    } else {
      return res.status(406).send({
        success: false,
        code: "invalid",
        msg: `Incorrect Login Credentials`,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      code: "error",
      msg: "Failed to load, some errored occured",
    });
  }
};

const requestNewVerificationToken = async (req, res) => {
  try {
    const token = await Math.floor(10000000 + Math.random() * 90000000);    ;
    let user2 = await User.findOneAndUpdate(
      { _id: req.body.id, email: req.body.email },
      { verification_token: token },
      {
        new: true,
      }
    );
    if (!user2) {
      return res.status(201).send({ success: false, msg: "No Account found" });
    }

    await VerifyEmail({
      token: token,
      email: req.body.email, 
      name: req.body.name,
    });

    return res.status(200).send({
      success: true,
      code: "success",
      msg: "Verification link send to "+ req.body.name,
      data: user2,
    });
  } catch (error) {
    console.log(error)
    return res
      .status(400)
      .send({ success: false, msg: "Unexpected Error Occurred" });
  }
};

const verifyEmail = async (req, res) => {

  try {
    let user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).send({ success: false, msg: "User does not exist" });
    }

    if (user.verified_account) {
      return res.status(200).send({ success: true, msg: "Account Already Verified ✅" });
    }

    if (user.verification_token === req.params.verification_token) {
      // Corrected variable from 'email' to 'req.params.email'
      user = await User.findOneAndUpdate(
        { email: req.params.email },
        { verified_account: true },
        {
          new: true,
        }
      );
      return res.status(200).send({ success: true, msg: "Account Verified" });
    }

    // Changed 'req.body.verification_token' to 'req.params.verification_token'
    if (user.verification_token !== req.params.verification_token) {
      return res.status(400).send({
        success: false,
        msg: "Verification token is Expired or Does not match.",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, msg: "Failed to load, some error occurred" });
  }
};


const create_user_using_gauth = async (req, res) => {
  try {
    const jwtToken = req.body.credentials;

    const { data: googleOpenIdConfig } = await axios.get(GOOGLE_DISCOVERY_URL);

    const decodedToken = jwt.decode(jwtToken, { complete: true });

    if (!decodedToken || !decodedToken.header || !decodedToken.payload) {
      return res.status(400).send({
        success: false,
        msg: "Invalid JWT structure",
      });
    }

    const payload = decodedToken.payload;

    if (payload && payload.email) {
      let token_generator = await User.findOne({ email: payload.email });

      if (token_generator) {
        const token = await token_generation(token_generator._id);
        const user = await User.findOneAndUpdate(
          { email: payload.email },
          { access_token: token },
          { new: true }
        );

        const userAccount = {
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          verified_account: user.verified_account,
          organization: user.organization,
          organization_name: user.organization_name,
          access_token: user.access_token,
        };
        return res.status(200).send({
          success: true,
          msg: "Login successfully",
          data: userAccount,
        });
      } else {
        const guser = new User({
          name: payload.name,
          email: payload.email,
          avatar: payload.picture,
          tc: true,
          signInType: [{ google: true }],
          verified_account: payload.email_verified,
        });
        const userSaveResult = await guser.save();
        if (userSaveResult) {
          const newToken = await User.findOne({
            email: userSaveResult.email,
            delete_account: false,
          });
          const token = await token_generation(newToken._id);
          const user = await User.findOneAndUpdate(
            { email: userSaveResult.email },
            { access_token: token },
            { new: true }
          );
          const userAccount = {
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            verified_account: user.verified_account,
            organization: user.organization,
            organization_name: user.organization_name,
            access_token: user.access_token,
          };
          return res.status(200).send({
            success: true,
            msg: "account created successfully",
            data: userAccount,
          });
        } else {
          return res.status(400).send({
            success: false,
            msg: "some error occurred while creating a new user with Google",
          });
        }
      }
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      msg: "Failed to load, some error occurred",
    });
  }
};

// const getCountofUserActivity = async (req, res) => {
//   try {
//     const userId = req.params.id;

//     // Count user's projects
//     const ProjectCount = await Project.countDocuments({
//       created_by: userId,
//       deleted: false,
//     });

//     // Count user's documents
//     const DocumentsCount = await Documentation.countDocuments({
//       created_by: userId,
//       deleted: false,
//     });

//     // Get database stats
//     const stats = await dbStats();

//     // Calculate storage stats for projects and documents
//     const projectStorageStats = ProjectCount * stats.storageSize;
//     const documentsStorageStats = DocumentsCount * stats.storageSize;

//     // Count shared documents
//     const SharedDocuments = await Documentation.countDocuments({
//       shared_with: userId,
//     });

//     // Fetch recently edited documentations (adjust the sort and limit as needed)
//     const recentlyEditedDocs = await Documentation.find({
//       created_by: userId,
//     })
//       .select("docID document_title updatedAt")
//       .sort({ updatedAt: "desc" })
//       .limit(5);

//     // Fetch names and dates of up to 5 shared projects
//     const sharedProjects = await Project.find({
//       "collaborators.userId": userId,
//       deleted: false,
//     })
//       .select("title description timeline createdAt keyword _id created_by updatedAt")
//       .populate("created_by", "name avatar")
//       .limit(5);

//     return res.status(200).send({
//       success: true,
//       projectCount: ProjectCount,
//       documentCount: DocumentsCount,
//       sharedDocuments: SharedDocuments,
//       projectStorageStats: projectStorageStats,
//       documentsStorageStats: documentsStorageStats,
//       sharedProjects: sharedProjects,
//       recentlyEditedDocs: recentlyEditedDocs,
//     });
//   } catch (error) {
//     // console.error("Error occurred while fetching user activity", error);
//     return res
//       .status(500)
//       .send({ success: false, msg: "Failed to load, some error occurred" });
//   }
// };

const UpdateAccount = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updateData = req.body; // Update data from request body

    // Update the user using findOneAndUpdate
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updateData },
      { new: true } // Return the modified document
    );

    // Check if the user exists and was updated successfully
    if (updatedUser) {
      return res.status(200).json({ success: true, data: updatedUser });
    } else {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Internal server error" });
  }
};

const DeleteAccount = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Delete the user using findOneAndDelete
    const deletedUser = await User.findOneAndDelete({ _id: userId });

    // Check if the user exists and was deleted successfully
    if (deletedUser) {
      return res.status(200).json({ success: true, data: deletedUser });
    } else {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Internal server error" });
  }
};

module.exports = {
  register_new_user,
  signin,
  verifyEmail,
  UpdateAccount,
  create_user_using_gauth,
//   getCountofUserActivity,
  DeleteAccount,
  requestNewVerificationToken,
};
