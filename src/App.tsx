import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFound } from "@/components";
import { Anime, Manga, Movie, Seiyuu } from "@/pages";

export default function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Anime />} />
          <Route path="/manga" element={<Manga />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/seiyuu" element={<Seiyuu />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}