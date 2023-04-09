import { useState } from "react";

export const TodoItem = ({
  id,
  isCompleted,
  todo,
  deleteTodoItem,
  updateTodo,
}) => {
  const [edited, setEdited] = useState(false);
  const [_todo, setTodo] = useState(todo);

  const modifyTodo = (flag) => {
    setEdited((prev) => !prev);
    if (flag) setTodo((prev) => (prev = todo));
  };

  const createUtData = (id) => {
    const utData = {
      isCompleted: !isCompleted,
      todo: _todo,
    };

    updateTodo(id, utData);
    setEdited((prev) => !prev);
  };

  const keyupEvent = (e) => {
    setTodo((prev) => (prev = e.target.value));
  };

  return (
    <li className="list-none">
      {edited ? (
        <label className="flex gap-3 items-center">
          <input
            className="text-xl rounded-lg border-gray-900 border-solid border-2 px-2 w-[20%]"
            data-testid="modify-input"
            onKeyUp={keyupEvent}
            defaultValue={_todo}
          />
          <button
            className="bg-teal-500 p-[10px] text-white font-bold text-xl rounded-lg"
            data-testid="submit-button"
            onClick={(e) => createUtData(id, e)}
          >
            제출
          </button>
          <button
            className="bg-teal-500 p-[10px] text-white font-bold text-xl rounded-lg"
            data-testid="cancel-button"
            onClick={modifyTodo}
          >
            취소
          </button>
        </label>
      ) : (
        <label className="flex gap-3 items-center">
          <input
            className="w-6 h-6 rounded-lg"
            type="checkbox"
            onClick={(e) => updateTodo(id, e)}
            defaultChecked={isCompleted}
          />
          <span className="w-[30%] text-left">{_todo}</span>
          <button
            className="bg-teal-500 p-[10px] text-white font-bold text-xl rounded-lg"
            data-testid="modify-button"
            onClick={(e) => modifyTodo(false, e)}
          >
            수정
          </button>
          <button
            className="bg-teal-500 p-[10px] text-white font-bold text-xl rounded-lg"
            data-testid="delete-button"
            onClick={() => deleteTodoItem(id)}
          >
            삭제
          </button>
        </label>
      )}
    </li>
  );
};
