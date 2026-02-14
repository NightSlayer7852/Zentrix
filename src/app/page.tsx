"use client"
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";


export default function Home() {
  const projects = useQuery(api.projects.get);
  const createProject = useMutation(api.projects.create);
  return (
    <>
  
          <UserButton />
          <Button onClick={() => createProject({ name: "New Project" })}>
            Create Project
          </Button>
            <Card>
          <div className="p-8">
        {projects?.map((project) => (
              <div key={project._id}>
              <CardHeader>
                <h2 className="text-xl font-bold">{project.name}</h2>
              </CardHeader>
              <CardContent>
                <p>Owner ID: {project.ownerId}</p>
                <p>Import Status: {project.importStatus || "N/A"}</p>
              </CardContent>
             
            </div>
        ))}
          </div>  
        </Card>
        
        

              
      </>
  );
}