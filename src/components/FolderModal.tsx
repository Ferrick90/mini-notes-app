import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import slugify from "slugify";
import { v4 as uuid } from "uuid";
import { useFolderModalHandlers } from "../handlers/useFolderModalHandlers";
import { Folder } from "../models/folder";
import { addFolder, updateFolder } from "../store/foldersSlice";
import { AppDispatch, RootState } from "../store/store";

type FolderModalProps = {
  isVisible: boolean;
  folder: Folder | null;
  onCloseModal: () => void;
};

const FolderModal: FC<FolderModalProps> = ({
  isVisible,
  folder,
  onCloseModal,
}) => {
  const { name, setName, showError, resetModal, validateInput } =
    useFolderModalHandlers(folder);

  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const folders = useSelector((state: RootState) => state.folders.folders);

  const generateUniqueSlug = (baseSlug: string, existingSlugs: string[]) => {
    let uniqueSlug = baseSlug;
    let counter = 1;

    // Check if the slug already exists and append a number if necessary
    while (existingSlugs.includes(uniqueSlug)) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    return uniqueSlug;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateInput()) {
      if (folder) {
        const updatedFolder: Folder = {
          ...folder,
          name,
          date: new Date().getTime(),
        };
        dispatch(updateFolder(updatedFolder));
      } else {
        const slugBase = slugify(name, { lower: true, strict: true });
        const existingSlugs = folders.map((f) => f.slug); // Assuming `folders` is available in the store
        const uniqueSlug = generateUniqueSlug(`/${slugBase}`, existingSlugs);

        // Ensure no redundant slashes in the combinedSlug
        const combinedSlug: string = location.pathname.endsWith("/")
          ? `${uniqueSlug}`
          : `${location.pathname}${uniqueSlug}`;

        const newFolder: Folder = {
          id: uuid(),
          name,
          slug: combinedSlug,
          date: new Date().getTime(),
        };

        dispatch(addFolder(newFolder));
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
              {folder ? "Edit" : "Create"} Folder
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
                Folder Name
              </label>
              <input
                type="text"
                className="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Document A"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>

            {showError && (
              <div className="text-red-50 text-sm text-red-600">
                Require to fill in the field
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

export default FolderModal;
