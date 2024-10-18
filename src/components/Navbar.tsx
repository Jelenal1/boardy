import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CiViewBoard } from "react-icons/ci";

const Navbar = async () => {
  const { userId } = auth();
  if (!userId) redirect("/signin");
  return (
    <header className="flex h-16 items-center px-2">
      <a href={userId ? `/boards` : `/`}>
        <div className="flex select-none">
          <CiViewBoard className="text-4xl" />
          <h1 className="text-3xl">Boardy</h1>
        </div>
      </a>
      <div className="ml-auto">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Navbar;
