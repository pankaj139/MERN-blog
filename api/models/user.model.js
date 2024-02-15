import  mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture:{
    type: String,
    default:"https://smarterpaymentsummit.co.uk/wp-content/uploads/2019/04/profile-pic-dummy.png",
  }
},{timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;
