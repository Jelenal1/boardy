import { getCard } from "~/app/utils/queries";


export async function GET({ params }: { params: { id: string } }) {
  try {
    const card = await getCard(parseInt(params.id, 10));
    return new Response(JSON.stringify(card));
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }));
  }
}
