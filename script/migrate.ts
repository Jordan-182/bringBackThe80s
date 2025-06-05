import "dotenv/config";
import mysql from "mysql2/promise";

const { MYSQL_DB_HOST, MYSQL_DB_USER, MYSQL_DB_PASSWORD, MYSQL_DB_NAME } =
  process.env;

const schema = `
  CREATE DATABASE IF NOT EXISTS \`${MYSQL_DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  USE \`${MYSQL_DB_NAME}\`;

  CREATE TABLE IF NOT EXISTS blog_category (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS blog_author (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(255) DEFAULT NULL
);

  CREATE TABLE IF NOT EXISTS blog_articles (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    created_at VARCHAR(100) NOT NULL,
    category_id INT NOT NULL,
    author_id INT,
    FOREIGN KEY (category_id) REFERENCES blog_category(id),
    FOREIGN KEY (author_id) REFERENCES blog_author(id)
  );
`;

const migrate = async () => {
  try {
    const connection = await mysql.createConnection({
      host: MYSQL_DB_HOST,
      user: MYSQL_DB_USER,
      password: MYSQL_DB_PASSWORD,
      multipleStatements: true,
    });

    await connection.query(schema);
    await connection.end();

    console.log("✅ Database schema created successfully");
  } catch (err) {
    console.error("❌ Error during migration:", err);
  }
};

migrate();
