import { HTMLClip, CSSEffect } from "@donkeyclip/motorcortex";

export default class RightOpacity extends HTMLClip {
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
        ${stroke}
        text-transform:uppercase;
        font-family: ${this.attrs.fontFamily};
        position: absolute;
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
          left: `@expression(index * ${this.attrs.width / this.list.length})px`,
        },
        initialValues: {
          left: `@expression((index * ${this.attrs.width / this.list.length})+${
            this.attrs.width / 2
          })px`,
        },
      },
      {
        duration: 1,
        selector: ".letter",
        delay: "@stagger(0, 0)",
      }
    );

    this.addIncident(left, 0);

    const opacity = new CSSEffect(
      {
        animatedAttrs: {
          opacity: 1,
          // left: `@expression(index * ${this.attrs.width / this.list.length})px`
        },
        initialValues: {
          opacity: 0,
          // left: `@expression((index * ${this.attrs.width / this.list.length})+${this.attrs.width / 2})px`
        },
      },
      {
        duration: 300,
        selector: ".letter",
        easing: "easeOutExpo",
        delay: "@stagger(0, 300)",
      }
    );

    this.addIncident(opacity, 10);

    const left2 = new CSSEffect(
      {
        animatedAttrs: {
          left: "0px",
        },
        initialValues: {
          left: `${this.attrs.width * 0.5}px`,
        },
      },
      {
        duration: 300,
        selector: ".letter-wrapper",
        easing: "easeOutExpo",
        // delay: "@stagger(0, 300)"
      }
    );

    this.addIncident(left2, 0);

    const leftLetter = new CSSEffect(
      {
        animatedAttrs: {
          left: `${this.attrs.width / 2}px`,
        },
      },
      {
        duration: 300,
        selector: ".letter",
        easing: "easeInQuad",
        delay: "@stagger(0, 300,0.5,easeInQuad,omni)",
      }
    );

    this.addIncident(leftLetter, this.attrs.exitTime);

    const opacityback = new CSSEffect(
      {
        animatedAttrs: {
          opacity: 0,
        },
      },
      {
        duration: 300,
        selector: ".letter",
      }
    );
    this.addIncident(opacityback, this.calculatedDuration - 300);
  }
}
