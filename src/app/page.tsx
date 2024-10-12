import List from "~/components/List";

export const revalidate = 30;

export default async function HomePage() {
  const lists: List[] = [
    {
      id: 1,
      title: "To Do",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-900">
      <h1 className="mb-4 mt-2 text-5xl font-bold">Boardy</h1>
      <div className="mx-2 flex w-full overflow-x-scroll">
        {lists.map((list) => (
          <List key={list.id} initialList={list} />
        ))}
      </div>
    </main>
  );
}
