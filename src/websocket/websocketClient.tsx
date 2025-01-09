import { addFolder } from "../store/foldersSlice";
import { addNote } from "../store/notesSlice";
import { AppDispatch } from "../store/store";

export const initializeWebSocket = (dispatch: AppDispatch) => {
  const ws = new WebSocket("ws://localhost:8080/"); // Can use localhost ws server

  // Handle incoming WebSocket messages
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    handleWebSocketMessage(data, dispatch);
  };

  // Handle connection errors
  ws.onerror = () => {
    // console.error("WebSocket error:", error);
  };

  // Handle connection close
  ws.onclose = () => {
    // console.log("WebSocket connection closed");
  };

  return ws; // Return the WebSocket instance if needed
};

// Function to handle WebSocket messages
const handleWebSocketMessage = (data: any, dispatch: AppDispatch) => {
  switch (data.type) {
    case "new_note":
      dispatch(addNote(data.payload));
      break;
    case "new_folder":
      dispatch(addFolder(data.payload));
      break;
    default:
      console.warn("Unknown WebSocket message type:", data.type);
  }
};