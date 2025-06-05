import "dotenv/config";
import fs from "fs";
import mysql from "mysql2/promise";
import path from "path";

const { MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_NAME } =
  process.env;

const categoryPath = path.join(__dirname, "../src/data/category.json");
const category = JSON.parse(fs.readFileSync(categoryPath, "utf-8"));

const authorPath = path.join(__dirname, "../src/data/author.json");
const author = JSON.parse(fs.readFileSync(authorPath, "utf-8"));

const articlePath = path.join(__dirname, "../src/data/article.json");
const article = JSON.parse(fs.readFileSync(articlePath, "utf-8"));

const seed = async () => {
  try {
    const db = await mysql.createConnection({
      host: MYSQL_DB_HOST,
      user: MYSQL_DB_USER,
      password: MYSQL_DB_PASSWORD,
      database: MYSQL_DB_NAME,
    });

    await db.query("DELETE FROM blog_articles");
    await db.query("DELETE FROM blog_author");
    await db.query("DELETE FROM blog_category");
    await db.query("ALTER TABLE blog_category AUTO_INCREMENT = 1");
    await db.query("ALTER TABLE blog_author AUTO_INCREMENT = 1");
    await db.query("ALTER TABLE blog_articles AUTO_INCREMENT = 1");

    for (const { name } of category) {
      await db.query("INSERT INTO blog_category (name) VALUES (?)", [name]);
    }

    for (const { name, avatar_url } of author) {
      await db.query(
        "INSERT INTO blog_author (name, avatar_url) VALUES (?, ?)",
        [name, avatar_url]
      );
    }

    for (const {
      title,
      content,
      image_path,
      created_at,
      category_id,
      author_id,
    } of article) {
      await db.query(
        "INSERT INTO blog_articles (title, content, image_path, created_at, category_id, author_id) VALUES (?, ?, ?, ?, ?, ?)",
        [title, content, image_path, created_at, category_id, author_id]
      );
    }

    await db.end();
    console.log("🌱 Database seeded successfully");
  } catch (err) {
    console.error("❌ Error during seeding:", err);
  }
};

seed();
