import { createBrowserRouter,  RouterProvider } from "react-router-dom"
import Blog from "@/pages/blog"
import Posts from "@/pages/posts"
import DesignSysteme from "@/pages/designSysteme"
import NotFound from "@/pages/notFound"

const router = createBrowserRouter([
  {
    path: "/designSysteme",
    element: <DesignSysteme />
  },
  {
    path: "/*",
    children: [
      { index: true, element: <Blog /> },
      {path: "post/:slug", element: <Posts /> },
      { path: "*", element: <NotFound /> },
    ],
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
