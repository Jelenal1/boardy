import { getCards } from "~/utils/queries";

export async function GET() {

    try {
        const cards = await getCards()
        return new Response(JSON.stringify(cards));
    } catch (error) {
        return new Response(JSON.stringify({ error: (error as Error).message }));
    }

}