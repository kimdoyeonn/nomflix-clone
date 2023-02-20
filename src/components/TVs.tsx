import { useQuery } from 'react-query';
import styled from 'styled-components';
import {
  getOnTheAirTv,
  getPopularTv,
  getTopRatedTv,
  IGetContentsResult,
} from '../api';
import { makeImagePath } from '../utils';
import ContentModal from './ContentModal';
import ContentRow from './ContentRow';

const Tvs = () => {
  const { data: topRateTv, isLoading: isTopRatedTvLoading } =
    useQuery<IGetContentsResult>(['tvs', 'topRatedTv'], getTopRatedTv);

  const { data: onTheAirTv, isLoading: isOnTheAirLoading } =
    useQuery<IGetContentsResult>(['tvs', 'upcomingTv'], getOnTheAirTv);

  const { data: popularTv, isLoading: isPopularTvLoading } =
    useQuery<IGetContentsResult>(['tvs', 'popularTv'], getPopularTv);

  return (
    <Container>
      {isTopRatedTvLoading || isOnTheAirLoading || isPopularTvLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              topRateTv?.results[0].backdrop_path ??
                (topRateTv?.results[0].poster_path || '')
            )}
          >
            <InfoWrapper>
              <Title>{topRateTv?.results[0].name}</Title>
              <Overview>{topRateTv?.results[0].overview}</Overview>
            </InfoWrapper>
          </Banner>
          <RowContainer>
            <ContentRow type='tv' data={topRateTv} title='Top Rated Tv Shows' />
            <ContentRow type='tv' data={onTheAirTv} title='Upcoming Tv Shows' />
            <ContentRow type='tv' data={popularTv} title='Popular Tv Shows' />
          </RowContainer>
          <ContentModal />
        </>
      )}
    </Container>
  );
};

export default Tvs;

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
