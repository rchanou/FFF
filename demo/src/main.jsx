import React from 'react';
import F from '../../module/react-f3';

class Demo extends React.Component {

  state = { style: {} };

  render(){
    return <F t='div' hF={2}>
      <F t='div' wF={1/2} hF={1/4}>
        First Child
      </F>
      <F t='div' wF={1/2} hF={1/4}>
        <F t='div' wF={1/2} textScale={0.8}>
          SubChild
        </F>
        <F t='div' wF={1/2} textScale={1.2}>
          SubChild 2
        </F>
      </F>
      <F t='div' wF={1/2} hF={1/4}>
        Second Child
      </F>
      <F t='div' wF={1/2} hF={1/4}>
        Third Child
      </F>
    </F>;
  }

}

React.render(<Demo />, document.body);
//React.render(<Demo />, document.getElementById('main'));
