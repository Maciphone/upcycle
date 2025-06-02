import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongooAuth";
import { ObjectId } from "mongodb";

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Nincs jogosultság" }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db("upcycle");
  const user = await db
    .collection("users")
    //.findOne({ _id: new ObjectId(session.user.id) });
    .findOne({ email: session.user.email && session.user.email.toLowerCase() });

  if (!user) {
    return NextResponse.json(
      { error: "Felhasználó nem található" },
      { status: 404 }
    );
  }

  // Ne add vissza a jelszót!
  const { password, ...userData } = user;

  return NextResponse.json(userData);
}
