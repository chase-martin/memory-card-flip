export const flipCard = (i) => {
  console.log("flipCard i", i);
  return {
    type: "FLIP_CARD",
    index: i
  };
};

export const matchCards = () => {
  return {
    type: "MATCH_CARDS"
  };
};
