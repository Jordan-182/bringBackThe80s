import { articleMessages } from "@/data/articleMessages";
import { db } from "@/lib/db";
import { ArticleModel } from "@/model/ArticleModel";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const articleId = parseInt(params.id, 10);
  if (isNaN(articleId)) {
    return NextResponse.json(
      { error: articleMessages.invalidId },
      { status: 400 }
    );
  }

  try {
    const [rows] = await db.query(
      "SELECT id, title, content, image_path, created_at, category_id, author_id FROM blog_articles WHERE id = ?",
      [articleId]
    );
    const results = Array.isArray(rows) ? (rows as ArticleModel[]) : [];

    if (results.length === 0) {
      return NextResponse.json(
        { error: articleMessages.notFound },
        { status: 404 }
      );
    }

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error("Erreur MySQL (GET /api/articles/[id]) :", error);
    return NextResponse.json(
      { error: articleMessages.server },
      { status: 500 }
    );
  }
}
