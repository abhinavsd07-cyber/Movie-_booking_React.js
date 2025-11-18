import React, { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";

const AddMovie = () => {
  const [form, setForm] = useState({
    name: "",
    director: "",
    genre: "",
    year: "",
    rating: "",
    poster: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await axios.post("http://localhost:3000/movies", form);
    alert("Movie Added Successfully!");
  };

  return (
    <div className="container mt-4">
      <h2>Add Movie</h2>

      <TextField
        label="Movie Name"
        name="name"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />

      <TextField
        label="Director"
        name="director"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />

      <TextField
        label="Genre"
        name="genre"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />

      <TextField
        label="Year"
        name="year"
        type="number"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />

      <TextField
        label="Rating"
        name="rating"
        type="number"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />

      <TextField
        label="Poster URL"
        name="poster"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />

      <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
        Add Movie
      </Button>
    </div>
  );
};

export default AddMovie;
