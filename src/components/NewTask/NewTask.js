import React, {useCallback} from 'react';
import useHttp from '../../hooks/use-http';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = ({onAddTask}) => {
  const {isLoading, error, sendRequest: postTasks} = useHttp();

  const tranformTask = useCallback(
    (taskText, taskObj) => {
      const generatedId = taskObj.name; // firebase-specific => "name" contains generated id
      const createdTask = {id: generatedId, text: taskText};

      onAddTask(createdTask);
    },
    [onAddTask],
  );

  const enterTaskHandler = async (taskText) => {
    postTasks(
      {
        url: 'https://custom-hooks-113a5-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {text: taskText},
      },
      // preconfigure the function
      tranformTask.bind(null, taskText),
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
