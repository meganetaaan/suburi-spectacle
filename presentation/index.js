// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Fill,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Markdown,
  Quote,
  Slide,
  Spectacle,
  Text
} from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Import custom component
import Interactive from "../assets/interactive";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");


const images = {
  city: require("../assets/city.jpg"),
  kat: require("../assets/kat.png"),
  logo: require("../assets/formidable-logo.svg"),
  markdown: require("../assets/markdown.png")
};

preloader(images);

const theme = createTheme({
  primary: "#fafafa",
  secondary: "#212121",
  tertiary: "#212121",
  quartenary: "#212121"
}, {
  primary: "Yu Gothic",
  secondary: "Noto sans",
  tertiary: "monospace"
});

import md from 'raw!./slides.md'
const regexp = /\n\n\n+/;
const srcMarkdown = md.split(regexp)
// srcMarkdown.map((src) => {console.log(src)})

export default class Presentation extends React.Component {
  render() {
    const slides = srcMarkdown.map((md, idx) => {
      return (
        <Slide key={idx}><Markdown source={md}></Markdown></Slide>
      );
    });
    return (
      <Spectacle theme={theme}>
        <Deck transition={["fade"]} transitionDuration={400}>
          {slides}
        </Deck>
      </Spectacle>
    );
  }
}
