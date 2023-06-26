import { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, completeTodo } from "./Store/slices/todoSlice";

import {
  FiSettings,
  BsThreeDotsVertical,
  FaCheck,
  FaTrashCan,
} from "./Icons/icons";
import NewTodoModal from "./components/Modals/NewTodoModal";

const App = () => {
  const todos = useSelector((state) => state.todos.value);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [parent] = useAutoAnimate();
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTodo({ id }));
  };

  const handleComplete = (id) => {
    dispatch(completeTodo({ id }));
  };

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
                    className={`text-semiLight text-[16px] break-all ${
                      todo.status && "line-through"
                    }`}
                  >
                    {todo.description}
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-4">
                  <button
                    onClick={() => {
                      handleComplete(todo.id);
                    }}
                    className="border-[2px] border-defaultBorder p-2 rounded-lg bg-defaultBG hover:bg-green outline-none focus:border-focusBorder duration-300"
                  >
                    <FaCheck className="text-light" />
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(todo.id);
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
      <NewTodoModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default App;
