import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { CiViewBoard } from "react-icons/ci";
import { revalidatePage } from "~/utils/serverActions";

const Navbar = async () => {
  const { userId } = auth();
  return (
    <div className="flex h-16 items-center px-2">
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
    </div>
  );
};

export default Navbar;
