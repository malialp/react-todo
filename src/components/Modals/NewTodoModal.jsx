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
        className="mx-6 flex h-full max-h-[600px] w-full max-w-[500px] flex-col rounded-lg bg-light-background dark:bg-dark-background-2"
      >
        <div className="flex flex-row justify-end p-4 ">
          <button
            type="button"
            onClick={(e) => {
              e.target.parentElement.parentElement.reset();
              setTodo({});
              setIsOpen(false);
            }}
            className="rounded-lg border-2 p-2 text-dark-text outline-none duration-300 hover:bg-btn-red hover:text-light-text focus:border-light-border-focus focus:bg-btn-red focus:text-light-text dark:border-dark-border dark:text-light-text dark:focus:border-dark-border-focus"
          >
            <IoClose className="h-auto w-[22px]" />
          </button>
        </div>
        <div className="flex h-full flex-col gap-4 p-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="title"
              className="text-lg font-semibold text-dark-text dark:text-light-text xl:text-xl"
            >
              Title
            </label>
            <input
              className="rounded-lg border-2 border-light-border bg-light-background p-2 text-dark-text outline-none duration-300 focus:border-light-border-focus dark:border-dark-border dark:bg-dark-background-2 dark:text-light-text dark:focus:border-dark-border-focus"
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
              className="text-lg font-semibold text-dark-text dark:text-light-text xl:text-xl"
            >
              Description
            </label>
            <textarea
              className="max-h-[15em] min-h-[10em] rounded-lg border-2 border-light-border bg-light-background p-2 text-dark-text outline-none focus:border-light-border-focus dark:border-dark-border dark:bg-dark-background-2 dark:text-light-text dark:focus:border-dark-border-focus"
              maxLength={512}
              onChange={(e) => {
                setTodo((prev) => ({ ...prev, description: e.target.value }));
              }}
              name="description"
            ></textarea>
          </div>
        </div>
        <div className="flex flex-row justify-end gap-4 p-4">
          <button
            type="submit"
            className="rounded-lg border-2 border-light-border bg-light-background p-2 px-4 text-dark-text outline-none duration-300 hover:bg-light-background-2 focus:border-light-border-focus focus:bg-light-background-2 dark:border-dark-border dark:bg-dark-background-2 dark:text-light-text dark:hover:bg-dark-hover-background dark:focus:border-dark-border-focus dark:focus:bg-dark-hover-background"
          >
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default NewTodoModal;
