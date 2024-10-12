// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  bigint,
  bigserial,
  index,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `boardy_${name}`);

export const labelTable = createTable(
  "label",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    title: varchar("name", { length: 256 }).notNull().default(""),
    tailwindColor: varchar("tailwind_color", { length: 256 }).notNull(),
    cssolor: varchar("css_color", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (label) => ({
    nameIndex: index("label_title_idx").on(label.title),
    colorIndex: index("label_color_idx").on(label.tailwindColor),
  }),
);

export const cardToLabel = createTable(
  "card_to_label",
  {
    cardId: bigint("card_id", { mode: "number" }).references(
      () => cardTable.id,
    ),
    labelId: bigint("label_id", { mode: "number" }).references(
      () => labelTable.id,
    ),
  },
  (cardToLabel) => ({
    pk: primaryKey({
      columns: [cardToLabel.cardId, cardToLabel.labelId],
    }),
  }),
);

export const cardTable = createTable(
  "card",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    title: varchar("name", { length: 256 }).notNull().default(""),
    status: varchar("status", { length: 256 }).default("todo").notNull(),
    description: text("description"),
    listId: bigint("list_id", { mode: "number" })
      .references(() => listTable.id)
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (card) => ({
    nameIndex: index("card_title_idx").on(card.title),
  }),
);

export const listTable = createTable(
  "list",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    title: varchar("name", { length: 256 }).notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (list) => ({
    nameIndex: index("list_title_idx").on(list.title),
  }),
);

export const listToUser = createTable(
  "list_to_user",
  {
    listId: bigint("list_id", { mode: "number" }).references(
      () => listTable.id,
    ),
    userId: bigint("user_id", { mode: "number" }).references(
      () => userTable.id,
    ),
  },
  (listToUser) => ({
    pk: primaryKey({
      columns: [listToUser.listId, listToUser.userId],
    }),
  }),
);

export const boardTable = createTable(
  "board",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    title: varchar("name", { length: 256 }).notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (board) => ({
    nameIndex: index("board_title_idx").on(board.title),
  }),
);

export const boardToUser = createTable(
  "board_to_user",
  {
    boardId: bigint("board_id", { mode: "number" }).references(
      () => boardTable.id,
    ),
    userId: bigint("user_id", { mode: "number" }).references(
      () => userTable.id,
    ),
  },
  (boardToUser) => ({
    pk: primaryKey({
      columns: [boardToUser.boardId, boardToUser.userId],
    }),
  }),
);

export const userTable = createTable(
  "user",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    username: varchar("username", { length: 256 }),
    password: varchar("password", { length: 256 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (user) => ({
    usernameIndex: index("username_idx").on(user.username),
  }),
);
