import { useState, useEffect } from 'react';
import { useProject } from '../hooks/useProject.jsx'
import Button from '../components/Button.jsx';
import ProjectPopup from './popup/ProjectPopup.jsx';

import Projects from './Projects.jsx';
const Body = () => {
    const { getProjects,
        addProject,
        editProject,
        isLoading,
        projectCreateSuccess,
        setProjectCreateSuccess,
        projectUpdateSuccess,
        setProjectUpdateSuccess,
        deleteProject,
        projectDeleteSuccess,
        setProjectDeleteSuccess
    } = useProject();

    const [ projectsData, setProjectsData ] = useState([]);
    const [ openPopup, setOpenPopup ] = useState(false);
    const [ individualProjectData, setIndividualProjectData ] = useState({});

    
    useEffect(() => {
        const getAllProjects = async () => {
            const data = await getProjects()
            setProjectsData(data);
        }

        getAllProjects();

    }, [])
    
    useEffect(() => {
        if (projectCreateSuccess?._id) { 
            setProjectsData([projectCreateSuccess, ...projectsData ]);
            setProjectCreateSuccess({});
        }

    }, [projectCreateSuccess])
    
    useEffect(() => {
        if (projectUpdateSuccess?._id) { 
            const newData = projectsData.map((project) => {
                if (project._id === projectUpdateSuccess?._id) {
                    project.description = projectUpdateSuccess.description;
                    project.title = projectUpdateSuccess.title;
                }
                return project
            })
            setProjectsData(newData);
            setProjectUpdateSuccess({});
        }

    }, [projectUpdateSuccess])
    
    useEffect(() => {
        if (projectDeleteSuccess?._id) {
            const newData = projectsData.filter((project) =>  project._id !== projectDeleteSuccess?._id)
            setProjectsData(newData);
            setProjectDeleteSuccess({});
      }
    
    }, [projectDeleteSuccess])   
    

    return (
        <div className='p-8 min-h-[789px] bg-slate-100'>
            <div className='flex h-9 gap-8'>
                <p className='text-2xl'>All Projects</p>
                <Button title="Add New Project" buttonType='primary' onClick={() => setOpenPopup(true)} />
            </div>
            <Projects
                projectsData={projectsData}
                setOpenPopup={setOpenPopup}
                setIndividualProjectData={setIndividualProjectData}
                deleteProject={deleteProject}
            />
            {
                openPopup &&
                <ProjectPopup
                    onClose={() => setOpenPopup(false)}
                    addProject={addProject}
                    editProject={editProject}
                    isLoading={isLoading}
                    projectUpdateSuccess={projectUpdateSuccess}
                    projectCreateSuccess={projectCreateSuccess}
                    individualProjectData={individualProjectData}   
                    setIndividualProjectData={setIndividualProjectData}
                />
            }
        </div>
    )
}

export default Body