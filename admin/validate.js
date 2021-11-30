const Validate = {
  isNumber: function (input) {
    let pattern = /^[0-9]+$/g;
    return `${input}`.match(pattern) !== null;
  },
  isLength: function (input, options = { min: 0, max: 50 }) {
    let pattern = new RegExp(`^.{${options.min},${options.max}}$`, 'g');
    return input.match(pattern) !== null;
  },
  isNotNull: (input) => !input || input.length === 0,
};
