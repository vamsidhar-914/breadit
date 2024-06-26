import Link from "next/link";
import { Icons } from "./Icons";
import { UserAuthForm } from "./UserAuthForm";

export function SignIn() {
  return (
    <div className='container mx-auto flex flex-col justify-center space-y-6 sm:w-[400px]'>
      <div className='flex flex-col space-y-2 text-center'>
        <Icons.logo className='mx-auto h-6 w-6' />
        <h1 className='text-2xl font-semibold tracking-light'>Welcome back</h1>
        <p className='text-sm max-w-xs mx-auto'>
          By continuing, You are setting up a breadit account and agree to our
          User agreement and privacy policy
        </p>

        {/* sign in form */}
        <UserAuthForm className='' />

        <p className='px-8 text-center text-sm text-zinc-700'>
          New to Breadit?{" "}
          <Link
            href='/sign-up'
            className='hover:text-zinc-sm underline underline-offset-4'
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
