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
    //var position = $(e.currentTarget).attr('position');
    this.setState({pose: element});
    //alert(this.state.pose);
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
        React.createElement("div", {className: "row", style: divHeaderStyle}, 
          React.createElement("h1", null, "Насобирай все для борща, ни разу не схватив по щщам")
        ), 
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
      level: '0'
    }
  },
  handleClick: function() {
    this.props.onClick(this.props.position);
    //alert(this.props.position)
  },
  componentDidMount: function () {

  },
  render: function() {
    var imgStyle = {
      width: '100%'
    };
    //var src = './images/' + this.props.position + '-line.jpg';
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

/*
  render: function() {
    var movieNodes = this.props.data.map(function(movie) {
      var imagePath = "images/" + movie.imdbid + ".jpg";
      return (
        <MovieCard name={movie.name} imagePath={imagePath} dates={movie.dates}>
        </MovieCard>
      );
    });
    return (
      <div className = "movieList row">
        {movieNodes}
      </div>
    );
  }
});

var MovieCard = React.createClass({
  getInitialState: function() {
    return {cardType: "image"};
  },
  handleTouch: function(e) {
    //e.preventDefault();
    switch (this.state.cardType) {
      case "image":
        this.setState({cardType: "schedule"});
        break;
      case "schedule":
      default:
        this.setState({cardType: "image"});
    };
    return;
  },
  render: function() {
    switch (this.state.cardType) {
      case "info":
      case "schedule":
        var dates = this.props.dates.map(function(date) {
          return (
            <li> {date} </li>
          );
        });
        return (
          <div className = "movieCard col-xs-12 col-sm-6 panel"  onTouchEnd = {this.handleTouch}>
            <ul>
              {dates}
            </ul>
          </div>
        );
        break;
      case "image":
      default:
        return (
          <div className = "movieCard col-xs-12 col-sm-6 panel" onTouchEnd = {this.handleTouch}>
            <h4 className="movieName">
              {this.props.name}
            </h4>
            <img clasName="movieImage img-rounded" src={this.props.imagePath} alt={this.props.name} width="100%"/>
          </div>
        );
    }
  }
});
*/

//console.log('react prerender');


//console.log('react afterrender');
