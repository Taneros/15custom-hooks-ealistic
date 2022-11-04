import React, {useEffect, useState, useCallback} from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

export const url =
  'https://custom-hooks-113a5-default-rtdb.europe-west1.firebasedatabase.app/tasks.json';

function App() {
  const [tasks, setTasks] = useState([]);

  const {isLoading, error, sendRequest: fetchTasks} = useHttp();

  const transformTask = useCallback((taskObj) => {
    const loadedTasks = [];

    for (const taskKey in taskObj) {
      loadedTasks.push({id: taskKey, text: taskObj[taskKey].text});
    }

    setTasks(loadedTasks);
  }, []);

  useEffect(() => {
    fetchTasks(
      {
        url,
      },
      transformTask,
    );
  }, []);

  const taskAddHandler = useCallback((task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  }, []);

  const onDelete = (id) => {
    fetchTasks(
      {
        url: `https://custom-hooks-113a5-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}.json`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      () => setTasks((tasks) => tasks.filter((item) => item.id !== id)),
    );
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
        onDelete={onDelete}
      />
    </React.Fragment>
  );
}

export default App;
