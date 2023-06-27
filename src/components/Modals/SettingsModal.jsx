import Modal from "../Modal";
import { IoClose } from "../../Icons/icons";

const Settings = ({ isOpen, setIsOpen }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("settings submit");

    setIsOpen(false);
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
              setIsOpen(false);
            }}
            className="border-2 border-defaultBorder p-2 rounded-lg bg-defaultBG hover:bg-red outline-none focus:border-focusBorder focus:bg-red duration-300"
          >
            <IoClose className="text-light h-auto w-[22px]" />
          </button>
        </div>
        <div className="flex flex-col gap-4 h-full p-4">
          <div className="flex flex-col gap-4">
            <h1 className="text-light text-lg xl:text-xl font-semibold">
              Theme
            </h1>
            <div className="flex flex-row justify-between items-center px-1">
              <label
                htmlFor="theme"
                className="text-md text-semiLight font-semibold"
              >
                Theme
              </label>
              <select
                name="theme"
                className="bg-hoverBG text-light rounded-lg p-1 outline-none cursor-pointer border-2 border-transparent focus:border-focusBorder duration-300"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end p-4 gap-4">
          <button
            type="submit"
            className="border-2 text-light border-defaultBorder p-2 px-4 rounded-lg bg-defaultBG hover:bg-hoverBG focus:bg-hoverBG outline-none focus:border-focusBorder duration-300"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Settings;
