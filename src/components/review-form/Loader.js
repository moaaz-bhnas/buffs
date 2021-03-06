import { memo } from "react";
import styled from "styled-components";
import BeatLoader from "react-spinners/BeatLoader";
import { theme } from "../../utils/style";
import PropTypes from "prop-types";

const StyledLoader = styled.div`
  margin-top: ${({ isLoading }) => (isLoading ? "1rem" : null)};
`;

const Loader = ({ loading }) => {
  return (
    <StyledLoader isLoading={loading}>
      <BeatLoader color={theme.bg.grey4} loading={loading} size={10} />
    </StyledLoader>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool,
};

export default memo(Loader);
