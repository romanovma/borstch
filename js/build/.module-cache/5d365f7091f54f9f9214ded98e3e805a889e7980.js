/** @jsx React.DOM */

var UP_LEFT = 'up-left';
var UP_RIGHT = 'up-right';
var DOWN_LEFT = 'down-left';
var DOWN_RIGHT = 'down-right';
var allowable = ['свекла', 'морковь', 'картоха', 'фасоль'];
var notAllowable = ['банан', 'гликолиз', 'панда', 'укулеле'];
var allFood = allowable.concat(notAllowable);

var GameBox = React.createClass({displayName: "GameBox",
  getInitialState: function() {
    return {
      gameOver:false,
      pose: UP_LEFT,
      total: 1,
      runningUP_LEFT: 'морковь',
      runningDOWN_LEFT: '',
      runningUP_RIGHT: '',
      runningDOWN_RIGHT: ''
    };
  },
  componentDidMount: function() {
    setInterval(this.pushFood, 1000);
  },
  pushFood: function() {
    var rndShelve = Math.floor(Math.random() * 4) + 1;
    var rndFood = Math.floor(Math.random() * this.props.allFood.length)
    switch (rndShelve % 4) {
      case 1:
        this.setState({runningUP_LEFT: this.props.allFood[rndFood]});
        break;
      case 2:
        this.setState({runningDOWN_LEFT: this.props.allFood[rndFood]});
        break;
      case 3:
        this.setState({runningUP_RIGHT: this.props.allFood[rndFood]});
        break;
      case 4:
        this.setState({runningDOWN_RIGHT: this.props.allFood[rndFood]});
        break;
      default:
    }
  },
  handleClick: function(element) {
    this.setState({pose: element});
  },
  incrTotal: function (element) {
    if (element === this.state.pose)
    {
      var newTotal = this.state.total + 1;
      this.setState({total: newTotal});
    };
    switch (element) {
      case UP_LEFT:
        this.setState({runningUP_LEFT: ''});
        break;
      case UP_RIGHT:
        this.setState({runningDOWN_LEFT: ''});
        break;
      case DOWN_LEFT:
        this.setState({runningUP_RIGHT: ''});
        break;
      case DOWN_RIGHT:
        this.setState({runningDOWN_RIGHT: ''});
        break;
      default:
    }
  },
  render: function() {
    var divHeaderStyle = {
      height: '200px'
    };
    var divStyle = {
      padding: '0'
    }
    var divHelperStyle = {
      height: '40px'
    }
    return (
      React.createElement("div", null, 
        React.createElement("div", {className: "row"}, 
          React.createElement("h1", null, "Насобирай все для борща, ни разу не схватив по щщам"), 
          this.state.total
        ), 
        React.createElement("div", {className: "row", style: divHelperStyle}), 
        React.createElement("div", {className: "row", style: divStyle}, 
          React.createElement("div", {className: "col-lg-4 col-md-4 col-sm-4 col-xs-4", style: divStyle}, 
            React.createElement("div", {style: divHelperStyle}), 
            React.createElement("div", null, " ", React.createElement(Shelve, {
              position: UP_LEFT, 
              onClick: this.handleClick, 
              style: divStyle, 
              active: this.state.pose === UP_LEFT, 
              incrTotal: this.incrTotal, 
              running: this.state.runningUP_LEFT})
            ), 
            React.createElement("div", null, " ", React.createElement(Shelve, {
              position: DOWN_LEFT, 
              onClick: this.handleClick, 
              style: divStyle, 
              active: this.state.pose === DOWN_LEFT, 
              incrTotal: this.incrTotal, 
              running: this.state.runningDOWN_LEFT})
            )
          ), 
          React.createElement("div", {className: "col-lg-4 col-md-4 col-sm-4 col-xs-4", style: divStyle}, 
            this.state.pose, 
            React.createElement(WolfImage, {pose: this.state.pose, onClick: this.handleClick})
          ), 
          React.createElement("div", {className: "col-lg-4 col-md-4 col-sm-4 col-xs-4", style: divStyle}, 
            React.createElement("div", {style: divHelperStyle}), 
            React.createElement("div", null, " ", React.createElement(Shelve, {
              position: UP_RIGHT, 
              onClick: this.handleClick, 
              style: divStyle, 
              active: this.state.pose === UP_RIGHT, 
              incrTotal: this.incrTotal, 
              running: this.state.runningUP_RIGHT})
            ), 
            React.createElement("div", null, " ", React.createElement(Shelve, {
              position: DOWN_RIGHT, 
              onClick: this.handleClick, 
              style: divStyle, 
              active: this.state.pose === DOWN_RIGHT, 
              incrTotal: this.incrTotal, 
              running: this.state.runningDOWN_RIGHT})
            )
          )
        )
      )
    );
  }
});

var Shelve = React.createClass({displayName: "Shelve",
  getInitialState: function() {
    return {
      level: 0
    }
  },
  handleClick: function() {
    this.props.onClick(this.props.position);
  },
  drawLine: function(canvas, ctx) {
    ctx.lineWidth = 6;
    if (this.props.position === UP_LEFT || this.props.position === DOWN_LEFT) {
      ctx.moveTo(0,0);
      ctx.lineTo(canvas.width, canvas.height * 2 / 3);
    } else {
      ctx.moveTo(canvas.width,0);
      ctx.lineTo(0, canvas.height * 2 / 3);
    };
    ctx.stroke();
  },
  drawText: function(canvas, ctx) {
    ctx.fillStyle = "#00F";
    ctx.font='lighter 30px Times New Roman';
    if (this.props.position === UP_LEFT || this.props.position === DOWN_LEFT) {
      ctx.fillText(this.props.running, canvas.width / 5 * this.state.level, canvas.height / 5 * this.state.level);
    } else {
      ctx.fillText(this.props.running, canvas.width / 5 * (5 - this.state.level) - 20, canvas.height / 5 * this.state.level - 20);
    }
  },
  componentDidMount: function () {
      interval = setInterval(this.updateLevel, 1000);
  },
  updateLevel: function () {
    var newLevel = ++this.state.level;
    if (newLevel == 5) {
      //clearInterval(this.state.interval);
      this.props.incrTotal(this.props.position);
      this.setState({running: false});
    } else {
      this.setState({level: newLevel});
    }
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.running > this.props.running) {
      this.setState({level: 0});
    }
  },
  componentDidUpdate: function (){
    var canvas = document.getElementById(this.props.position);
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawLine(canvas, ctx);
    if (this.props.running) {
      this.drawText(canvas, ctx);
    }
  },
  render: function() {
    var imgStyle = {
      width: '100%'
    };
    return (
      React.createElement("canvas", {style: imgStyle, id: this.props.position, onClick: this.handleClick, onTouch: this.handleClick})
    )
  }
});

var WolfImage = React.createClass({displayName: "WolfImage",
  getInitialState: function() {
    return {
      pose: ''
    };
  },
  handleClick: function(e) {
      var imgPos= $(e.currentTarget).offset();
      var horPos = e.pageX - imgPos.left - e.currentTarget.width/2;
      var verPos = e.pageY - imgPos.top - e.currentTarget.height * 11 / 17;
      //alert($(e).attr('src'));
      //alert(imgPos.left);
      //alert(e.currentTarget.width/2);
      var result = '';
      if (horPos > 0 && verPos < 0) {result = UP_RIGHT}
      else if (horPos > 0 && verPos > 0) {result = DOWN_RIGHT}
      else if (horPos<0 && verPos > 0) {result =  DOWN_LEFT}
      else {result = UP_LEFT};
      this.props.onClick(result);
  },
  render: function() {
    var imgStyle = {
      width: '100%'
    };
    var src = './images/' + this.props.pose + '.jpg';
    return (React.createElement("img", {src: src, style: imgStyle, alt: this.props.pose, onClick: this.handleClick, onTouch: this.handleClick}));
  }
});


React.render(
  React.createElement(GameBox, {allowable: allowable, notAllowable: notAllowable, allFood: allFood}),
  document.getElementById('content')
);
