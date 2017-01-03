import React, {PropTypes} from "react";
import {connect} from "react-redux";
//import Notifications from "react-notify-toast";
import {flipCard, matchCards} from "../actions";
import {Initializer} from "react-google-analytics";
const GAInitiailizer = Initializer;

class Home extends React.Component {

  render() {
    const props = this.props;
    const {cards} = props;
    const css = {
      w: "120px",
      h: "200px"
    };
    const cardShow = {
      display: "block",
      margin: "20px",
      width: css.w,
      height: css.h,
      float: "left",
      transition: "opacity 1s",
      perspective: "1000px"
    };
    let cardMatch = JSON.parse(JSON.stringify(cardShow));
    cardMatch.opacity = "0";
    cardMatch.background = "none";
    const divFlip = {
      display: "block",
      width: css.w,
      height: css.h,
      transition: ".75s",
	    transformStyle: "preserve-3d",
      position: "relative",
      border: "1px solid black",
      animationDelay: "2s"
    }
    let divOver = JSON.parse(JSON.stringify(divFlip));
    divOver.transform = "rotateY(180deg)";
    const spanFlip = {
      display: "block",
      width: css.w,
      height: css.h,
      textAlign: "center",
      background: "white",
      paddingTop: "75px",
      boxSizing: "border-box",
      lineHeight: "25px",
      backfaceVisibility: "hidden",
      position: "absolute",
  	  top: "0",
  	  left: "0",
      animationDelay: "2s",
      fontSize: "72px",
      color: "#333"
    };
    let spanFlipBack = JSON.parse(JSON.stringify(spanFlip));
    spanFlipBack.transform = "rotateY(180deg)";
    spanFlipBack.background = "linear-gradient(135deg, #eeeeee 0%,#cccccc 100%)";

    let spanFlipFront = JSON.parse(JSON.stringify(spanFlip));
    spanFlipFront.zIndex = "2";
    spanFlipFront.transform = "rotateY(0deg)";
    //spanFlipFront.background = "linear-gradient(to bottom, #299a0b 0%,#299a0b 100%)";
    spanFlipFront.background = "linear-gradient(135deg, #f1e767 0%,#feb645 100%)";

    return (
      <div style={{maxWidth: "750px", margin: "0 auto"}}>
        {cards.map((card, index) =>
          <div key={index} style={card.match == "match" ? cardMatch : cardShow}
              onMouseDown={props.onFlip.bind(this, index)}
              onMouseUp={function(){setTimeout(props.onMatch, 2000)}}>
            <div style={card.flip == "flip" ? divOver : divFlip}>
              <span style={spanFlipFront}></span>
              <span style={spanFlipBack}>
                {card.face}
              </span>
            </div>
          </div>
        )}
        <GAInitiailizer />
      </div>
    );
  }
}

Home.propTypes = {
  match: PropTypes.bool,
  flip: PropTypes.bool
};

const mapStateToProps = (state) => {
  let cards = [];
  state.cards.forEach(card => {
    cards.push({
      "flip": card.flip,
      "match": card.match,
      "face": card.face
    })
  });

  return {
    cards: cards,
    choice1: -1,
    choice2: -1
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFlip: (i) => {
      console.log("onFlip", i);
      dispatch(flipCard(i));
    },
    onMatch: () => {
      console.log("onMatch");
      dispatch(matchCards());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
