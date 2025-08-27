import connectDB from "@/config/database";
import Post from "@/models/Post";

export const GET = async () => {
  try {
    await connectDB();
    const posts = await Post.find({});
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response("Failed to fetch posts", {
      status: 500,
    });
  }
};
