import { useQuery } from 'react-query';
import styled from 'styled-components';
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  IGetContentsResult,
} from '../api';
import { makeImagePath } from '../utils';
import ContentModal from './ContentModal';
import ContentRow from './ContentRow';

const Home = () => {
  const { data: topRatedMovies, isLoading: isTopRatedMoviesLoading } =
    useQuery<IGetContentsResult>(
      ['movies', 'topRatedMovies'],
      getTopRatedMovies
    );

  const { data: upcomingMovies, isLoading: isUpcomingMoviesLoading } =
    useQuery<IGetContentsResult>(
      ['movies', 'upcomingMovies'],
      getUpcomingMovies
    );

  const { data: popularMovies, isLoading: isPopularMoviesLoading } =
    useQuery<IGetContentsResult>(['movies', 'popularMovies'], getPopularMovies);
  return (
    <Container>
      {isTopRatedMoviesLoading ||
      isUpcomingMoviesLoading ||
      isPopularMoviesLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              topRatedMovies?.results[0].backdrop_path ??
                (topRatedMovies?.results[0].poster_path || '')
            )}
          >
            <InfoWrapper>
              <Title>{topRatedMovies?.results[0].title}</Title>
              <Overview>{topRatedMovies?.results[0].overview}</Overview>
            </InfoWrapper>
          </Banner>
          <RowContainer>
            <ContentRow
              type='movie'
              data={topRatedMovies}
              title='Top Rated Movies'
            />
            <ContentRow
              type='movie'
              data={upcomingMovies}
              title='Upcoming Movies'
            />
            <ContentRow
              type='movie'
              data={popularMovies}
              title='Popular Movies'
            />
          </RowContainer>
          <ContentModal />
        </>
      )}
    </Container>
  );
};

export default Home;

const Container = styled.div`
  height: 200vh;
`;

const Loader = styled.div``;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const InfoWrapper = styled.div``;

const Title = styled.div`
  font-size: 3.5rem;
  margin-bottom: 20px;
  font-weight: 600;
`;

const Overview = styled.div`
  font-size: 2rem;
  width: 50%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-height: 1.1;
`;

const RowContainer = styled.div`
  margin-top: -5rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;
