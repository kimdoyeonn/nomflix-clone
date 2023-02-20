import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { useQuery } from 'react-query';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { getMovie, getTv, IDetailContent } from '../api';
import { contentModalState } from '../atoms';
import { makeImagePath } from '../utils';

const ContentModal = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { scrollY } = useScroll();
  const [contentModal, setContentModal] = useRecoilState(contentModalState);
  const isTv = useMatch('/tv/:tvId');
  const { data: detailData, isLoading: isDetailLoading } =
    useQuery<IDetailContent>(
      ['modal', isTv ? 'tv' : 'movie', isTv ? params.tvId : params.movieId],
      (params) =>
        isTv
          ? getTv(params.queryKey[2] as number)
          : getMovie(params.queryKey[2] as number)
    );
  const onOverlayClick = () => {
    setContentModal(null);
    if (isTv) {
      navigate('/tv');
    } else {
      navigate('/');
    }
  };
  return (
    <AnimatePresence>
      {contentModal ? (
        <>
          <Overlay
            onClick={onOverlayClick}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <BigMovie
            style={{ top: scrollY.get() + 100 }}
            layoutId={contentModal.layoutId}
          >
            {contentModal && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                      contentModal.backdrop_path ?? contentModal.poster_path,
                      'w500'
                    )})`,
                  }}
                />
                <BigTitle>
                  {isTv ? contentModal.name : contentModal.title}
                  {detailData?.vote_average ? (
                    <RatingWrapper>
                      Rating:
                      <Rating>{Math.ceil(detailData?.vote_average)}</Rating>/10
                    </RatingWrapper>
                  ) : null}
                  <SubWrapper>
                    {detailData?.genres.map(({ name }) => (
                      <BigSub key={name}>{name}</BigSub>
                    ))}
                  </SubWrapper>
                </BigTitle>
                <BigOverview>
                  {contentModal.overview}
                  {detailData?.created_by ? (
                    <CreatorWrapper>
                      {detailData?.created_by.map((creator) => (
                        <Creator key={creator.name}>
                          <img
                            src={makeImagePath(creator?.profile_path ?? '')}
                            alt={creator.name}
                          />
                          {creator.name}
                        </Creator>
                      ))}
                    </CreatorWrapper>
                  ) : null}
                </BigOverview>
              </>
            )}
          </BigMovie>
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default ContentModal;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 600px;
  left: 0;
  right: 0;
  margin: 0 auto;
  /* background-color: ${(props) => props.theme.black.darker}; */
  background-color: black;
  border-radius: 8px;
  overflow: scroll;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  font-weight: 600;
  position: relative;
  top: -160px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -180px;
  font-weight: 400;
  color: ${(props) => props.theme.white.lighter};
`;

const BigSub = styled.div`
  font-size: 1rem;
  font-weight: 400;
  /* position: relative;
  top: -100px; */
  &:not(:last-child)::after {
    content: ' /';
  }
`;

const SubWrapper = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const RatingWrapper = styled.div`
  font-size: 0.9rem;
  align-items: center;
  display: flex;
  font-weight: 500;
`;

const Rating = styled.div`
  margin-left: 0.5rem;
  margin-right: 0.25rem;
  font-size: 1.25rem;
  font-weight: 600;
`;

const CreatorWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Creator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.25rem;
  width: 6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 400;
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 9999px;
    object-position: center;
    object-fit: contain;
    border: 1px solid white;
  }
`;
