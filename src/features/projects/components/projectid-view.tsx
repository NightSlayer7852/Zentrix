"use client"
import { useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { FaGithub } from "react-icons/fa";

const Tab = ({ isActive, label, onClick }: { isActive: boolean; label: string; onClick: () => void }) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 h-full cursor-pointer px-3 text-muted-foreground border-r hover:bg-accent/30"
                ,isActive && "bg-background text-foreground"
            )}
        >
            {label}
        </div>
    )
} 

const ProjectIdView = ({ projectId }: { projectId: Id<"projects"> }) => {
    const [activeView, setActiveView] = useState<"code" | "preview">("code");
    return (
        <div className="h-full flex flex-col">
            <nav className="h-8.75 flex items-center bg-sidebar">
                <Tab isActive={activeView === "code"} label="Code " onClick={() => setActiveView("code")} />
                <Tab isActive={activeView === "preview"} label="Preview" onClick={() => setActiveView("preview")} />
                <div className = "flex-1 flex justify-end h-full">
                    <div className="flex items-center gap-1.5 h-full cursor-pointer px-3 text-muted-foreground border-l hover:bg-accent/30">
                        <FaGithub className="size-3.5" />
                        <span className="text-sm">Export</span>
                    </div>
                </div>
            </nav>
                <div className="flex-1 relative">
                    <div className={cn("absolute inset-0", activeView === "code" ? "visible" : "invisible")}>
                        <div>
                            Code view for project {projectId}
                        </div>
                    </div>
                    <div className={cn("absolute inset-0", activeView === "preview" ? "visible" : "invisible")}>
                        <div>
                            Preview view for project {projectId}
                        </div>
                    </div>
                </div>
            
        </div>
    )
}

export default ProjectIdView;
