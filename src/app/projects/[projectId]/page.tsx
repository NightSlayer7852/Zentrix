import { Id } from "../../../../convex/_generated/dataModel";
import ProjectIdView from "@/features/projects/components/projectid-view";

type ProjectPageProps = {
  params: Promise<{ projectId: string }>;
};

const ProjectIdPage = async ({ params }: ProjectPageProps) => {
  const { projectId } = await params;

  return <ProjectIdView projectId={projectId as Id<"projects">} />;
};

export default ProjectIdPage;

// const ProjectIdPage = async({ params }: { params: Promise<{ projectId: Id<"projects"> }> }) => {
//     const { projectId } = await params;
    
//     return (
//         <ProjectIdView projectId={projectId} />
//     )
// }

// export default ProjectIdPage;
