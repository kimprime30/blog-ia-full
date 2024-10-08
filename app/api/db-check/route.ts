import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/db";

export async function GET() {
  try {
    await connectToDatabase();
    return NextResponse.json({
      message: "Conexão com o banco de dados bem-sucedida!",
    });
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    return NextResponse.json(
      { message: "Erro ao conectar ao banco de dados." },
      { status: 500 }
    );
  }
}
