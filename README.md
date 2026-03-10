## Project Management Dashboard

This is a React + Redux project management dashboard that lets you manage projects, tasks, and team members with drag-and-drop, charts, Formik forms, and a rich text editor.

### Tech stack

- **React + TypeScript + Vite**
- **Redux Toolkit** for global state (projects, tasks, team members)
- **React Router** for multi-page navigation
- **React DnD** for drag-and-drop Kanban board
- **Recharts** for live-updating task status chart
- **Formik + Yup** for forms and validation
- **React Quill** for rich text task descriptions

### Getting started

1. **Install dependencies**
  ```bash
   npm install
  ```
2. **Run the dev server**
  ```bash
   npm run dev
  ```
   Then open the printed URL in your browser (usually `http://localhost:5173`).
3. **Build for production **
  ```bash
   npm run build
   npm run preview
  ```

### Main features

- **Dashboard (`/dashboard`)**
  - See a list of projects in the sidebar.
  - Select a project and manage its tasks in a three-column Kanban board: **To Do**, **In Progress**, **Done**.
  - Drag tasks between columns; the Redux state and Recharts chart update in real time.
  - Add new projects and tasks using **Formik** forms with **Yup** validation (required fields show inline error messages).
- **Project details (`/project/:id`)**
  - View project information and assigned team members.
  - For each task, edit a **rich text description** using **React Quill**; changes are stored in Redux.
- **Settings (`/settings`)**
  - Toggle **light/dark theme**; the layout and colors adjust for each theme.

