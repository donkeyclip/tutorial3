import { HTMLClip, CSSEffect } from "@donkeyclip/motorcortex";

export default class CircularText extends HTMLClip {
  get html() {
    return `
    <div class="wrapper">
      <div class="circle">
        <svg viewBox="0 0 ${this.attrs.viewBox} ${this.attrs.viewBox}">
          <path d="M ${this.attrs.viewBox / 2 - this.attrs.path},${
      this.attrs.viewBox / 2
    } a ${this.attrs.path}, ${this.attrs.path} 0 1, 1 0,1 z" id="circular" />
          <text class="text"><textPath xlink:href="#circular">
          ${this.attrs.text}
            </textPath>
          </text>
        </svg>
      </div>
    </div>
    `;
  }

  get css() {
    return `
      .wrapper{
        width:${this.attrs.width}px;
        height: ${this.attrs.height}px;
        white-space: nowrap;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: ${this.attrs.fontFamily} !important;
      }

      .circle path {
        fill: ${this.attrs.fill};
        1px solid black;
      }

      .circle {
        width:${this.attrs.width}px;
        height: ${this.attrs.height}px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .circle svg {
        display: block;
        overflow: visible;
        flex:1;
      }

      .text{
        font-size: ${this.attrs.fontSize}px;
      }
      
      .circle text {
        fill: ${this.attrs.color};
        font-family: ${this.attrs.fontFamily};
      }
    `;
  }

  buildTree() {
    const left = new CSSEffect(
      {
        animatedAttrs: {
          transform: {
            rotate: `360deg`,
          },
        },
      },
      {
        duration: 3000,
        selector: ".circle svg",
      }
    );
    this.addIncident(left, 0);
  }
}
