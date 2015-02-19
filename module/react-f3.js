import React from 'react/addons';
import clone from 'clone';

var cloneWithProps = React.addons.cloneWithProps;

class ReactFractionalFlex extends React.Component {

  static defaultProps = {
    textScale: 1,
    wF: 1,
    hF: 1,
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      alignSelf: 'center',
      alignContent: 'flex-start',
      justifyContent: 'center',
      overflow: 'auto'
    },
    ref: 'me'
  };

  state = { rootHeight: 0, rootWidth: 0 };

  render(){
    let { t, children, ...otherProps } = this.props;

    if (!otherProps.isFlexChild){
      otherProps.style.height = this.state.rootHeight * this.props.hF;
      otherProps.style.width = this.state.rootWidth * this.props.wF;
      if (this.props.wF === 1){
        otherProps.style.overflowX = 'hidden';
      }
      if (this.props.hF === 1){
        otherProps.style.overflowY = 'hidden';
      }
    } else {
      if (otherProps.wF){
        otherProps.style.width = (100 * otherProps.wF) + '%';
      }
      if (otherProps.hF){
        otherProps.style.height = (100 * otherProps.hF - 1) + '%';
      }
    }

    var flexKids = React.Children.map(this.props.children, child => {
      if (child.props){
        var newProps = {
          key: child.key,
          ref: child.ref,
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
      console.log(window.innerWidth, window.innerHeight, document.body.scrollWidth, document.body.scrollHeight);
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
