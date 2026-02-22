'use client'

import { ReactNode } from 'react'
import { Authenticated, AuthLoading, ConvexReactClient, Unauthenticated} from 'convex/react'

import { ConvexProviderWithClerk } from 'convex/react-clerk'
import {    useAuth, SignInButton, SignUpButton } from '@clerk/nextjs'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from './theme-provider'
import { dark } from "@clerk/themes";   
import { Button } from './ui/button'
import { UnauthenticatedView } from '@/features/auth/components/unauthenticated-view'
import { AuthLoadingView } from '@/features/auth/components/auth-loading-view'
import { TooltipProvider } from "../components/ui/tooltip"

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file')
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL)

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange >
            <TooltipProvider>
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
                        <UnauthenticatedView/>
                    </Unauthenticated>
                    <AuthLoading>
                       <AuthLoadingView />
                    </AuthLoading>
                </ConvexProviderWithClerk>

            </ClerkProvider>
            </TooltipProvider>
        </ThemeProvider>
    )
}