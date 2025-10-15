import "@/app/App.css";

import { RouterProvider } from "react-router";
import { router } from "@/app/router/router";
import { UIProvider } from "@/context/UIContext";

function App() {
  return (
    <>
      <UIProvider>
        <RouterProvider router={router} />
      </UIProvider>
    </>
  )
}

export default App
