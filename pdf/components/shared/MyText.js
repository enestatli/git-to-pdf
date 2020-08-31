import {Text} from 'react-native';
import styled from 'styled-components';
import {compose, color, size, typography, space, flexbox} from 'styled-system';

const MyText = styled(Text)(compose(color, size, typography, space, flexbox));

MyText.defaultProps = {
  color: 'textDark',
};

export default MyText;
