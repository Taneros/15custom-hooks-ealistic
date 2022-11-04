import {useRef} from 'react';

import classes from './EditTaskForm.module.css';

const EditTaskForm = ({onEnterTask, loading}) => {
  const taskInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredValue = taskInputRef.current.value;

    if (enteredValue.trim().length > 0) {
      onEnterTask(enteredValue);
      taskInputRef.current.value = '';
      taskInputRef.current.focus();
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input type="text" ref={taskInputRef} />
      <button>{loading ? 'Sending...' : 'Add Task'}</button>
    </form>
  );
};

export default EditTaskForm;
