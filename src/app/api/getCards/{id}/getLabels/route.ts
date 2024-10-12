import { getLabelsOfCard } from "~/app/utils/queries";

export async function GET({ params }: { params: { id: string } }) {
  try {
    const labels = await getLabelsOfCard(parseInt(params.id, 10));
    return new Response(JSON.stringify(labels), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
    });
  }
}
