// Assuming this is the content of /api/blog/route.js

import { Post } from "@/lib/model";
import { connectDb } from "@/lib/utils";
import { NextResponse } from "next/server";

const GET = async () => {
  try {
    await connectDb();
    const posts = await Post.find();
    console.log(posts);
    return new NextResponse({ body: posts, status: 200 });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch posts!");
  }
};

export default GET;
