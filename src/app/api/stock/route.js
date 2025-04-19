import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const stockFile = path.resolve(process.cwd(), 'data', 'stock.json');

export async function GET() {
  const raw = fs.readFileSync(stockFile, 'utf-8');
  return NextResponse.json(JSON.parse(raw));
}

export async function POST(request) {
  const { newStock } = await request.json();
  fs.writeFileSync(stockFile, JSON.stringify(newStock, null, 2), 'utf-8');
  return NextResponse.json({ success: true });
}
