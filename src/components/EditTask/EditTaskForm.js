import {useRef, useEffect} from 'react';

import classes from './EditTaskForm.module.css';

const EditTaskForm = ({onEnterTask, loading, editText}) => {
  const taskInputRef = useRef(null);

  useEffect(() => {
    if (taskInputRef?.current) taskInputRef.current.value = editText;
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredValue = taskInputRef?.current.value;

    if (enteredValue.trim().length > 0) {
      onEnterTask(enteredValue);
      taskInputRef.current.value = '';
      taskInputRef.current.focus();
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input type="text" ref={taskInputRef} />
      <button>{loading ? 'Sending...' : 'Edit Task'}</button>
    </form>
  );
};

export default EditTaskForm;
