import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import deleteIcon from '../assets/icons/delete.svg'
import editIcon from '../assets/icons/edit.svg'
import smallIcon from '../assets/icons/smallIcon.svg'
import largeIcon from '../assets/icons/largeIcon.svg'

const ProjectTemplate = ({ data, setOpenPopup, setIndividualProjectData, deleteProject }) => {

    const navigate = useNavigate();

    const editProject = (e) => {
        e.stopPropagation();
        setOpenPopup(true);
        setIndividualProjectData(data);
    }

    const deleteIndividualProject = (e) => {
        e.stopPropagation();
        deleteProject({ projectId: data._id });
    }

    const handleClick = () => {
        navigate(`/project/${data._id}`);
      };
     
    return (
        <div className='h-[250px] w-[350px] flex flex-col gap-3 rounded-lg p-4 bg-white cursor-pointer' onClick={() => handleClick()}>
            <div className='flex justify-between'>
                <img src={largeIcon} alt='largeIcon' />
                <img src={smallIcon} alt='smallIcon' />
            </div>
            <div className='flex flex-col gap-2 h-[140px]'>
                <p className='text-2xl rounded'>{data?.title}</p>
                <p className='pt-2 text-[#666666] overflow-y-auto overflow-x-hidden'>{data?.description}</p>
            </div>
            <div className='flex justify-end gap-9 pr-2'>
                <img src={editIcon} alt='edit' onClick={(e) => editProject(e)} />
                <img src={deleteIcon} alt='delete' onClick={(e) => deleteIndividualProject(e)}/>
            </div>
        </div>
    )   
}

ProjectTemplate.propTypes = {
    data: PropTypes.object,
    setOpenPopup: PropTypes.func,
    setIndividualProjectData: PropTypes.func,
    deleteProject: PropTypes.func,
}
export default ProjectTemplate;