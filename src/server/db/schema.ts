// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  serial,
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
    id: serial("id").primaryKey(),
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
    cardId: integer("card_id").references(() => cardTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    labelId: integer("label_id").references(() => labelTable.id),
  },
  (cardToLabel) => ({
    pk: primaryKey({
      columns: [cardToLabel.cardId, cardToLabel.labelId],
    }),
  }),
);

export const Status = pgEnum("status", ["todo", "inprogress", "done"]);

export const cardTable = createTable(
  "card",
  {
    id: serial("id").primaryKey(),
    user_uids: text("user_uids").array().default([]).notNull(),
    listId: integer("list_id")
      .references(() => listTable.id, {
        onDelete: "cascade",
        onUpdate: "no action",
      })
      .notNull(),
    title: varchar("name", { length: 256 }).notNull().default(""),
    status: Status("status").default("todo").notNull(),
    description: text("description").default("").notNull(),
    position: integer("position").notNull(),
    dueDate: timestamp("due_date", { withTimezone: true }).notNull(),
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
    id: serial("id").primaryKey(),
    user_uids: text("user_uids").array().default([]).notNull(),
    boardId: integer("board_id")
      .references(() => boardTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      })
      .notNull(),
    position: integer("position").notNull(),
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

export const boardTable = createTable(
  "board",
  {
    id: serial("id").primaryKey(),
    user_uids: text("user_uids").array().default([]).notNull(),
    title: varchar("name", { length: 256 }).notNull().default(" "),
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
