import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosConfig from "../api/axiosConfig";
import { Container, Row, Col } from "react-bootstrap";
import MovieCard from "../components/MovieCard";
import Typography from "@mui/material/Typography";

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    const res = await axiosConfig.get(`/movies?q=${query}`);
    setResults(res.data);
  };

  useEffect(() => {
    fetchResults();
  }, [query]);

  return (
    <Container className="mt-4">
      <Typography variant="h5" mb={3}>
        🔍 Search Results for: <b>{query}</b>
      </Typography>

      <Row>
        {results.length > 0 ? (
          results.map((movie) => (
            <Col md={4} key={movie.id} className="mb-4">
              <MovieCard movie={movie} />
            </Col>
          ))
        ) : (
          <Typography>No movies found.</Typography>
        )}
      </Row>
    </Container>
  );
};

export default SearchResults;
