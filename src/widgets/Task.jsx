import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';

const Task = ({ task, editTask = () => { }, changeStatus = () => { }, deleteTask = () => {} }) => { 
  
  const [ textareaDisabled, setTextareaDisabled ] = useState(true);
  const [ buttonText, setButtonText ] = useState('Edit');
  const [ taskText, setTaskText ] = useState(task?.task);

  const textAreaRef = useRef(null);
  const lastTaskText = useRef(taskText);
  const buttonRef = useRef(null);

  const handleEditing = () => {
    if (textareaDisabled) {
      setTextareaDisabled(false);
      setButtonText('Save');
    } else {
      saveTask();
    }
  };


  const saveTask = () => {
    setTextareaDisabled(true);
    setButtonText('Edit');
    editTask({ task: lastTaskText.current, taskId:task._id  });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = () => {
    deleteTask(task._id);
  } 

  const handleStatusChange = () => {
    const status = task?.status === 'PENDING' ? 'COMPLETED': 'PENDING' ;
    changeStatus(task._id, status)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (textAreaRef.current && !textAreaRef.current.contains(event.target) &&
          !buttonRef.current.contains(event.target) && !textareaDisabled) {
          saveTask();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [textareaDisabled]);



  useEffect(() => {
    lastTaskText.current = taskText; 
  }, [taskText]);

  return (
    <tr className='border p-2'>
      <td>
        <div className=''>
          <textarea
            ref={textAreaRef}
            disabled={textareaDisabled}
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            className='min-h-[100px] w-[550px] text-lg rounded'
          />
        </div>
      </td>
      <td>
        <p className='text-gray-600'>{formatDate(task?.createdAt)}</p>
      </td>
      <td>
        <p className={`h-10 w-[120px] pt-[6px] rounded text-center text-lg bg-slate-100 ${task?.status === 'PENDING' ? 'text-red-400' : 'text-green-400'}`}>{task?.status}</p>
      </td>
      <td>
        <div className='flex gap-4'>
          <Button ref={buttonRef} title={buttonText} buttonType='edit' onClick={() => handleEditing()} />
          <Button title="Change Status" buttonType='status' onClick={() => handleStatusChange()} />
          <Button title="Delete" buttonType='delete' onClick={() => handleDelete()}/>
        </div>
      </td>
    </tr>
  );
};

Task.propTypes = {
  task: PropTypes.object,
  editTask: PropTypes.func,
  changeStatus: PropTypes.func,
  deleteTask: PropTypes.func,
}

export default Task;