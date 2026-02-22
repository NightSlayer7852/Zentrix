import { useRouter } from "next/navigation"
import { FaGithub } from "react-icons/fa"
import { AlertCircleIcon, GlobeIcon, Loader2Icon } from "lucide-react"

import { getProjectIcon } from "./projects-list"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

import { useProjects } from "../hooks/use-projects"
interface ProjectsCommandDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ProjectsCommandDialog = ({ open, onOpenChange }: ProjectsCommandDialogProps) => {
    const router = useRouter();
    const projects = useProjects();

    const onHandleSelect = (projectId: string) => {
        router.push(`/projects/${projectId}`);
        onOpenChange(false);
    };
    return (
        <CommandDialog open={open} onOpenChange={onOpenChange}
            title="Search Projects"
            description="Search and navigate to your projects"   
        >
            <CommandInput placeholder="Search Projects..." />
            <CommandList>
                <CommandEmpty>No projects found.</CommandEmpty>
                <CommandGroup heading="Your Projects">
                    {projects?.map(project => (
                        <CommandItem key={project._id} value={`${project.name}-${project._id}`} onSelect={() => onHandleSelect(project._id)}>
                            <div className="flex items-center gap-2">
                                {getProjectIcon(project)}
                                <span>{project.name}</span>
                            </div>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
};
