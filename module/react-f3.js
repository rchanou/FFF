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
      otherProps.style.position = 'relative';
      otherProps.style.top = this.state.topAdjust;
      otherProps.style.left = this.state.leftAdjust;
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

    var rect = me.getBoundingClientRect();
    this.setState({ topAdjust: -rect.top, leftAdjust: -rect.left });
    this.fitText = () => {
      this.setState(
        { rootWidth: window.innerWidth, rootHeight: window.innerHeight },
        () => {
          var width = me.offsetWidth / 10 * this.props.textScale;
          me.style.fontSize = width + 'px';
        }.bind(this)
      );
    }.bind(this);

    this.fitText();

    window.addEventListener('resize', this.fitText);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.fitText);
  }

  componentDidUpdate(){
    if (this.props.isFlexChild){
      return;
    }

    if (window.innerWidth >= document.body.scrollWidth){
      document.body.style.overflowX = 'hidden';
    } else {
      document.body.style.overflowX = 'auto';
    }
    if (window.innerHeight >= document.body.scrollHeight){
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }

}

export default ReactFractionalFlex;
