/** @jsx React.DOM */

var UP_LEFT = 'up-left';
var UP_RIGHT = 'up-right';
var DOWN_LEFT = 'down-left';
var DOWN_RIGHT = 'down-right';

var GameBox = React.createClass({displayName: "GameBox",
  getInitialState: function() {
    return {
      gameOver:false,
      pose: UP_LEFT
    };
  },
  handleClick: function(element) {
    this.setState({pose: element});
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
          React.createElement("h1", null, "Насобирай все для борща, ни разу не схватив по щщам")
        ), 
        React.createElement("div", {className: "row", style: divHelperStyle}), 
        React.createElement("div", {className: "row", style: divStyle}, 
          React.createElement("div", {className: "col-lg-4 col-md-4 col-sm-4 col-xs-4", style: divStyle}, 
            React.createElement("div", {style: divHelperStyle}), 
            React.createElement("div", null, " ", React.createElement(Shelve, {position: UP_LEFT, onClick: this.handleClick, style: divStyle}), " "), 
            React.createElement("div", null, " ", React.createElement(Shelve, {position: DOWN_LEFT, onClick: this.handleClick, style: divStyle}), " ")
          ), 
          React.createElement("div", {className: "col-lg-4 col-md-4 col-sm-4 col-xs-4", style: divStyle}, 
            this.state.pose, 
            React.createElement(WolfImage, {pose: this.state.pose, onClick: this.handleClick})
          ), 
          React.createElement("div", {className: "col-lg-4 col-md-4 col-sm-4 col-xs-4", style: divStyle}, 
            React.createElement("div", {style: divHelperStyle}), 
            React.createElement("div", null, " ", React.createElement(Shelve, {position: UP_RIGHT, onClick: this.handleClick, style: divStyle}), " "), 
            React.createElement("div", null, " ", React.createElement(Shelve, {position: DOWN_RIGHT, onClick: this.handleClick, style: divStyle}), " ")
          )
        )
      )
    );
  }
});

var Shelve = React.createClass({displayName: "Shelve",
  getInitialState: function() {
    return {
      level: 1,
      interval: 1000
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
    ctx.fillText("свекла", canvas.width / 5 * this.state.level, canvas.height / 5 * this.state.level);
  },
  componentDidMount: function () {
    if (this.props.position === UP_LEFT)
    {
      setInterval(this.updateLevel, this.state.interval);
    }
  },
  updateLevel: function(){
    var newLevel = ++this.state.level;
    if (newLevel == 5) {
      this.setState({level: 1, interval: 10000});
    } else {
      this.setState({level: newLevel})
    }
  },
  componentDidUpdate: function (){
    var canvas = document.getElementById(this.props.position);
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawLine(canvas, ctx);
    this.drawText(canvas, ctx);
  },
  render: function() {
    var imgStyle = {
      width: '100%'
    };
    return (
      React.createElement("canvas", {style: imgStyle, id: this.props.position, onClick: this.handleClick})
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
  React.createElement(GameBox, null),
  document.getElementById('content')
);
