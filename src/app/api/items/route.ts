import { NextRequest, NextResponse } from 'next/server';
import { getItems, createItem } from '@/lib/db/neon';

// GET - Fetch all items
export async function GET(request: NextRequest) {
  try {
    const items = await getItems() as any[];
    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    );
  }
}

// POST - Create a new item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const items = await createItem(name, description || '') as any[];
    return NextResponse.json({ item: items[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json(
      { error: 'Failed to create item' },
      { status: 500 }
    );
  }
}
