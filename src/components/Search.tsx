import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { getSearchMovies, getSearchTvs, IGetContentsResult } from '../api';
import ContentModal from './ContentModal';
import ContentRow from './ContentRow';

const Search = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword');
  const { data: searchTvs, isLoading: isSearchTvsLoading } =
    useQuery<IGetContentsResult>(['tvs', 'search', keyword], (params) =>
      getSearchTvs(params.queryKey[2] as string)
    );

  const { data: searchMovies, isLoading: isSearchMoviesLoading } =
    useQuery<IGetContentsResult>(['movies', 'search', keyword], (params) =>
      getSearchMovies(params.queryKey[2] as string)
    );
  return (
    <Container>
      <Title>'{keyword}'에 대한 검색 결과</Title>
      {isSearchMoviesLoading || isSearchTvsLoading ? (
        <></>
      ) : (
        <>
          <RowContainer>
            <ContentRow type='tv' data={searchTvs} title='Tv Shows' />
            <ContentRow type='movie' data={searchMovies} title='Movie' />
          </RowContainer>
          <ContentModal />
        </>
      )}
    </Container>
  );
};

export default Search;

const Container = styled.div`
  margin-top: 5rem;
`;

const Title = styled.div`
  margin-left: 3rem;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
