import PropTypes from 'prop-types'
import ProjectTemplate from './ProjectTemplate.jsx';

const Projects = ({ projectsData, setOpenPopup, setIndividualProjectData, deleteProject   }) => {
    return (
        <div className='flex flex-wrap gap-6 mt-10'>
            {projectsData.length ?
                 (
                    projectsData?.map((project) => (
                        <ProjectTemplate
                            data={project}
                            setOpenPopup={setOpenPopup}
                            setIndividualProjectData={setIndividualProjectData}
                            deleteProject={deleteProject}
                            key={project?._id} />
                    ))
                )
                :
                (
                    <p>No projects available</p>
                )
             }
        </div>
    )
}

Projects.propTypes = {
    projectsData: PropTypes.array,
    setOpenPopup: PropTypes.func,
    setIndividualProjectData: PropTypes.func,
    deleteProject: PropTypes.func,
}

export default Projects;