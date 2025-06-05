import { articleMessages } from "@/data/articleMessages";
import { db } from "@/lib/db";
import { ArticleModel } from "@/model/ArticleModel";
import { NextResponse } from "next/server";

interface InsertResult {
  insertId: number;
  affectedRows?: number;
  warningStatus?: number;
}

interface UpdateResult {
  affectedRows: number;
  warningStatus?: number;
}

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT id, title, content, image_path, created_at, category_id, author_id FROM blog_articles ORDER BY id ASC"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Erreur MySQL :", error);
    return NextResponse.json(
      { error: articleMessages.server },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { title, content, image_path, created_at, category_id, author_id } =
      await req.json();

    if (
      typeof title !== "string" ||
      typeof content !== "string" ||
      typeof image_path !== "string" ||
      typeof created_at !== "string" ||
      typeof category_id !== "number" ||
      typeof author_id !== "number" ||
      title.trim() === "" ||
      content.trim() === "" ||
      image_path.trim() === "" ||
      created_at.trim() === "" ||
      title.length > 100 ||
      image_path.length > 255 ||
      created_at.length > 100 ||
      category_id <= 0 ||
      author_id <= 0
    ) {
      return NextResponse.json(
        { error: articleMessages.invalidData },
        { status: 400 }
      );
    }

    const [result] = (await db.query(
      "INSERT INTO blog_articles (title, content, image_path, created_at, category_id, author_id) VALUES (?, ?, ?, ?, ?, ?)",
      [
        title.trim(),
        content.trim(),
        image_path.trim(),
        created_at.trim(),
        category_id,
        author_id,
      ]
    )) as [InsertResult, unknown];

    return NextResponse.json({
      message: articleMessages.addSuccess,
      insertedId: result.insertId,
    });
  } catch (error) {
    console.error("Erreur MySQL (POST) :", error);
    return NextResponse.json(
      { error: articleMessages.server },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const payload = (await req.json()) as ArticleModel;
    const {
      id,
      title,
      content,
      image_path,
      created_at,
      category_id,
      author_id,
    } = payload;
    if (typeof id !== "number" || isNaN(id)) {
      return NextResponse.json(
        { error: articleMessages.invalidId },
        { status: 400 }
      );
    }
    if (
      typeof title !== "string" ||
      typeof content !== "string" ||
      typeof image_path !== "string" ||
      typeof created_at !== "string" ||
      typeof category_id !== "number" ||
      typeof author_id !== "number" ||
      title.trim() === "" ||
      content.trim() === "" ||
      image_path.trim() === "" ||
      created_at.trim() === "" ||
      title.length > 100 ||
      image_path.length > 255 ||
      created_at.length > 100 ||
      category_id <= 0 ||
      author_id <= 0
    ) {
      return NextResponse.json(
        { error: articleMessages.invalidData },
        { status: 400 }
      );
    }

    const [result] = (await db.query(
      "UPDATE blog_articles SET title = ?, content = ?, image_path = ?, created_at = ?, category_id = ?, author_id = ? WHERE id = ?",
      [
        title.trim(),
        content.trim(),
        image_path.trim(),
        created_at.trim(),
        category_id,
        author_id,
        id,
      ]
    )) as [UpdateResult, unknown];

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: articleMessages.notFound || "Article non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: articleMessages.updateSuccess });
  } catch (error) {
    console.error("Erreur MySQL (PATCH) :", error);
    return NextResponse.json(
      { error: articleMessages.server },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const idParam = url.searchParams.get("id");
    const articleId = idParam !== null ? parseInt(idParam, 10) : NaN;

    if (isNaN(articleId)) {
      return NextResponse.json(
        { error: articleMessages.invalidId },
        { status: 400 }
      );
    }

    await db.query("DELETE FROM blog_articles WHERE id = ?", [articleId]);
    return NextResponse.json({ message: articleMessages.deleted });
  } catch (error) {
    console.error("Erreur MySQL (DELETE) :", error);
    return NextResponse.json(
      { error: articleMessages.server },
      { status: 500 }
    );
  }
}
