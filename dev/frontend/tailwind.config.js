
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fontFamily: {
          "delius": ["Delius", "cursive"],
          "delius-unicase": ["Delius Unicase", "cursive"],
        }

      },
    },
  },
  plugins: [],
});