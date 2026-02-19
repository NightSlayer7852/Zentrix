import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { Id } from "../../../../convex/_generated/dataModel";

export const useProjects = () => {
    return useQuery(api.projects.get);
}

export const useProject = (id: Id<"projects">) => {
    return useQuery(api.projects.getById, { id });
}
export const useProjectsPartial = ({ limit }: { limit: number }) => {
    return useQuery(api.projects.getPartial, { limit }  );
}

export const useCreateProject = () => {
    const {userId} = useAuth();
    return useMutation(api.projects.create).withOptimisticUpdate((localStore, args) => {
        const existingProjects = localStore.getQuery(api.projects.get)

        if (existingProjects) {
            const newProject = {
                _id: crypto.randomUUID() as Id<"projects">,
                _creationTime: Date.now(),
                name: args.name,
                ownerId: userId!,
                updatedAt: Date.now(),
            }
            localStore.setQuery(api.projects.get, {},[newProject, ...existingProjects])
        }

    });
}

export const useRenameProjects = (projectId: Id<"projects">) => {
    return useMutation(api.projects.rename).withOptimisticUpdate((localStore, args) => {
        const existingProjects = localStore.getQuery(api.projects.get)

        if (existingProjects) {
            const updatedProjects = existingProjects.map(project => {
                if (project._id === projectId) {
                    return {
                        ...project,
                        name: args.name,
                    }
                } return project;
            })
            localStore.setQuery(api.projects.get, {}, updatedProjects)
        }   
    });
}