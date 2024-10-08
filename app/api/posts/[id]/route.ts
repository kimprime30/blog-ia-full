import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/db";
import Post from "../../../../models/Post";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const post = await Post.findById(params.id);
    if (!post) return NextResponse.error();
    return NextResponse.json(post);
  } catch {
    return NextResponse.error();
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { title, content } = await request.json();
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      params.id,
      { title, content },
      { new: true }
    );
    if (!updatedPost) return NextResponse.error();
    return NextResponse.json(updatedPost);
  } catch {
    return NextResponse.error();
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const deletedPost = await Post.findByIdAndDelete(params.id);
    if (!deletedPost) return NextResponse.error();
    return NextResponse.json({ message: "Post deletado com sucesso!" });
  } catch {
    return NextResponse.error();
  }
}
