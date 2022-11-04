import React, {useEffect, useState, useCallback} from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';
import EditTask from './components/EditTask/EditTask';

export const url =
  'https://custom-hooks-113a5-default-rtdb.europe-west1.firebasedatabase.app/tasks.json';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isEdit, setIsEdit] = useState(() => ({
    edit: false,
    task: {id: '', text: ''},
  }));

  const {isLoading, error, sendRequest} = useHttp();

  const transformTask = useCallback((taskObj) => {
    const loadedTasks = [];

    for (const taskKey in taskObj) {
      loadedTasks.push({id: taskKey, text: taskObj[taskKey].text});
    }

    setTasks(loadedTasks);
  }, []);

  const handleFetchTasks = () => {
    sendRequest(
      {
        url,
      },
      transformTask,
    );
  };

  useEffect(() => {
    handleFetchTasks();
  }, []);

  const onAddTask = useCallback((task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  }, []);

  const handleSubmitEdit = () => {
    handleFetchTasks();
    setIsEdit({edit: false, task: null});
  };

  const handleEditTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    setIsEdit({edit: true, task});
    debugger;
  };

  const handleDeleteTask = (id) => {
    sendRequest(
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
    <>
      {!isEdit.edit && <NewTask onAddTask={onAddTask} />}
      {isEdit.edit && (
        <EditTask onEditTask={handleSubmitEdit} task={isEdit.task} />
      )}
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={handleFetchTasks}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />
    </>
  );
}

export default App;
