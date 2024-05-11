import { Schema, model } from 'mongoose';

// Skema untuk koleksi 'users'
const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  gender: String
});

// Buat model 'User' berdasarkan skema 'userSchema'
const User = model('User', userSchema);

export default User;
