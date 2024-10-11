import { and, eq, sql } from "drizzle-orm";
import { db } from "~/server/db";
import { cardTable, cardToLabel, labelTable } from "~/server/db/schema";

export async function getCards() {
  return await db.select().from(cardTable);
}

export async function getCard(id: number) {
  return await db
    .select()
    .from(cardTable)
    .where(eq(cardTable.id, sql`'${id}'`))
    .limit(1);
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
        eq(cardToLabel.cardId, sql`'${cardId}'`),
      ),
    )
    .innerJoin(cardTable, eq(cardTable.id, cardToLabel.cardId))
    .where(eq(cardTable.id, sql`'${cardId}'`));
}

export async function getLists() {
  return await db.select().from(cardTable);
}

export async function getList(id: number) {
  return await db
    .select()
    .from(cardTable)
    .where(eq(cardTable.id, sql`'${id}'`))
    .limit(1);
}
