import { Post, User } from "./model";
import { connectDb } from "./utils";
import { unstable_noStore as noStore } from "next/cache";

// Establish database connection
connectDb();

export const getPosts = async () => {
  try {
    // Assuming Post.find() fetches all posts from the database
    const posts = await Post.find();
    console.log(posts);
    return posts;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw new Error("Failed to fetch posts!");
  }
};

export const getPost = async (slug) => {
  try {
    console.log("Fetching post for slug:", slug);
    const post = await Post.findOne({ slug });
    console.log("Fetched post:", post);
    return post;
  } catch (error) {
    console.error("Failed to fetch post:", error);
    throw new Error("Failed to fetch post!");
  }
};

export const getUser = async (id) => {
  noStore(); // Assuming this is necessary for your caching mechanism
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user!");
  }
};

export const getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw new Error("Failed to fetch users!");
  }
};
