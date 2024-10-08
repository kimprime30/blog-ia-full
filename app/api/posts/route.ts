// app/api/posts/route.ts

import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import Post from "../../../models/Post";

export async function GET() {
  await dbConnect();

  try {
    const posts = await Post.find({});
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return NextResponse.json(
      { message: "Erro ao buscar posts." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { title, content, category, author } = await request.json();

    if (!title || !content || !category || !author) {
      return NextResponse.json(
        { message: "Título, conteúdo, categoria e autor são obrigatórios." },
        { status: 400 }
      );
    }

    const newPost = new Post({ title, content, category, author });
    await newPost.save();

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar post:", error);
    return NextResponse.json(
      { message: "Erro ao criar post." },
      { status: 500 }
    );
  }
}
