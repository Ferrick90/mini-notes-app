# Mini Notes App Project

## Getting Started

### 1. Install Dependencies
To install the required dependencies, run:
```bash
npm install
```

### 2. Run Development Server
To start the development server, use:
```bash
npm run dev
```
This will start the Vite development server and provide a local URL for previewing the project.

### 3. Run Tests
To execute tests for the project:
```bash
npm test
```
Ensure all tests pass to validate the functionality of the project.

### 4. Build for Production
To generate a production build:
```bash
npm run build
```
The output will be available in the `dist` folder, which can be deployed to production.

---

## Using the Store
This project uses Redux for state management, with two main slices: `noteSlices` and `folderSlices`.

### noteSlices
- Manages state related to notes, such as creating, updating, and deleting notes.
- Example:
  ```js
  import { useSelector, useDispatch } from 'react-redux';
  import { addNote } from './store/noteSlices';

  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);

  dispatch(addNote({ title: 'New Note', content: 'Note content' }));
  ```

### folderSlices
- Handles folder-related state, such as creating and organizing folders.
- Example:
  ```js
  import { useSelector, useDispatch } from 'react-redux';
  import { addFolder } from './store/folderSlices';

  const dispatch = useDispatch();
  const folders = useSelector((state) => state.folders);

  dispatch(addFolder({ name: 'New Folder', slug: '/new-folder' }));
  ```

---

## Project File Structure

### `pages/`
Contains all page-level components, such as home, dashboard, and other route-specific views.

### `assets/`
Holds static assets like images, fonts, and other files used in the project.

### `components/`
Contains reusable UI components like buttons, modals, and form elements.

### `handlers/`
Includes custom hooks and handlers, such as `useFolderModalHandlers`, to encapsulate reusable logic.

### `models/`
Defines TypeScript interfaces and types for the project, such as `Folder` and `Note` models.

### `utils/`
Houses utility functions used across the application, such as helpers for formatting or slug generation.

### `websocket/`
Houses WebSocket-related functions used across the application to enable real-time communication.

---

## Using TailwindCSS
This project uses TailwindCSS for styling. TailwindCSS provides utility-first classes to style components efficiently.

### Setup
TailwindCSS is already configured in the project. You can start using it in components:

- Add classes directly in the JSX elements:
  ```jsx
  <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
    Click Me
  </button>
  ```

- To customize styles, edit the `tailwind.config.js` file to extend themes, add custom colors, or configure plugins.

### Documentation
Refer to the [TailwindCSS Documentation](https://tailwindcss.com/docs) for a complete guide to utility classes and customization options.

## Using Websocket
This project uses WebSockets to provide real-time state synchronization for notes and folders. It ensures that any updates made to notes or folders are immediately reflected across all connected clients, making the app more interactive and collaborative.

- The WebSocket connection is established to the WebSocket server using the following code:
```const ws = new WebSocket("ws://localhost:8080/"); ```

- This establishes a connection to the WebSocket server running at ws://localhost:8080/. If WebSocket server is running on a different port or URL, make sure to update this accordingly.

