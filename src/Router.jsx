import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/*<Route path="/*" element={<Page404 />} />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
