import {combineReducers} from "redux";

const cards = (store, action) => {
  console.log("store action", store, action);
  let _cards = [
      {index: 0, face: "1", match: "", flip: ""},
      {index: 1, face: "1", match: "", flip: ""},
      {index: 2, face: "2", match: "", flip: ""},
      {index: 3, face: "2", match: "", flip: ""},
      {index: 4, face: "3", match: "", flip: ""},
      {index: 5, face: "3", match: "", flip: ""},
      {index: 6, face: "4", match: "", flip: ""},
      {index: 7, face: "4", match: "", flip: ""},
      {index: 8, face: "5", match: "", flip: ""},
      {index: 9, face: "5", match: "", flip: ""},
      {index: 10, face: "6", match: "", flip: ""},
      {index: 11, face: "6", match: "", flip: ""},
      {index: 12, face: "7", match: "", flip: ""},
      {index: 13, face: "7", match: "", flip: ""},
      {index: 14, face: "8", match: "", flip: ""},
      {index: 15, face: "8", match: "", flip: ""}

    ];

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
        console.log('card == flip', !!choice1, choice1 == card.face);
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

        console.log('match', prevIndex, _card.index, choice1);

      }

      cards.push(_card);
    });

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

  return store || _cards;
};

const choices = (store, action) => {
  console.log("store action", store, action);
  let _choices = [-1, -1];

  if (action.type === "FLIP_CARD") {
    let cards = [];
    let choice1, choice2;
    store.forEach((card, index) => {
      let _card = {
        index: card.index,
        face: card.face,
        match: card.match,
        flip: card.flip
      };

      if (card.index == action.index) {
        _card.flip = "flip";
        if (!choice1) {
          choice1 = card.index;
        } else {
          choice2 = card.index;
        }
        console.log('choice', choice1, choice2);
      }


      cards.push(_card);
    });
    console.log("choices", choice1, choice2, cards, cards[choice1], cards[choice2]);
    if (choice1 && choice2 && cards[choice1].face == cards[choice2].face) {
      cards[choice1] = 'match';
      cards[choice2].match = 'match';
    }

    return cards;
  };

  return store || _cards;
};

export default combineReducers({
  cards
});
