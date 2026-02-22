"use client";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
 } from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useProject, useRenameProjects } from "../hooks/use-projects";
import { CloudCheckIcon, LoaderIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
const font = Poppins({

    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const Navbar = ({ projectId }: { projectId: Id<"projects"> }) => {
    const projects = useProject(projectId);
    const renameProject = useRenameProjects(projectId);
    const [isRenaming, setIsRenaming] = useState(false);
    const [newName, setNewName] = useState("");
    const handleRename = () => {
        const trimmedName = newName.trim();
        if (newName.trim() === "" || trimmedName === projects?.name) {
            return;
        }
        renameProject({ id: projectId, name: newName });
        setIsRenaming(false);
    };
    return (
        <div className="flex justify-between items-center gap-x-2 p-2 border-b">
            <div className="flex items-center gap-x-2">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className="flex items-center gap-1.5 group/logo" asChild>
                                <Button variant="ghost" className="w-fit! p-1.5! h-7!">
                                    <Link href="/" className="flex items-center gap-1.5 group/logo">
                                        <Image
                                            src="/favicon.ico"
                                            alt="Zentrix Logo"
                                            width={20}
                                            height={20}
                                        />
                                        <span className={cn("text-sm font-medium", font)}>Zentrix</span>
                                    </Link>
                                </Button>
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator className="ml-0! mr-1" />

                        <BreadcrumbItem onClick={() => {setIsRenaming(true); setNewName(projects?.name ?? "")}}>
                            {isRenaming ? (
                                <input
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    onFocus = {(e) => e.target.select()}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleRename();
                                        if (e.key === "Escape") {
                                            setIsRenaming(false);
                                            setNewName(projects?.name ?? "");
                                        }
                                    }}
                                    autoFocus
                                    className="text-sm font-medium max-w-40 truncate bg-transparent text-foreground focus:ring-ring focus:ring-inset focus-ring-1"
                                />
                            ) : (
                                <BreadcrumbPage className="text-sm cursor-pointer hover:text-primary font-medium max-w-40 truncate">
                                    {projects?.name ?? "Loading..."}
                                </BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                {projects?.importStatus === "importing" ? (
                    <Tooltip>
                        <TooltipTrigger>
                            <LoaderIcon className="animate-spin size-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Importing...</p>
                        </TooltipContent>
                    </Tooltip>
                ) : (
                    <Tooltip>
                        <TooltipTrigger>
                            <CloudCheckIcon className="size-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                                <p>Saved {formatDistanceToNow(projects?.updatedAt ?? new Date(), { addSuffix: true })   }</p>
                        </TooltipContent>
                    </Tooltip>
                )}
            </div>
            <div className="flex items-center gap-x-2">
                <UserButton />
            </div>
        </div>
    )
}