import React from 'react';
import Flex from '../../module/react-fractional-flex';

class Demo extends React.Component {

  state = { style: {} };

  render(){
    return <Flex />;
  }

}

React.render(<Demo />, document.getElementById('main'));
