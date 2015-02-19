import React from 'react';

class ReactFractionalFlex extends React.Component {

  static defaultProps = {
    textScale: 1,
    style: {
      display: 'flex',
      width: '100%',
      height: '100vh',
      alignSelf: 'center'
    },
    ref: 'me'
  };

  render(){
    let { t, children, ...otherProps } = this.props;

    return React.createElement(
      t,
      otherProps,
      children
    );
  }


  componentDidMount(){
    var me = this.refs[this.props.ref].getDOMNode();
    var hasReactParent = me.parentNode.hasAttribute('data-reactid');
    console.log(hasReactParent);

    this.fitText = () => {
      this.receiving = true;
      var width = me.offsetWidth / 10 * this.props.textScale;
      me.style.fontSize = width + 'px';

      if (hasReactParent){
        me.style.height = '100%';
      } else {
        me.style.height = '95vh';
      }
    }.bind(this);

    this.fitText();

    window.addEventListener('resize', this.fitText);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.fitText);
  }

}

export default ReactFractionalFlex;
