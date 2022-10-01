import bcryptjs from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';

async function handler(req, res) {
  if (req.method != 'POST') {
    return;
  }
  const { name, email, password } = req.body;
  if (
    !name ||
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 6
  ) {
    res.status(422).json({
      message: 'validation error',
    });
    return;
  }

  //If all above condition true than connect to db
  await db.connect();
  //Check with email if this user already exist in our MongoDB db
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(422).json({
      message: 'User already exists!',
    });
    await db.disconnect();
    return;
  }
  const newUser = new User({
    name,
    email,
    password: bcryptjs.hashSync(password),
    isAdmin: false,
  });

  //create user object to save new user
  const user = await newUser.save();
  await db.disconnect();
  res.status(201).send({
    message: 'User created!',
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
}

export default handler;
