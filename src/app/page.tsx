import { SignedOut, SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { CiViewBoard } from "react-icons/ci";
import { Button } from "~/components/ui/button";

export const revalidate = 30;

export default async function HomePage() {
  const { userId } = auth();
  return (
    <main className="flex min-h-screen flex-col items-center">
      <CiViewBoard size={500} />
      <p className="text-3xl">
        This is a simple Kanban board app trying to be a open source alternative
        to other Kanban apps.
        <br />
        It's currently in early development.
      </p>
      {
        userId ? (
          <a href="/boards">
            <Button className="m-2 text-2xl bg-gray-600">Go to Boards</Button>
          </a>
        ) : (
          <a href="/signin">
            <Button className="m-2 text-2xl bg-gray-600 border">
              <SignedOut>
               <SignInButton />
              </SignedOut>
            </Button>
          </a>
        )
      }
    </main>
  );
}
