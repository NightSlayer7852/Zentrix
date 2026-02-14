'use client'

import { ReactNode } from 'react'
import { Authenticated, AuthLoading, ConvexReactClient, Unauthenticated} from 'convex/react'

import { ConvexProviderWithClerk } from 'convex/react-clerk'
import {    useAuth, SignInButton, SignUpButton } from '@clerk/nextjs'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from './theme-provider'
import { dark } from "@clerk/themes";   
import { Button } from './ui/button'

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file')
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL)

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange >
            <ClerkProvider
                appearance={{
                    theme: dark,
                }}
            >
                <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                    <Authenticated>

                    {children}
                    </Authenticated>

                    <Unauthenticated>
                        <Button>
                            <SignInButton />
                        </Button>
                        <Button>
                            <SignUpButton />
                        </Button>
                    </Unauthenticated>
                    <AuthLoading>
                        <div className="flex items-center justify-center h-screen">
                            <p className="text-xl">Loading...</p>
                        </div>
                    </AuthLoading>
                </ConvexProviderWithClerk>

            </ClerkProvider>
        </ThemeProvider>
    )
}