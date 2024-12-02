import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs"


export default function Header() {
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-center text-2xl font-bold">VMD</h1>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                {/* <UserButton /> */}
                <SignOutButton />
            </SignedIn>
        </div>
    )
}

