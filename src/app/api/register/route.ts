import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import clientPromise from "@/lib/mongooAuth";

export async function POST(req: NextRequest) {
  //const { email, password } = await req.json();
  const { email, password, name, address, phone } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email és jelszó szükséges." },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("upcycle");

    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "Ez az email már regisztrálva van." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // const newUser = await db.collection("users").insertOne({
    //   email,
    //   password: hashedPassword,
    //   createdAt: new Date(),
    // });
    const newUser = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
      name,
      address,
      phone,
      role: "customer",
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Sikeres regisztráció." });
  } catch (err) {
    console.error("Regisztrációs hiba:", err);
    return NextResponse.json({ error: "Szerverhiba." }, { status: 500 });
  }
}
