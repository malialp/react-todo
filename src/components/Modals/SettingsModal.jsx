import Modal from "../Modal";
import { IoClose } from "../../Icons/icons";
import { useDispatch, useSelector } from "react-redux";
import { updateSettings } from "../../Store/slices/settingSlice";

const Settings = ({ isOpen, setIsOpen }) => {
  const settings = useSelector((state) => state.settings.value);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("settings submit");

    setIsOpen(false);
    e.target.reset();
  };

  const handleTheme = (e) => {
    dispatch(updateSettings({ theme: e.target.value }));
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
              setIsOpen(false);
            }}
            className="rounded-lg border-2 p-2 text-dark-text outline-none duration-300 hover:border-btn-red hover:bg-btn-red hover:text-light-text focus:border-btn-red focus:bg-btn-red focus:text-light-text dark:border-dark-border dark:text-light-text dark:focus:border-dark-border-focus"
          >
            <IoClose className="text-lightText h-auto w-[22px]" />
          </button>
        </div>
        <div className="flex h-full flex-col gap-4 p-4">
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold text-dark-text dark:text-light-text xl:text-xl">
              Theme
            </h1>
            <div className="flex flex-row items-center justify-between px-1">
              <label
                htmlFor="theme"
                className="text-md font-semibold text-dark-text-2 dark:text-light-text-2"
              >
                Theme
              </label>
              <select
                name="theme"
                onChange={handleTheme}
                value={settings.theme}
                className="cursor-pointer rounded-lg border-2 border-transparent bg-light-background p-1 text-dark-text outline-none duration-300 dark:bg-dark-background-2 dark:text-light-text"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
          <div className="flex h-full items-center justify-center">
            <h1 className="text-xl text-dark-text-2 dark:text-light-text-2">
              More coming soon...
            </h1>
          </div>
        </div>
        <div className="flex flex-row justify-end gap-4 p-4">
          <button
            type="submit"
            className="rounded-lg border-2 border-light-border bg-light-background p-2 px-4 text-dark-text outline-none duration-300 hover:bg-light-background-2 focus:border-light-border-focus focus:bg-light-background-2 dark:border-dark-border dark:bg-dark-background-2 dark:text-light-text dark:hover:bg-dark-hover-background dark:focus:border-dark-border-focus dark:focus:bg-dark-hover-background"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Settings;
