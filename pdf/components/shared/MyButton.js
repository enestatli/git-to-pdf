import {TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {
  compose,
  color,
  size,
  space,
  flexbox,
  layout,
  borderRadius,
  position,
} from 'styled-system';

const MyButton = styled(TouchableOpacity)(
  compose(flexbox, space, color, size, layout, borderRadius, position),
);

MyButton.defaultProps = {
  flexDirection: 'row',
  alignItems: 'center',
  justfiyContent: 'center',
};

export default MyButton;
