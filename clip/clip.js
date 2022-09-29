import { HTMLClip } from "@donkeyclip/motorcortex";
import html from "./clip.html";
import css from "./clip.css";
import initParams from "./initParams";
import initParamsValidationRules from "./initParamsValidationRules";

import { inout } from "./scenes/inout";
import { circle } from "./animations/intro";

export const clip = new HTMLClip({
  html,
  css,
  host: document.getElementById("clip"),
  fonts: [
    {
      type: "google-font",
      src:
        "https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap"
    }
  ],
  initParamsValidationRules,
  initParams: initParams[0].value,
  containerParams: {
    width: "780px",
    height: "450px",
  },
});

clip.addIncident(inout, 2500);
clip.addIncident(circle, 0);