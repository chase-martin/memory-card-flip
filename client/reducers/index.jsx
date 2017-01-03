import {combineReducers} from "redux";

let cards = (store, action) => {
  // Flip card.
  if (action.type === "FLIP_CARD") {
    let cards = [];
    let check;
    store.forEach((card, index) => {
      let _card = {
        index: card.index,
        face: card.face,
        match: card.match,
        flip: card.flip
      };

      if (card.index == action.index) {
        _card.flip = "flip";
      } else {
        check = card.index
      }

      cards.push(_card);
    });

    return cards;
  };

  // Check if flipped cards match.
  if (action.type === "MATCH_CARDS") {
    let cards = [];
    let choice1, prevIndex;
    let reset = false;
    let match = false;
    store.forEach((card, index) => {
      let _card = {
        index: card.index,
        face: card.face,
        match: card.match,
        flip: card.flip
      };

      if (card.flip == "flip") {
        if (!!choice1 && choice1 == card.face) {
          cards[prevIndex].match = "match";
          _card.match = "match";
          cards[prevIndex].flip = "";
          _card.flip = "";
        } else if (!!choice1 && choice1 != card.face) {
          console.log('no match', choice1);
          cards[prevIndex].flip = "";
          _card.flip = "";
          //reset = true;
        } else {
          choice1 = card.face
          prevIndex = card.index
        }
      }

      cards.push(_card);
    });

    // TODO: hard reset of cards required to prevent fast click errors.
    if (!!reset) {
      cards = [];
      store.forEach((card, index) => {
        let _card = {
          index: card.index,
          face: card.face,
          match: card.match,
          flip: ""
        };
        cards.push(_card);
      });
    }

    return cards;
  };

  // TODO: shuffle the face value.
  let _cards = [];

  return store || _cards;
};

export default combineReducers({
  cards
});
