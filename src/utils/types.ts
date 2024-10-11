import type { cardTable, labelTable } from "~/server/db/schema";

// Updated Types using $inferSelect

// Full row type of `cardTable`
export type Card = typeof cardTable.$inferSelect;

// Full row type of `labelTable`
export type Label = typeof labelTable.$inferSelect;

// Types for queries

// getCards query returns an array of Cards
export type GetCardsResult = Card[];

// getCard query returns a single Card or undefined (due to limit(1))
export type GetCardResult = Card | undefined;

// getLabels query returns an array of Labels
export type GetLabelsResult = Label[];

// getLabelsOfCard query returns a subset of Label fields for a specific card
export type GetLabelsOfCardResult = {
  id: Label["id"];
  title: Label["title"];
  tailwindColor: Label["tailwindColor"];
  cssColor: Label["cssolor"];
  createdAt: Label["createdAt"];
  updatedAt: Label["updatedAt"];
}[];

// getLists query should return Cards (consider renaming to getCards)
export type GetListsResult = Card[];

// getList query returns a single Card or undefined (due to limit(1))
export type GetListResult = Card | undefined;
