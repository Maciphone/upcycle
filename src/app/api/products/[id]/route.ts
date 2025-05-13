import { connectToDatabase } from '@/lib/mongooDb';
import { Product } from '@/models/Product';
import mongoose, { Types } from 'mongoose';

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = await context.params;

  await connectToDatabase();

  const product = await Product.findById(id);
  if (!product) {
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(product), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}