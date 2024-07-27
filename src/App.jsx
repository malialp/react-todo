import { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, completeTodo } from "./Store/slices/todoSlice";

import { FiSettings, BsGithub, FaCheck, FaTrashCan } from "./Icons/icons";

import NewTodoModal from "./components/Modals/NewTodoModal";
import SettingsModal from "./components/Modals/SettingsModal";

const App = () => {
  const todos = useSelector((state) => state.todos.value);

  const [isNewTodoOpen, setIsNewTodoOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [searchParam, setSearchParam] = useState("");

  const [parent] = useAutoAnimate();
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTodo({ id }));
  };

  const handleComplete = (id) => {
    dispatch(completeTodo({ id }));
  };

  const filterSearch = (param) => {
    setSearchParam(param);
  };

  return (
    <div className="container mx-auto flex h-full flex-col">
      <div className="flex flex-row items-center gap-4 p-4 ">
        <button
          onClick={() => {
            setIsSettingsOpen(true);
          }}
          className="rounded-lg border-2 border-light-border p-2 outline-none duration-300 hover:bg-light-background-2 focus:border-light-border-focus dark:border-dark-border dark:bg-dark-background-2 dark:text-light-text dark:hover:bg-dark-hover-background dark:focus:border-dark-border-focus"
        >
          <FiSettings className="h-auto w-[22px]" />
        </button>
        <input
          className="flex-1 rounded-lg border-2 border-light-border p-2 outline-none duration-300 hover:bg-light-background-2 focus:border-light-border-focus dark:border-dark-border dark:bg-dark-background-2 dark:text-light-text dark:hover:bg-dark-hover-background dark:focus:border-dark-border-focus"
          type="text"
          onChange={(e) => filterSearch(e.target.value)}
          placeholder="Search"
        />
        <a
          href="https://github.com/malialp/react-todo"
          target="_blank"
          rel="noreferrer"
          className="cursor-pointer rounded-lg border-2 border-light-border p-2 outline-none duration-300 hover:bg-light-background-2 focus:border-light-border-focus dark:border-dark-border dark:bg-dark-background-2 dark:text-light-text dark:hover:bg-dark-hover-background dark:focus:border-dark-border-focus"
        >
          <BsGithub className="h-auto w-[22px]" />
        </a>
      </div>
      <div className="flex h-full flex-col gap-4 overflow-y-auto p-4">
        <button
          onClick={() => {
            setIsNewTodoOpen(true);
          }}
          className="rounded-lg border-2 border-light-border bg-transparent p-4 text-center text-xl font-semibold outline-none duration-300 hover:bg-light-background-2 focus:border-light-border-focus dark:border-dark-border dark:text-light-text dark:hover:bg-dark-hover-background dark:focus:border-dark-border-focus dark:focus:bg-dark-background-2"
        >
          New Todo
        </button>
        <Scrollbars autoHide>
          <div ref={parent}>
            {todos
              .filter(
                (e) =>
                  e.title.toLowerCase().indexOf(searchParam) > -1 ||
                  e.description.toLowerCase().indexOf(searchParam) > -1
              )
              .map((todo) => (
                <div
                  key={todo.id}
                  className={`${
                    todo.status && "opacity-50"
                  } mb-4 flex flex-row gap-4 rounded-lg border-2 border-light-border bg-light-background p-3 dark:border-dark-border dark:bg-dark-background-2`}
                >
                  <div className="flex flex-1 flex-col justify-evenly gap-2">
                    <h1
                      className={`text-[22px] font-semibold text-dark-text dark:text-light-text ${
                        todo.status && "line-through"
                      }`}
                    >
                      {todo.title}
                    </h1>
                    <p
                      className={`break-all text-[16px] text-dark-text-2 dark:text-light-text-2 ${
                        todo.status && "line-through"
                      }`}
                    >
                      {todo.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-4">
                    <button
                      onClick={() => {
                        handleComplete(todo.id);
                      }}
                      className="rounded-lg border-2 p-2 outline-none duration-300 hover:border-btn-green hover:bg-btn-green hover:text-light-text focus:border-btn-green focus:bg-btn-green focus:text-light-text dark:border-dark-border dark:text-light-text dark:focus:border-dark-border-focus"
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(todo.id);
                      }}
                      className="rounded-lg border-2 p-2 outline-none duration-300 hover:border-btn-red hover:bg-btn-red hover:text-light-text focus:border-btn-red focus:bg-btn-red focus:text-light-text dark:border-dark-border dark:text-light-text dark:focus:border-dark-border-focus"
                    >
                      <FaTrashCan />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </Scrollbars>
      </div>

      {/* Modal */}
      <NewTodoModal isOpen={isNewTodoOpen} setIsOpen={setIsNewTodoOpen} />
      <SettingsModal isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} />
    </div>
  );
};

export default App;
