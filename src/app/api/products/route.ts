
import {connectToDatabase} from "@/lib/mongooDb";
import { Product } from "@/models/Product";


export async function GET() {
  await connectToDatabase();
  const list = await Product.find();
  return Response.json(list);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const created = await Product.create(body);
  return Response.json(created);
}
    