import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProject } from '../hooks/useProject';
import { useTask } from '../hooks/useTask';
import Task from './Task';
import Button from '../components/Button';

const ProjectDetails = () => {
    const { projectId } = useParams();
    const { getProjectDetails, projectSummary } = useProject();
    const { addTask,
        taskCreateSuccess,
        editTask,
        deleteTask,
        taskDeleteSuccess,
        setTaskDeleteSuccess,
        changeStatus,
        statusUpdateSuccess,
    } = useTask();

    const [ taskData, setTaskData ] = useState([]);
    const [ projectData, setProjectData ] = useState({});
    const [ task, setTask ] = useState('');
    
    const addingTask = () => {
        addTask(task, projectId);
        setTask("");
    }

    const exportProjectSummary = () => {
        projectSummary(projectId);

    }

    useEffect(() => {

        const projectDetails = async () => {
            const projectDetails = await getProjectDetails(projectId);
            setProjectData(projectDetails);
            setTaskData(projectDetails?.tasks);
        }

        projectDetails();
    }, [])

    useEffect(() => {
        if (taskCreateSuccess?._id) {
            setTaskData([taskCreateSuccess, ...taskData]);
      }
    
    }, [taskCreateSuccess])
    
    useEffect(() => {
        if (taskDeleteSuccess?._id) {
            const newData = taskData.filter((task) =>  task._id !== taskDeleteSuccess?._id)
            setTaskData(newData);
            setTaskDeleteSuccess({});
      }
    
    }, [taskDeleteSuccess])
    
    useEffect(() => {
        if (statusUpdateSuccess?._id) {
            const newData = taskData.map((task) => {
                if (task._id === statusUpdateSuccess?._id) {
                    task.status = statusUpdateSuccess?.status;
                }
                return task;
            })
            setTaskData(newData);
        }
    
    }, [statusUpdateSuccess])   

    return (
        <div className='mt-8 ml-8 gap-[50px]'>
            <div className='h-[100px] rounded-lg pt-4'>
                <p className='text-center text-3xl'>{projectData?.title} </p>
                <p className='text-center text-[#666666]'>{ projectData?.description}</p>
            </div>
            <div className='flex gap-10 justify-center'>
                <input
                    type="text"
                    placeholder="Task Name"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}   
                    className='w-[600px] h-10 px-2 border rounded outline-none focus:border-blue-300 placeholder-gray-600 '
                />
                <Button title="Add Task" buttonType="add" onClick={() => addingTask()}/> 
                <Button title="Project Summary" buttonType="auth" onClick={() => exportProjectSummary()}/> 
            </div>
            <div className='h-[585px] mt-8 overflow-y-auto' >
                <table className='w-full'>
                    <thead className='border'>
                        <tr className='text-left'>
                            <th className='px-4 py-2'>Task</th>
                            <th className='px-4 py-2'>Date</th>
                            <th className='px-4 py-2'>Status</th>
                            <th className='px-4 py-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        taskData?.length ? (
                            taskData?.map(task => (
                                <Task key={task._id} task={task} editTask={editTask} deleteTask={deleteTask} changeStatus={changeStatus} />
                            ))
                        ) : (
                                <></>
                        )}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default ProjectDetails;