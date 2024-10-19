import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <SignIn forceRedirectUrl="/boards"/>
    </main>
  );
}
