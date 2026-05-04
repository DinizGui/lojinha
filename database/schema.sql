-- MySQL 8+ — loja + painel (mesmo banco)
SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS categories (
  slug VARCHAR(64) PRIMARY KEY,
  name VARCHAR(128) NOT NULL,
  blurb VARCHAR(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(128) PRIMARY KEY,
  category_slug VARCHAR(64) NOT NULL,
  name VARCHAR(255) NOT NULL,
  benefit VARCHAR(512) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  accent VARCHAR(256) NOT NULL DEFAULT 'from-rose-100 to-amber-50',
  image_url VARCHAR(2048) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_category (category_slug),
  CONSTRAINT fk_product_category FOREIGN KEY (category_slug) REFERENCES categories (slug)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
