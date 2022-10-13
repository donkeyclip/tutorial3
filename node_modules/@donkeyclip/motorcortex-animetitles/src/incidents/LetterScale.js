import { HTMLClip, CSSEffect } from "@donkeyclip/motorcortex";

export default class LetterScale extends HTMLClip {
  get html() {
    this.list = this.attrs.text.split("");
    const divList = this.list
      .map((e, i) => {
        return `<div class="letter letter-item-${i}">${e}</div>`;
      })
      .join("");

    return `
      <div class="wrapper">
        <div class="letter-wrapper">
          ${divList}
        </div>
      </div>
    `;
  }

  get css() {
    const stroke =
      this.attrs.stroke === true
        ? `-webkit-text-stroke:${this.attrs.strokeSize}px ${this.attrs.strokeColor};`
        : ``;

    return `
      .wrapper{
        width:${this.attrs.width}px;
        height: ${this.attrs.height}px;
        white-space: nowrap;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .letter{
        font-size:${this.attrs.fontSize}px;
        color:${this.attrs.color};
        text-transform:uppercase;
        font-family: ${this.attrs.fontFamily};
        position: relative;
        ${stroke}
      }
      
      .letter-wrapper{
        width:${this.attrs.width}px;
        height: ${this.attrs.height}px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `;
  }

  buildTree() {
    const left = new CSSEffect(
      {
        animatedAttrs: {
          fontSize: `${this.attrs.fontSize}px`,
        },
        initialValues: {
          fontSize: `${this.attrs.fontSize * 0.7}px`,
        },
      },
      {
        duration: 600,
        selector: ".letter",
        easing: "easeOutExpo",
        delay: `@stagger(0, 600,0.5,linear,omni)`,
      }
    );
    this.addIncident(left, 0);
  }
}
