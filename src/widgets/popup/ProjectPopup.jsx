import {useEffect} from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';

const ProjectPopup = ({
    onClose = () => { },
    addProject = () => { },
    editProject = () => { },
    projectCreateSuccess = {},
    projectUpdateSuccess = {},
    isLoading = false,
    individualProjectData = {},
    setIndividualProjectData={},
}) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    console.log('errors: ', errors);
    
    
    

    const onSubmit = async (values) => {
        if (individualProjectData._id) {
            editProject({ ...values, projectId: individualProjectData._id });

        } else {
            addProject(values);
        }

    }

    useEffect(() => {
        if (Object.keys(individualProjectData).length) {
            reset(individualProjectData);
        }
    }, [])

    useEffect(() => {
        if (projectCreateSuccess?._id || projectUpdateSuccess?._id) {
            reset();
            setIndividualProjectData({});
            onClose();
        }

    }, [projectCreateSuccess, projectUpdateSuccess])
    
    

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded w-[450px]">
                <h2 className="text-xl mb-4">New Project</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Input
                            name="title"
                            label="Project Name"
                            register={register}
                            errors={errors}
                            placeholder="Eg: Project 1"
                            required={true}
                            disabled={isLoading}
                        />
                        <TextArea
                            name="description"
                            label="Description"
                            register={register}
                            errors={errors}
                            placeholder="Eg: Project is about..."
                            required={true}
                            disabled={isLoading}
                        />
                        <div className="flex justify-end space-x-2 mt-4">
                            <Button title="Cancel" type='button' buttonType='secondary' onClick={() => onClose()} disabled={isLoading}/>
                            <Button title="Save" type="submit" buttonType='primary' disabled={isLoading}/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

ProjectPopup.propTypes = {
    onClose: PropTypes.func,
    addProject: PropTypes.func,
    editProject: PropTypes.func,
    projectCreateSuccess: PropTypes.object,
    projectUpdateSuccess: PropTypes.object,
    isLoading: PropTypes.bool,
    individualProjectData: PropTypes.object,
    setIndividualProjectData: PropTypes.func,
}

export default ProjectPopup