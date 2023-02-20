import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Search from './components/Search';
import TVs from './components/TVs';

function App() {
  return (
    <>
      <Router basename={`${process.env.PUBLIC_URL}`}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movies/:movieId' element={<Home />} />
          <Route path='/tv' element={<TVs />} />
          <Route path='/tv/:tvId' element={<TVs />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
