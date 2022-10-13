import { HTMLClip, CSSEffect } from "@donkeyclip/motorcortex";

export default class SvgDraw extends HTMLClip {
  get html() {
    switch (this.attrs.size) {
      case "S":
        this.size = this.generateSize(200, 100, "");
        break;
      case "M":
        this.size = this.generateSize(300, 200, "5rem");
        break;
      case "L":
        this.size = this.generateSize(500, 400, "7rem");
        break;
    }
    return `<div class="svg-wrapper">${this.attrs.svg}</div>`;
  }

  get css() {
    return `
      .svg-wrapper{
        position: relative;
        width: ${this.size.svgWidth * 1.5}px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      svg{
        width: ${this.size.svgWidth}px;
        height: ${this.size.svgHeight}px;
      }

      .svgContainer{
        height:100vh;
      }

      svg path{
        stroke-dasharray: ${this.attrs.StrokeDashArray};
        stroke-dashoffset: ${this.attrs.strokeDashOffset};
      }
    `;
  }

  generateSize(svgWidth, svgHeight, lineSize) {
    return { svgWidth, svgHeight, lineSize };
  }

  buildTree() {
    const textDrow = new CSSEffect(
      {
        animatedAttrs: {
          strokeDashoffset: "0px",
        },
        attrs: {},
      },
      {
        duration: 2700,
        selector: `svg path`,
        easing: "easeInSine",
      }
    );

    const textBigBack = new CSSEffect(
      {
        animatedAttrs: {
          transform: {
            scaleX: 1.3,
            scaleY: 1.3,
          },
        },
      },
      {
        duration: 1530,
        selector: `svg`,
        id: "transform2",
        easing: "easeOutElastic",
      }
    );

    const textErase = new CSSEffect(
      {
        animatedAttrs: {
          strokeDashoffset: this.attrs.strokeDashOffset,
        },
        attrs: {},
      },
      {
        duration: 2700,
        selector: `svg path`,
        easing: "easeInSine",
      }
    );

    this.addIncident(textDrow, 0);
    this.addIncident(textBigBack, 2700);
    const delayEnd = this.attrs.delayEnd || 0;
    if (!this.attrs.stopOnLast) {
      this.addIncident(textErase, 3420 + delayEnd);
    }
  }
}
