import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Locale } from '@/lib/i18n-config'

import { createClient } from '@/lib/middleware'

import { i18n } from '@/lib/i18n-config'
import { match as matchLocale } from '@formatjs/intl-localematcher' 
import Negotiator from 'negotiator'

export async function middleware(request: NextRequest) {

  // Localize path
  const pathname = request.nextUrl.pathname

    // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // // If you have one
  // if (
  //   [
  //     '/manifest.json',
  //     '/favicon.ico',
  //     // Your other files in `public`
  //   ].includes(pathname)
  // )
  //   return
  
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname}`,
        request.url  
      )
    )
  }

  // Create supabase client
  const { supabase, response } = await createClient(request) 
  
  // Refresh session
  await supabase.auth.getSession()

  return response
}

function getLocale(request: NextRequest): string | undefined {

  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  const locales = [...i18n.locales]
  
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  )
  return matchLocale(languages, locales, i18n.defaultLocale)
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|service-worker.js).*)'
  ]
}