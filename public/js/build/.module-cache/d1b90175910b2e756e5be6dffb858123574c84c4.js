/** @jsx React.DOM */

var UP_LEFT = 'up-left';
var UP_RIGHT = 'up-right';
var DOWN_LEFT = 'down-left';
var DOWN_RIGHT = 'down-right';

var GameBox = React.createClass({displayName: "GameBox",
  getInitialState: function() {
    return {
      gameOver:false,
      position: UP_LEFT
    };
  },
  render: function() {
    var divStyle = {
      height: '100px'
    };
    return (
      React.createElement("div", null, 
        React.createElement("div", {className: "row", style: divStyle}, 
          React.createElement("h1", null, "Насобирай все для борща, ни разу не схватив по щщам")
        ), 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-lg-4 col-md-4 col-sm-4 col-xs-4"}, 
            React.createElement("div", null, " egg-upp-left "), 
            React.createElement("div", null, " egg-down-left ")
          ), 
          React.createElement("div", {className: "col-lg-4 col-md-4 col-sm-4 col-xs-4"}, 
            React.createElement(WolfImage, null)
          ), 
          React.createElement("div", {className: "col-lg-4 col-md-4 col-sm-4 col-xs-4"}, 
            React.createElement("div", null, " egg-upp-right "), 
            React.createElement("div", null, " egg-down-right ")
          )
        )
      )
    );
  }
});

var WolfImage = React.createClass({displayName: "WolfImage",
  getInitialState: function() {
    return {
      position: UP_LEFT
    };
  },
  render: function() {
    switch (this.state.position) {
      case UP_RIGHT:
        return (React.createElement("img", {src: "./images/UP_RIGHT.jpg"}))
        break
      case DOWN_LEFT:
        return (React.createElement("img", {src: "./images/DOWN_LEFT.jpg"}))
        break
      case DOWN_RIGHT:
        return (React.createElement("img", {src: "./images/DOWN_RIGHT.jpg"}))
        break
        case UP_LEFT:
        default:
        return (React.createElement("img", {src: "./images/UP_LEFT.jpg"}))
    }
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
