import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email already exists"],
      unique: [true, "Email is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    image: {
      type: String,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
