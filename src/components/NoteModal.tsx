import { FC, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"; // for snow theme
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Note } from "../models/note";
import { addNote, updateNote } from "../store/notesSlice";
import { useNoteModalHandlers } from "../handlers/useNoteModalHandlers";

type NoteModalProps = {
  isVisible: boolean;
  note: Note | null;
  onCloseModal: () => void;
};

const NoteModal: FC<NoteModalProps> = ({ isVisible, note, onCloseModal }) => {
  const {
    name,
    details,
    showError,
    setName,
    setDetails,
    validateInputs,
    resetModal,
  } = useNoteModalHandlers();

  const dispatch = useDispatch();
  const location = useLocation();

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
      [{ color: [] }, { background: [] }],
    ],
  };

  useEffect(() => {
    if (note) {
      setName(note.name);
      setDetails(note.text);
    }
  }, [note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateInputs()) {
      if (note) {
        const updatedNote: Note = {
          ...note,
          name,
          text: details,
          date: new Date().getTime(),
        };
        dispatch(updateNote(updatedNote));
      } else {
        const newNote: Note = {
          id: uuid(),
          name,
          text: details,
          date: new Date().getTime(),
          folder: location.pathname,
        };
        dispatch(addNote(newNote));
      }
      handleClose();
    }
  };

  const handleClose = () => {
    resetModal();
    onCloseModal();
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={handleClose}
      className="overflow-y-auto overflow-x-hidden fixed z-50 place-items-center w-full inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm transition-opacity duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative p-4 w-full max-w-2xl max-h-full"
      >
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {note ? "Edit" : "Create"} Note
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <form className="p-4 md:p-5 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Note Name
              </label>
              <input
                type="text"
                className="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Note A"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>

            {/* TODO: temporary fix ReactQuill background color to use padding bottom */}
            <div className="w-full text-black sm:pb-[42px] pb-[68px] dark:bg-white">
              <ReactQuill
                className="h-[250px]"
                value={details}
                onChange={(value) => setDetails(value)}
                modules={quillModules}
                placeholder="Note....."
              />
            </div>

            {showError && (
              <div className="text-red-50 text-sm text-red-600">
                Require to fill in the fields
              </div>
            )}
          </form>

          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              onClick={(e) => {
                handleSubmit(e);
              }}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
            <button
              onClick={handleClose}
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
