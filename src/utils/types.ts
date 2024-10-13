import type { cardTable, labelTable, listTable } from "~/server/db/schema";

// Updated Types using $inferSelect

// Full row type of `cardTable`
export type CARD = typeof cardTable.$inferSelect;

// Full row type of `labelTable`
export type LABEL = typeof labelTable.$inferSelect;

// Full row type of `listTable`
export type LIST = typeof listTable.$inferSelect;

// Types for queries

// getCards query returns an array of Cards
export type GetCardsResult = CARD[];

// getCard query returns a single Card or undefined (due to limit(1))
export type GetCardResult = CARD | undefined;

// getLabels query returns an array of Labels
export type GetLabelsResult = LABEL[];

// getLabelsOfCard query returns a subset of Label fields for a specific card
export type GetLabelsOfCardResult = {
  id: LABEL["id"];
  title: LABEL["title"];
  tailwindColor: LABEL["tailwindColor"];
  cssColor: LABEL["cssolor"];
  createdAt: LABEL["createdAt"];
  updatedAt: LABEL["updatedAt"];
}[];

// getLists query returns an array of Lists
export type GetListsResult = LIST[];

// getList query returns a List
export type GetListResult = LIST;
