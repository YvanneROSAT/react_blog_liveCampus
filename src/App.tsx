import { createBrowserRouter,  RouterProvider } from "react-router-dom"
import Blog from "@/pages/blog"
import Posts from "@/pages/posts"
import DesignSysteme from "@/pages/designSysteme"

const router = createBrowserRouter([
  {
    path: "/designSysteme",
    element: <DesignSysteme />
  },
  {
    path: "/blog/*",
    children: [
      // New blog index route
      { index: true, element: <Blog /> },
      // Blog subapp splat route added for /blog/posts matching
      { path: "*", element: <Posts /> },
    ],
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
