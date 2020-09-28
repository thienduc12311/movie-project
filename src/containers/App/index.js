import React from 'react';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import FilmCarousel from '../FilmCarousel';
import MovieCollection from '../MovieCollection';
import MovieNav from '../MovieNav';
import FilmSearchBox from '../FilmSearchBox';

export const App = () => {
  return (
    // <SignUp />
    // <SignIn />
    <div className="movie-collection">
      <MovieCollection />
    </div>
    // <FilmCarousel />
    // <MovieNav />
    // <FilmSearchBox />
  );
};
export default App;
