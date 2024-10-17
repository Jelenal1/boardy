import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { CiViewBoard } from "react-icons/ci";

const Navbar = async () => {
  const user = await currentUser();
  return (
    <header className="flex h-16 items-center px-2">
      <a href={user?.username ? `/boards/${user.username}` : "/"}>
        <CiViewBoard className="text-4xl" />
      </a>
      <h1 className="text-3xl">Boardy</h1>

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
