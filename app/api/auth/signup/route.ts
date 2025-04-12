import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mogodb";
import { validateUserInput } from "@/app/validators/userValidator";
import { createUser } from "@/app/services/userService";

export async function POST(request: Request) {
  try {
    await connectDB();

    const { username, email, password } = await request.json();

    const validationError = validateUserInput(username, email, password);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const savedUser = await createUser({ username, email, password });

    return NextResponse.json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
    });

  } catch (error: any) {
    console.error("Signup Error:", error);
    
    if (error.message === "EMAIL_EXISTS") {
      return NextResponse.json(
        { error: "El email ya está registrado" },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
