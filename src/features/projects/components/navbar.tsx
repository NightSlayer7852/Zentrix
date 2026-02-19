"use client";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Id } from "../../../../convex/_generated/dataModel";
import { useProject, useRenameProjects } from "../hooks/use-projects";

const font = Poppins({

    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const Navbar = ({ projectId }: { projectId: Id<"projects"> }) => {
    const projects = useProject(projectId);

    const renameProject = useRenameProjects(projectId);
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

                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-sm cursor-pointer hover:text-primary font-medium max-w-40 truncate">
                            {projects?.name ?? "Loading..."}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                                        </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex items-center gap-x-2">
                <UserButton />
            </div>
        </div>
    )
}