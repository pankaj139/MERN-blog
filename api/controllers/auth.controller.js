import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    next(errorHandler(400, 'All fields are required'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    return res.status(200).json({ message: 'Sign up successfully' });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password,user.password);
    if(!validPassword){
      return next(errorHandler(400,'Invalid email or password'))
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, isAdmin: user.isAdmin},
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );
    const { password: pass, ...rest } = user._doc;

    return res.status(200).cookie('access_token',token,{
      httpOnly:true,
    }).json(rest);
  } catch (err) {
      next(err)
  }
}

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({email});
    if(user){
      const token = jwt.sign(
        { id: user._id, email: user.email, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        {
          expiresIn: '1d',
        }
      );
      const { password: pass, ...rest } = user._doc;
      return res.status(200).cookie('access_token',token,{
        httpOnly:true,
      }).json(rest);
    }else{
      const generatePassword = Math.random().toString(36).slice(-8);
      const newUser = new User({
        username: name.toLowerCase().replace(/ /g,'')+Math.random().toString(9).slice(-4),
        email: email,
        password: bcryptjs.hashSync(generatePassword,10),
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, email: newUser.email, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET,
        {
          expiresIn: '1d',
        }
      );
      const { password: pass, ...rest } = newUser._doc;
      return res.status(200).cookie('access_token',token,{
        httpOnly:true,
      }).json(rest);
    }
  }
  catch (err) {
    next(err)
  }
}
