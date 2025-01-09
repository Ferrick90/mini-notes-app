import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Folder } from "../models/folder";
import { Note } from "../models/note";
import { AppDispatch, RootState } from "../store/store";
import { convertTimestampToFormattedDate } from "../utils/utils";
import { deleteNote } from "../store/notesSlice";
import { deleteFolder } from "../store/foldersSlice";

type CombinedItem = (Note & { type: "note" }) | (Folder & { type: "folder" }); // A field to distinguish between note and folder

type NoteListProps = {
  searchQuery: string;
  setSelectedFolder: (folder: Folder) => void;
  setSelectedNote: (note: Note) => void;
};

const NoteList: FC<NoteListProps> = ({
  searchQuery,
  setSelectedFolder,
  setSelectedNote,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  // Get folders and notes from the state
  const notes = useSelector((state: RootState) => state.notes.notes);
  const folders = useSelector((state: RootState) => state.folders.folders);

  const currentPath = location.pathname;

  // Redirect to 404 if no folder matches the current path
  useEffect(() => {
    if (
      currentPath !== "/" &&
      !folders.find((folder: Folder) => folder.slug?.startsWith(currentPath))
    ) {
      navigate("/404", { replace: true });
    }
  }, [currentPath, folders, navigate]);

  // Filter folders and notes based on current path
  const currentFolders = folders.filter((folder: Folder) => {
    if (currentPath === "/") {
      // Match folders starting with "/<something>", but not "/<something>/<subfolder>"
      return folder.slug?.split("/").length === 2;
    } else {
      // Match folders starting with "/currentPath/<subfolder>"
      return folder.slug?.startsWith(`${currentPath}/`);
    }
  });
  const currentNotes = notes.filter(
    (note: Note) => note.folder === currentPath
  );

  // Merge notes and folders arrays with a 'type' property to distinguish them
  const currentCombinedItems: CombinedItem[] = [
    ...currentNotes.map(
      (note: Note) => ({ ...note, type: "note" } as CombinedItem)
    ),
    ...currentFolders.map(
      (folder: Folder) => ({ ...folder, type: "folder" } as CombinedItem)
    ),
  ];

  // Global search: filter all folders and notes if a search query is present
  const globalCombinedItems: CombinedItem[] = [
    ...notes.map((note: Note) => ({ ...note, type: "note" } as CombinedItem)),
    ...folders.map(
      (folder: Folder) => ({ ...folder, type: "folder" } as CombinedItem)
    ),
  ];

  // Filter items based on the search query if provided, otherwise use the current combined items
  const filteredItems = searchQuery
    ? globalCombinedItems.filter((item) =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentCombinedItems;

  // Sort filtered items by date
  const sortedItems = filteredItems.sort((a, b) => b.date - a.date);

  const handleDeleteion = (item: CombinedItem) => {
    item.type === "note"
      ? dispatch(deleteNote(item))
      : dispatch(deleteFolder(item));
  };

  const handleSelection = (item: CombinedItem) => {
    item.type === "note" ? setSelectedNote(item) : setSelectedFolder(item);
  };

  const onClickItem = (item: CombinedItem) => {
    if (item.type === "note") {
      setSelectedNote(item);
    } else {
      navigate(item.slug);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 auto-rows-min max-w-screen-xl mx-auto lg:mt-5 rounded-none lg:rounded-md bg-[#e8e8e8] dark:bg-[#64748b] min-h-screen lg:min-h-[600px] p-4">
      {sortedItems.map((item, index) => {
        return (
          <div
            key={index}
            className={`${
              item.type === "folder" ? "bg-[#67d7cc]" : "bg-[#fef68a]"
            } rounded-md p-2 flex flex-col justify-between cursor-pointer dark:text-black`}
            onClick={() => onClickItem(item)}
          >
            <div className="flex flex-row items-center">
              {item.type === "folder" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-10 h-10"
                >
                  <path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8L10 4z" />
                </svg>
              )}
              <div
                className={`${
                  item.type === "folder" ? "ml-2" : "bg-[#fef68a]"
                } font-bold text-lg overflow-hidden text-ellipsis whitespace-nowrap`}
              >
                {item.name}
              </div>
            </div>
            {item.type === "note" && (
              <div
                className="ql-editor flex-1 !p-0 line-clamp-1"
                dangerouslySetInnerHTML={{ __html: item.text }}
              ></div>
            )}
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm">
                {convertTimestampToFormattedDate(item.date)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelection(item);
                }}
                className="p-2 bg-transparent border-none text-gray-600 hover:text-blue-600 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteion(item);
                }}
                className="p-2 bg-transparent border-none text-gray-600 hover:text-blue-600 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="red"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M3 6h18" />
                  <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NoteList;
