import React from 'react';
import F from '../../module/react-f3';

class Demo extends React.Component {

  state = { style: {} };

  render(){
    return <F t='div'>
      <F t='div'>
        First Child
      </F>
      <F t='div'>
        <F t='div' textScale={0.8}>
          SubChild
        </F>
        <F t='div' textScale={1.2}>
          SubChild 2
        </F>
      </F>
      <F t='div'>
        First Child
      </F>
      <F t='div'>
        Second Child
      </F>
    </F>;
  }

}

React.render(<Demo />, document.getElementById('main'));
