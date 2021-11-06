const useGenre = (selectedGenres) => {
  if (selectedGenres.legnth < 1) return "";

  const genreID = selectedGenres.map((g) => g.id);
  return genreID.reduce((acc, curr) => acc + "," + curr, "");
};

export default useGenre;
