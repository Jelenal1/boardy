import type {
  boardTable,
  cardTable,
  labelTable,
  listTable,
} from "~/server/db/schema";

// Updated Types using $inferSelect

// Full row type of `cardTable`
export type CARD = typeof cardTable.$inferSelect;

// Full row type of `labelTable`
export type LABEL = typeof labelTable.$inferSelect;

// Full row type of `listTable`
export type LIST = typeof listTable.$inferSelect;

// Full row type of 'boardTable'
export type BOARD = typeof boardTable.$inferSelect;

// Types for queries

// getLabelsOfCard query returns a subset of Label fields for a specific card
export type GetLabelsOfCardResult = {
  id: LABEL["id"];
  title: LABEL["title"];
  tailwindColor: LABEL["tailwindColor"];
  cssColor: LABEL["cssolor"];
  createdAt: LABEL["createdAt"];
  updatedAt: LABEL["updatedAt"];
}[];
