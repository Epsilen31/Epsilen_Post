"use server";

import { revalidatePath } from "next/cache";
import { Post, User } from "./model";
import { connectDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";

export const addPost = async (prevState, formData) => {
  // const title = formData.get("title");
  // const desc = formData.get("desc");
  // const slug = formData.get("slug");

  const { title, desc, slug, userId, img } = Object.fromEntries(formData);

  try {
    connectDb();
    const newPost = new Post({
      title,
      desc,
      slug,
      img,
      userId,
    });

    await newPost.save();
    console.log("saved to db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectDb();

    await Post.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const addUser = async (prevState, formData) => {
  const { username, email, password, img } = Object.fromEntries(formData);

  try {
    connectDb();
    const newUser = new User({
      username,
      email,
      password,
      img,
    });

    await newUser.save();
    console.log("saved to db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectDb();

    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleLogout = async () => {
  "use server";
  await signOut();
};

// Import User model or ensure it's properly defined and connected to the database

export const register = async (formData) => {
  try {
    const { username, email, password, passwordRepeat } = formData;
    console.log(username, email, password, passwordRepeat);

    if (password !== passwordRepeat) {
      return { error: "Passwords do not match" };
    }

    // Check if username or email already exists in the database
    // Replace `User.findOne()` with appropriate database query using your User model

    // Example:
    let existingUser;
    try {
      // Set a longer timeout for the findOne operation
      existingUser = await User.findOne({ $or: [{ username }, { email }] })
        .maxTimeMS(15000)
        .exec();
    } catch (timeoutErr) {
      console.error("Database query timed out:", timeoutErr);
      return { error: "Database query timed out. Please try again later." };
    }
    console.log("printing existing user", existingUser);
    if (existingUser) {
      if (existingUser.username === username) {
        return { error: "Username already exists" };
      }
      if (existingUser.email === email) {
        return { error: "Email already exists" };
      }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    // Create a new user instance and save it to the database
    // Replace with appropriate code based on your User model and database setup

    // Example:
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    console.log("User saved to the database");

    // Return success response if everything went well
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong during registration" };
  }
};

export const login = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};
