import { compare, genSalt, hash } from "bcrypt";
import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name not provided "],
    },
    email: {
      type: String,
      unique: [true, "email already exists in database!"],
      lowercase: true,
      trim: true,
      required: [true, "email not provided"],
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "{VALUE} is not a valid email!",
      },
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
    },
    pic: { type: String, required: false },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (password) {
  return await compare(password, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

const User = model("User", userSchema);

export default User;
