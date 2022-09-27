import { CSSEffect } from "@donkeyclip/motorcortex";

export const slideout = new CSSEffect(
  {
    animatedAttrs: {
      left: "260px"
    }
  },
  {
    selector: ".item",
    duration: 1500,
    delay: "@stagger(500, 0)",
    easing: "easeInQuint"
  }
);
