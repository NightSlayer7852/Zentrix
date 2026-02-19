const ProjectIdPage = ({ params }: { params: { projectId: string } }) => {
    return (
        <div>
            <h1>Project {params.projectId}</h1>
        </div>
    )
}

export default ProjectIdPage;