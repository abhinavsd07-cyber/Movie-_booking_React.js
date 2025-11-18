import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";

const EditMovie = () => {
  const { id } = useParams();
  const [form, setForm] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/movies/${id}`).then((res) => {
      setForm(res.data);
    });
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await axios.put(`http://localhost:3000/movies/${id}`, form);
    alert("Movie Updated Successfully!");
  };

  return (
    <div className="container mt-4">
      <h2>Edit Movie</h2>

      <TextField
        label="Movie Name"
        name="name"
        fullWidth
        margin="normal"
        value={form.name || ""}
        onChange={handleChange}
      />

      <TextField
        label="Director"
        name="director"
        fullWidth
        margin="normal"
        value={form.director || ""}
        onChange={handleChange}
      />

      <TextField
        label="Genre"
        name="genre"
        fullWidth
        margin="normal"
        value={form.genre || ""}
        onChange={handleChange}
      />

      <TextField
        label="Year"
        name="year"
        type="number"
        fullWidth
        margin="normal"
        value={form.year || ""}
        onChange={handleChange}
      />

      <TextField
        label="Rating"
        name="rating"
        type="number"
        fullWidth
        margin="normal"
        value={form.rating || ""}
        onChange={handleChange}
      />

      <TextField
        label="Poster URL"
        name="poster"
        fullWidth
        margin="normal"
        value={form.poster || ""}
        onChange={handleChange}
      />

      <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
        Save Changes
      </Button>
    </div>
  );
};

export default EditMovie;
