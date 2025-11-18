import React from "react";
import "../components/Footer.css"

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 ">
      <div className="container text-center">

        <h5 className="mb-3">🎬 Movie Ticket Booking</h5>

        <p className="mb-1">
          Book your favorite movies anytime, anywhere.
        </p>

        <div className="social-icons my-3">
          <a
            href="#"
            className="text-light mx-2 fs-4"
            style={{ textDecoration: "none" }}
          >
            <i className="bi bi-facebook"></i>
          </a>
          <a
            href="#"
            className="text-light mx-2 fs-4"
            style={{ textDecoration: "none" }}
          >
            <i className="bi bi-instagram"></i>
          </a>
          <a
            href="#"
            className="text-light mx-2 fs-4"
            style={{ textDecoration: "none" }}
          >
            <i className="bi bi-twitter"></i>
          </a>
        </div>

        <p className="mb-0">
          © {new Date().getFullYear()} Movie Booking — All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
