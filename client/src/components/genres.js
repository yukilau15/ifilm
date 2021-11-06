import axios from "axios";
import { useEffect } from "react";
import { Chip } from "@material-ui/core";
import "../App.css";

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
}) => {
  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);

    setGenres(genres.filter((g) => g.id !== genre.id));
  };

  const handleDelete = (genre) => {
    setSelectedGenres(selectedGenres.filter((s) => s.id !== genre.id));

    setGenres([...genres, genre]);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${TMDB_API_KEY}`
    );

    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({});
    };
  }, []);

  return (
    <div style={{ padding: "12px 0" }}>
      {selectedGenres &&
        selectedGenres.map((g) => (
          <Chip
            label={g.name}
            style={{ margin: 4 }}
            size="medium"
            color="primary"
            key={g.id}
            clickable
            onDelete={() => handleDelete(g)}
          />
        ))}
      {genres &&
        genres.map((g) => (
          <Chip
            label={g.name}
            style={{ margin: 4 }}
            size="medium"
            key={g.id}
            clickable
            onClick={() => handleAdd(g)}
          />
        ))}
    </div>
  );
};

export default Genres;
