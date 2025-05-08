


import { connectToDatabase } from '@/lib/mongooDb';
import { Product } from '@/models/Product';


export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    await connectToDatabase();
    const product = await Product.findById(params.id);
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