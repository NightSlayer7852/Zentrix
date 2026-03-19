import { Id } from "../../../../convex/_generated/dataModel";
import { ProjectIdLayout } from "@/features/projects/components/projectid-layout";

type ProjectLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ projectId: string }>;
};

const Layout = async ({ children, params }: ProjectLayoutProps) => {
  const { projectId } = await params;

  return <ProjectIdLayout projectId={projectId as Id<"projects">}>{children}</ProjectIdLayout>;
};

export default Layout;
// import { Id } from "../../../../convex/_generated/dataModel";
// import { ProjectIdLayout } from "@/features/projects/components/projectid-layout";
// const Layout = async ({ children, params }: { children: React.ReactNode; params: { projectId: Id<"projects"> } }) => {
//     const { projectId } = await params;
//     return (
//         <ProjectIdLayout projectId={projectId}>
//             {children}
//         </ProjectIdLayout>
//     )

// }

// export default Layout;  
