import { CSSEffect } from "@donkeyclip/motorcortex";

export const slidein = new CSSEffect(
  {
    animatedAttrs: {
      left: "@stagger(-520px, 0px)"
    }
  },
  {
    selector: ".item",
    duration: 1500,
    delay: "@stagger(500, 0)",
    easing: "easeOutCubic"
  }
);
