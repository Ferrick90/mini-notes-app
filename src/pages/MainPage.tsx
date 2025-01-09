import { FC } from "react";
import FloatingButton from "../components/FloatingButton";
import FolderModal from "../components/FolderModal";
import Navbar from "../components/Navbar";
import NoteList from "../components/NoteList";
import NoteModal from "../components/NoteModal";
import { useMainPageHandlers } from "../handlers/useMainPageHandlers";
import Breadcrumb from "../components/Breadcrumb";

const MainPage: FC = () => {
  const {
    searchQuery,
    isCreateNoteModalOpen,
    isCreateFolderModalOpen,
    folder,
    note,
    setSearchQuery,
    openCreateFolderModal,
    openCreateNoteModal,
    closeModel,
    editNote,
    editFolder,
  } = useMainPageHandlers();

  // Hide the WebSocket functionality since the WebSocket server is not currently available.
  // const dispatch = useDispatch<AppDispatch>();
  // useEffect(() => {
  //   const ws = initializeWebSocket(dispatch);
  //   return () => {
  //     ws.close(); // Clean up the WebSocket connection on unmount
  //   };
  // }, [dispatch]);

  return (
    <div className="w-screen h-screen">
      <Navbar
        setSearchQuery={(searchQuery) => setSearchQuery(searchQuery)}
      ></Navbar>
      <Breadcrumb></Breadcrumb>
      <NoteList
        searchQuery={searchQuery}
        setSelectedFolder={editFolder}
        setSelectedNote={editNote}
      ></NoteList>
      <div className="lg:h-10"></div>
      <FloatingButton
        isSelectedNewFolder={openCreateFolderModal}
        isSelectedNewNote={openCreateNoteModal}
      ></FloatingButton>
      <FolderModal
        isVisible={isCreateFolderModalOpen}
        folder={folder}
        onCloseModal={closeModel}
      />
      <NoteModal
        isVisible={isCreateNoteModalOpen}
        note={note}
        onCloseModal={closeModel}
      />
    </div>
  );
};

export default MainPage;