import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { FiSettings } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FaCheck, FaTrashCan } from "react-icons/fa6";

const initTodos = JSON.parse(localStorage.getItem("todos"))
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todos, setTodos] = useState(initTodos);
  const [todo, setTodo] = useState({});

  const [parent] = useAutoAnimate();

  const addTodo = (e) => {
    e.preventDefault();
    console.log(todo);

    let newTodo = {
      ...todo,
      id: nanoid(),
      status: false,
    };

    setTodos((prev) => [newTodo, ...prev]);

    setIsModalOpen(false);
    setTodo({});
    e.target.reset();
  };

  const completeTodo = (id) => {
    setTodos((prev) =>
      prev
        .map((todo) =>
          todo.id === id ? { ...todo, status: !todo.status } : todo
        )
        .sort((a, b) => a.status - b.status)
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) =>
      prev.filter((todo) => todo.id !== id).sort((a, b) => a.status - b.status)
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="container mx-auto h-full flex flex-col">
      <div className="flex flex-row items-center p-4 gap-4 ">
        <button className="border-[2px] border-defaultBorder p-2 rounded-lg bg-defaultBG hover:bg-hoverBG outline-none focus:border-focusBorder duration-300">
          <FiSettings className="text-light h-auto w-[22px]" />
        </button>
        <input
          className="border-[2px] border-defaultBorder p-2 rounded-lg bg-defaultBG hover:bg-hoverBG flex-1 text-light outline-none focus:border-focusBorder duration-300"
          type="text"
          placeholder="Search"
        />
        <button className="border-[2px] border-defaultBorder p-2 rounded-lg bg-defaultBG hover:bg-hoverBG outline-none focus:border-focusBorder duration-300">
          <BsThreeDotsVertical className="text-light h-auto w-[22px]" />
        </button>
      </div>
      <div className="flex flex-col p-4 h-full overflow-y-auto gap-4">
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="border-[2px] border-defaultBorder hover:bg-defaultBG outline-none focus:border-focusBorder text-center text-light text-xl font-semibold rounded-lg p-4 duration-300"
        >
          New Todo
        </button>
        <Scrollbars autoHide>
          <div ref={parent}>
            {todos.map((todo) => (
              <div
                key={todo.id}
                className={`${
                  todo.status && "opacity-50"
                } bg-defaultBG border-[2px] border-defaultBorder rounded-lg mb-4 p-3 flex flex-row gap-4`}
              >
                <div className="flex flex-col gap-2 flex-1 justify-evenly">
                  <h1
                    className={`text-light text-[22px] font-semibold ${
                      todo.status && "line-through"
                    }`}
                  >
                    {todo.title}
                  </h1>
                  <p
                    className={`text-semiLight text-[16px] ${
                      todo.status && "line-through"
                    }`}
                  >
                    {todo.description}
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-4">
                  <button
                    onClick={() => {
                      completeTodo(todo.id);
                    }}
                    className="border-[2px] border-defaultBorder p-2 rounded-lg bg-defaultBG hover:bg-green outline-none focus:border-focusBorder duration-300"
                  >
                    <FaCheck className="text-light" />
                  </button>
                  <button
                    onClick={() => {
                      deleteTodo(todo.id);
                    }}
                    className="border-[2px] border-defaultBorder p-2 rounded-lg bg-defaultBG hover:bg-red outline-none focus:border-focusBorder duration-300"
                  >
                    <FaTrashCan className="text-light" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Scrollbars>
      </div>

      {/* Modal */}

      <div
        className={`${
          !isModalOpen && "hidden"
        } fixed z-10 left-0 top-0 w-full h-full overflow-hidden bg-modalBG flex justify-center items-center`}
      >
        <form
          onSubmit={addTodo}
          className="bg-defaultBG max-w-[500px] max-h-[600px] w-full h-full mx-6 rounded-lg flex flex-col"
        >
          <div className="flex flex-row justify-end p-4 ">
            <button
              type="button"
              onClick={(e) => {
                e.target.parentElement.parentElement.reset();
                setTodo({});
                setIsModalOpen(false);
              }}
              className="border-[2px] border-defaultBorder p-2 rounded-lg bg-defaultBG hover:bg-red outline-none focus:border-focusBorder duration-300"
            >
              <IoClose className="text-light h-auto w-[22px]" />
            </button>
          </div>
          <div className="flex flex-col gap-4 h-full p-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="title"
                className="text-light text-lg font-semibold"
              >
                Title
              </label>
              <input
                className="border-[2px] border-defaultBorder p-2 rounded-lg bg-defaultBG text-light outline-none focus:border-focusBorder duration-300"
                onChange={(e) => {
                  setTodo((prev) => ({ ...prev, title: e.target.value }));
                }}
                type="text"
                name="title"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="description"
                className="text-light text-lg font-semibold"
              >
                Description
              </label>
              <textarea
                className="border-[2px] border-defaultBorder p-2 rounded-lg bg-defaultBG text-light outline-none focus:border-focusBorder min-h-[10em] max-h-[15em]"
                maxLength={512}
                onChange={(e) => {
                  setTodo((prev) => ({ ...prev, description: e.target.value }));
                }}
                name="description"
              ></textarea>
            </div>
          </div>
          <div className="flex flex-row justify-end p-4 gap-4">
            <button
              type="submit"
              className="border-[2px] text-light border-defaultBorder p-2 px-4 rounded-lg bg-defaultBG hover:bg-hoverBG outline-none focus:border-focusBorder duration-300"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
