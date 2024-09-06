import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Blog from "@/pages/blog";
import Posts from "@/pages/posts";
import DesignSysteme from "@/pages/designSysteme";
import NotFound from "@/pages/notFound";
import Login from "@/pages/admin/login";
import Dashboard from "@/pages/admin/dashboard";
import PrivateRoute from "./privateRoute";
import EditPost from "@/pages/editPost";
import CreatePost from "@/pages/createPost";

const router = createBrowserRouter([
  {
    path: "/designSysteme",
    element: <DesignSysteme />,
  },
  {
    path: "/admin",
    element: <Login />,
  },
  {
    path: "admin/edit/:id",
    element: (
      <PrivateRoute>
        <EditPost />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin/create",
    element: (
      <PrivateRoute>
        <CreatePost />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/*",
    children: [
      { index: true, element: <Blog /> },
      { path: "post/:slug", element: <Posts /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
