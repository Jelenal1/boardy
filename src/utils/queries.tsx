"use server";
import { and, eq } from "drizzle-orm";
import { db } from "~/server/db";
import {
  cardTable,
  cardToLabel,
  labelTable,
  listTable,
} from "~/server/db/schema";
import { CARD, LIST } from "./types";

export async function createCard(
  card: Omit<CARD, "id" | "createdAt" | "updatedAt">,
) {
  return await db.insert(cardTable).values(card).returning();
}

export async function getCards() {
  return await db.select().from(cardTable);
}

export async function getCardsOfList(listId: number) {
  return await db.select().from(cardTable).where(eq(cardTable.listId, listId));
}

export async function getCard(id: number) {
  const card = await db
    .select()
    .from(cardTable)
    .where(eq(cardTable.id, id))
    .limit(1);

  return card;
}

export async function getLabels() {
  return await db.select().from(labelTable);
}

export async function getLabelsOfCard(cardId: number) {
  return await db
    .select({
      id: labelTable.id,
      title: labelTable.title,
      tailwindColor: labelTable.tailwindColor,
      cssColor: labelTable.cssolor,
      createdAt: labelTable.createdAt,
      updatedAt: labelTable.updatedAt,
    })
    .from(labelTable)
    .innerJoin(
      cardToLabel,
      and(
        eq(cardToLabel.labelId, labelTable.id),
        eq(cardToLabel.cardId, cardId),
      ),
    )
    .innerJoin(cardTable, eq(cardTable.id, cardToLabel.cardId))
    .where(eq(cardTable.id, cardId));
}

export async function createList(
  list: Omit<LIST, "id" | "createdAt" | "updatedAt">,
) {
  return await db.insert(listTable).values(list).returning();
}

export async function updateList(list: Omit<LIST, "createdAt" | "updatedAt">) {
  return await db
    .update(listTable)
    .set(list)
    .where(eq(listTable.id, list.id))
    .returning();
}

export async function deleteList(id: number) {
  return await db.delete(listTable).where(eq(listTable.id, id));
}

export async function getListsByBoardId(boardId: number) {
  return await db
    .select()
    .from(listTable)
    .where(eq(listTable.boardId, boardId));
}

export async function getLists() {
  return await db.select().from(listTable);
}

export async function getList(id: number) {
  return await db.select().from(cardTable).where(eq(cardTable.id, id)).limit(1);
}
