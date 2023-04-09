import { useCallback, useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { TodoItem } from "../components/todoItem";

export const Todo = () => {
  const [newtodo, setNewTodo] = useState(null);
  const [todoList, setTodoList] = useState([]);
  const { instance } = useAxios();
  const navi = useNavigate();

  const getTodoList = useCallback(async () => {
    const response = await instance.get("/todos");
    if (response.status === 200) {
      setTodoList((prev) => (prev = response.data));
    }
  }, [instance]);

  const addTodoItem = () => {
    const add = {
      todo: newtodo,
    };
    instance
      .post("/todos", add)
      .then((res) => setTodoList((prev) => [...prev, res.data]));
  };

  const keyUpEvent = (e) => {
    setNewTodo((prev) => (prev = e.target.value));
  };

  const deleteTodoItem = (key) => {
    instance.delete(`/todos/${key}`).then((res) => {
      if (res.status === 204) {
        const notDeletleList = todoList.filter((el) => el.id !== key);
        updateList(notDeletleList);
      }
    });
  };

  const updateTodo = (id, utData) => {
    instance.put(`/todos/${id}`, utData).then((res) => {
      if (res.status === 200) {
        const modifyList = todoList.map((el) => {
          return el.id === id ? { ...el, todo: res.data.todo } : el;
        });
        updateList(modifyList);
      }
    });
  };

  const updateList = (list) => {
    setTodoList((prev) => (prev = list));
  };

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token === null) navi("/signin");
    getTodoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col justify-center px-[5vw]">
      <span className="text-lg font-bold flex mb-4">할일</span>
      <div className="flex gap-1 mb-5 ">
        <input
          className="text-xl font-black rounded-lg border-gray-900 border-solid border-2 px-2 w-[450px]"
          data-testid="new-todo-input"
          onKeyUp={keyUpEvent}
        />
        <button
          className="bg-teal-500 p-[10px] text-white font-bold text-xl rounded-lg"
          data-testid="new-todo-add-button"
          onClick={addTodoItem}
        >
          추가
        </button>
      </div>
      <ul className="flex flex-col gap-4">
        {todoList &&
          todoList.map((el) => {
            return (
              <TodoItem
                key={el.id}
                {...el}
                deleteTodoItem={deleteTodoItem}
                updateTodo={updateTodo}
              />
            );
          })}
      </ul>
    </div>
  );
};
