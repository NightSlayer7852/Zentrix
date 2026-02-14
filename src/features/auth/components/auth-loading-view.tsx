import { Spinner } from "@/components/ui/spinner";

export const AuthLoadingView = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Spinner />
            <p className="ml-4 text-xl">Loading...</p>
        </div>
    )
}