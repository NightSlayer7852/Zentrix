import { Kbd } from "@/components/ui/kbd";
import { useCreateProject, useProjectsPartial } from "../hooks/use-projects";
import { Spinner } from "@/components/ui/spinner";
import { Doc } from "../../../../convex/_generated/dataModel";
import { AlertCircle, ArrowRightIcon, GlobeIcon } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Alert } from "@/components/ui/alert";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const formatTimestamp = (timestamp: number) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
}

export const getProjectIcon = (project: Doc<"projects">) => {
    if (project.importStatus === "importing") {
        return <Spinner className="size-4 text-ring" />;
    }
    if (project.importStatus === "failed") {
        return <AlertCircle className="size-4" />;
    }
    if (project.importStatus === "completed") {
        return <FaGithub className="size-4" />;
    }
    return <GlobeIcon className="size-4" />;
}

interface ProjectsViewProps {
    onViewAll: () => void;
}

const ProjectItem = ({ data }: { data: Doc<"projects"> }) => {

    return <Link href={`/projects/${data._id}`} className="text-sm text-foreground/60 font-medium hover:text-foreground py-1 flex items-center justify-between w-full group">
        <div className="flex items-center gap-2">
            {getProjectIcon(data)}
        <span className = "truncate">{data.name}</span>
        </div>
        <span>{formatTimestamp(data.updatedAt)}</span>
    </Link>
}

const ContinueCard = ({ data }: { data: Doc<"projects"> }) => {
    return (<div className = "flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">Last updated</span>
        <Button variant="outline" className="h-auto items-start justify-start p-4 bg-background rounded-none flex flex-col gap-2">
            <Link href={`/projects/${data._id}`} className="group">
                <div className = "flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                        {getProjectIcon(data)}
                        <span className = "font-medium truncate">{data.name}</span>

                    </div>
                     {/* <ArrowRightIcon className="size-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" /> */}
                </div>
            </Link>
                <span className="text-xs text-muted-foreground">{formatTimestamp(data.updatedAt)}</span>
        </Button>
    </div>)
};

export const ProjectsList = ({ onViewAll }: ProjectsViewProps) => {
    const projects = useProjectsPartial({ limit: 6 });
    if (projects === undefined) {
        return <Spinner className="size-4 text-ring" />;
    }

    const [mostRecent, ...rest] = projects;

    return (
        <div className="flex flex-col gap-4">
            {mostRecent && <ContinueCard data = {mostRecent} />}

            {rest.length > 0 && (
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-muted-foreground">Recent Projects</span>
                        <button onClick={onViewAll} className="flex items-center gap-2 text-muted-foreground text-xs hover:text-foreground transition-colors">
                            <span>View All</span>
                            <Kbd className="bg-accent border">Ctrl+K</Kbd>
                        </button>
                    </div>
                    <ul className="flex flex-col">
                        {rest.map((project) => (
                            <ProjectItem key={project._id} data={project} />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
