import { Button } from "@/components/ui/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { ShieldAlertIcon } from "lucide-react";
export const UnauthenticatedView = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Item variant="outline">
                <ItemMedia variant = "icon">
                    <ShieldAlertIcon className="w-6 h-6" />
                </ItemMedia>
                <ItemContent>
                    <ItemTitle>Unauthenticated</ItemTitle>
                    <ItemDescription>You must be signed in to view this content.</ItemDescription>
                </ItemContent>
                <ItemActions>
                    <SignInButton>
                        <Button variant = "outline">Sign In</Button>
                    </SignInButton>
                    <SignUpButton>
                        <Button variant = "outline">Sign Up</Button>
                    </SignUpButton>

                </ItemActions>
            </Item>
        </div>
    )
}