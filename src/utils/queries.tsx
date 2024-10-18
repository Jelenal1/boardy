"use server";
import { and, eq, sql } from "drizzle-orm";
import { db } from "~/server/db";
import {
  boardTable,
  cardTable,
  cardToLabel,
  labelTable,
  listTable,
} from "~/server/db/schema";
import { BOARD, CARD, LIST } from "./types";

export async function updateCard(card: Omit<CARD, "createdAt" | "updatedAt">) {
  return await db
    .update(cardTable)
    .set(card)
    .where(eq(cardTable.id, card.id))
    .returning();
}

export async function deleteCard(id: number) {
  await db.delete(cardTable).where(eq(cardTable.id, id));
}

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
  return (await db.select().from(cardTable).where(eq(cardTable.id, id)))[0];
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
  await db.delete(listTable).where(eq(listTable.id, id));
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
  return (await db.select().from(cardTable).where(eq(cardTable.id, id)))[0];
}

export async function createBoard(
  board: Omit<BOARD, "id" | "createdAt" | "updatedAt">,
) {
  return await db.insert(boardTable).values(board).returning();
}

export async function updateBoard(
  board: Omit<BOARD, "createdAt" | "updatedAt">,
) {
  return await db
    .update(boardTable)
    .set(board)
    .where(eq(boardTable.id, Number(board.id)));
}

export async function deleteBoard(id: number) {
  await db.delete(boardTable).where(eq(boardTable.id, id));
}

export async function getBoards() {
  return await db.select().from(boardTable);
}

export async function getBoardsByUserId(userId: string) {
  return await db
    .select()
    .from(boardTable)
    .where(sql`${userId} = ANY(${boardTable.user_uids})`);
}

export async function getBoard(id: number) {
  return (await db.select().from(boardTable).where(eq(boardTable.id, id)))[0];
}
