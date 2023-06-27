import { useState } from "react";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { addTodo } from "../../Store/slices/todoSlice";
import { IoClose } from "../../Icons/icons";
import Modal from "../Modal";

const initTodo = { title: "", description: "" };

const NewTodoModal = ({ isOpen, setIsOpen }) => {
  const [todo, setTodo] = useState(initTodo);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    let newTodo = {
      ...todo,
      id: nanoid(),
      status: false,
    };

    dispatch(addTodo({ todo: newTodo }));

    setIsOpen(false);
    setTodo(initTodo);
    e.target.reset();
  };

  return (
    <Modal toggle={isOpen}>
      <form
        onSubmit={handleSubmit}
        className="bg-defaultBG max-w-[500px] max-h-[600px] w-full h-full mx-6 rounded-lg flex flex-col"
      >
        <div className="flex flex-row justify-end p-4 ">
          <button
            type="button"
            onClick={(e) => {
              e.target.parentElement.parentElement.reset();
              setTodo({});
              setIsOpen(false);
            }}
            className="border-2 border-defaultBorder p-2 rounded-lg bg-defaultBG hover:bg-red outline-none focus:border-focusBorder focus:bg-red duration-300"
          >
            <IoClose className="text-light h-auto w-[22px]" />
          </button>
        </div>
        <div className="flex flex-col gap-4 h-full p-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="title"
              className="text-light text-lg xl:text-xl font-semibold"
            >
              Title
            </label>
            <input
              className="border-2 border-defaultBorder p-2 rounded-lg bg-defaultBG text-light outline-none focus:border-focusBorder duration-300"
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
              className="text-light text-lg xl:text-xl font-semibold"
            >
              Description
            </label>
            <textarea
              className="border-2 border-defaultBorder p-2 rounded-lg bg-defaultBG text-light outline-none focus:border-focusBorder min-h-[10em] max-h-[15em]"
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
            className="border-2 text-light border-defaultBorder p-2 px-4 rounded-lg bg-defaultBG hover:bg-hoverBG outline-none focus:border-focusBorder focus:bg-hoverBG duration-300"
          >
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NewTodoModal;
