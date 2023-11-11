import Link from 'next/link'
import { headers, cookies } from 'next/headers'
import { createClient } from '@/lib/server'
import { redirect } from 'next/navigation'
import { ChevronLeftIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/')
  }

  const signUp = async (formData: FormData) => {
    'use server'

    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/login?message=Check email to continue sign in process')
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 justify-center gap-2">
      <Link
        href="/"
        className='flex items-center gap-2 text-foreground'
      >
        <ChevronLeftIcon />
        Back
      </Link>

      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={signIn}
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <Input
          name="email"
          placeholder="you@example.com"
          required
        />
        <Label className="text-md" htmlFor="password">
          Password
        </Label>
        <Input
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <Button >
          Sign In
        </Button>
        <Button
          formAction={signUp}
          variant={'outline'}
        >
          Sign Up
        </Button>
        {searchParams?.message && (
          <p className="mt-4 p-4  text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  )
}