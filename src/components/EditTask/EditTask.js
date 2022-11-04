import React, {useCallback} from 'react';
import useHttp from '../../hooks/use-http';

import Section from '../UI/Section';
import EditTaskForm from './EditTaskForm';

const EditTask = ({onEditTask, task}) => {
  const {isLoading, error, sendRequest: editTask} = useHttp();
  const {text, id} = task;
  debugger;

  const tranformTask = useCallback(() => {
    onEditTask();
  }, [onEditTask]);

  const handleTaskEnter = async (taskText) => {
    editTask(
      {
        url: `https://custom-hooks-113a5-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}.json`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {text: taskText},
      },
      tranformTask,
    );
  };

  return (
    <Section>
      <EditTaskForm
        onEnterTask={handleTaskEnter}
        loading={isLoading}
        editText={text}
      />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default EditTask;
