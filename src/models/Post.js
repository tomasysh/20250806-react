import { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String, required: true, minlength: 3 },
    body: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isPublished: { type: Boolean, default: true },
    tags: [String],
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", PostSchema);

export default Post;
