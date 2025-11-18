import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComp from "./components/NavbarComp";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import BookTicket from "./pages/BookTicket";
import TicketSuccess from "./pages/TicketSuccess";
import Tickets from "./pages/Tickets";

const App = () => {
  return (
    <BrowserRouter>
      <NavbarComp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/book/:id" element={<BookTicket />} />
        <Route path="/ticket-success" element={<TicketSuccess />} />
        <Route path="/tickets" element={<Tickets />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
