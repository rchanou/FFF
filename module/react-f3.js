import React from 'react/addons';
import clone from 'clone';

var cloneWithProps = React.addons.cloneWithProps;

class ReactFractionalFlex extends React.Component {

  static defaultProps = {
    textScale: 1,
    wF: 1,
    hF: 1,
    style: {
      display: 'flex column',
      //alignSelf: 'center',
      //overflow: 'hidden'
    },
    ref: 'me'
  };

  state = { rootHeight: 200, rootWidth: 200 };

  render(){
    let { t, children, ...otherProps } = this.props;

    console.log(otherProps);
    if (otherProps.isFlexChild){
      otherProps.style.height = otherProps.parentStyle.height * otherProps.hF;
      otherProps.style.width = otherProps.parentStyle.width * otherProps.wF;
    } else {
      otherProps.style.height = this.state.rootHeight;
      otherProps.style.width = this.state.rootWidth;
    }

    var flexKids = React.Children.map(this.props.children, child => {
      if (child.props){
        var newProps = {
          key: child.key,
          ref: child.ref,
          parentStyle: clone(otherProps.style), // need cloning?
          isFlexChild: true
        };
        return cloneWithProps(child, newProps);
      } else {
        return child;
      }
    });

    return React.createElement(
      t,
      otherProps,
      flexKids
    );
  }


  componentDidMount(){
    var me = this.refs[this.props.ref].getDOMNode();

    this.fitText = () => {

      this.setState(
        { rootWidth: window.innerWidth, rootHeight: window.innerHeight },
        () => {
          var width = me.offsetWidth / 10 * this.props.textScale;
          //me.style.fontSize = width + 'px';
        }.bind(this)
      );
    }.bind(this);

    this.fitText();

    window.addEventListener('resize', this.fitText);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.fitText);
  }

}

export default ReactFractionalFlex;
