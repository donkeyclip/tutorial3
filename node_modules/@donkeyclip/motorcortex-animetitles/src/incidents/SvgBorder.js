import { HTMLClip, Group, CSSEffect } from "@donkeyclip/motorcortex";

export default class SvgBorder extends HTMLClip {
  get html() {
    switch (this.attrs.size) {
      case "S":
        this.size = this.generateSize(600, 70, "2rem", "1rem", 50, 17, 50);
        break;
      case "M":
        this.size = this.generateSize(700, 90, "3rem", "2rem", 50, 34, 70);
        break;
      case "L":
        this.size = this.generateSize(
          1000,
          110,
          "3.5rem",
          "2.5rem",
          55,
          45,
          80
        );
        break;
    }

    return `
      <div class="svg-wrapper">
        <svg height="${this.size.borderHeight}" width="${this.size.borderWidth}" xmlns="http://www.w3.org/2000/svg">
          <rect class="shape2" height="${this.size.borderHeight}" width="${this.size.borderWidth}" />
        </svg>
        <div class="sub--container">
          <div class="sub">${this.attrs.subTitle}</div>
        </div>
        <div class="titleContainer">
          <div class="text">${this.attrs.title}</div>
        </div>
        <div class="sloganContainer">
          <div class="slogan">${this.attrs.slogan}</div>
        </div>
      </div>
    `;
  }

  get css() {
    return `
      body{
       font-size: 62.5%;
      }

      .svg-wrapper {
        position: relative;
        top :10px;
        height: 100%;
        color:  ${this.attrs.textColor};
        font-family: ${this.attrs.fontFamily} !important;
      }
      
      .shape2 {
        stroke-dasharray: 6000;
        stroke-width: 5px;
        fill: transparent;
        stroke: ${this.attrs.lineColor};
        border-bottom: 5px solid black;
        stroke-dashoffset: 6000;
      }
      
      
      .text {
        font-size: ${this.size.fontSizeTitle};
        letter-spacing: 8px;
        position: relative;
        top: ${this.size.titleTop}px;
      }
      
      .sub--container {
        position: absolute;
        white-space: nowrap;
        overflow: hidden;
        left: 20px;
        top: -7%;
      }

      .sloganContainer {
        position: relative;
        top: -30px;
        left: 45%;
        white-space: nowrap;
        overflow: hidden;
        width: 150px;
      }

      .titleContainer{
        position: relative;
        top: -${this.size.titleContainerTop}px;
        white-space: nowrap;
        overflow: hidden;
        width: ${this.size.borderWidth}px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .sub{
        position: relative;
        top: ${this.size.subTop}px;
        font-size : ${this.size.fontSizeSub};
      }
      
      .slogan{
        position: relative;
        top: -${this.size.subTop}px;
        font-size : ${this.size.fontSizeSub};
      }
    `;
  }

  generateSize(
    borderWidth,
    borderHeight,
    fontSizeTitle,
    fontSizeSub,
    titleTop,
    subTop,
    titleContainerTop
  ) {
    return {
      borderWidth,
      borderHeight,
      fontSizeTitle,
      fontSizeSub,
      titleTop,
      subTop,
      titleContainerTop,
    };
  }

  buildTree() {
    const delayEnd = this.attrs.delayEnd || 0;
    const borderAnimete = new CSSEffect(
      {
        animatedAttrs: {
          strokeDashoffset: ` ${12000 - this.attrs.borderGap}px`,
        },
        attrs: {},
      },
      {
        duration: 1400,
        selector: `.shape2`,
        easing: "easeInOutQuart",
      }
    );

    const titleAnimete = new CSSEffect(
      {
        animatedAttrs: {
          top: "0px",
        },
        attrs: {},
      },
      {
        duration: 600,
        selector: `.text`,
      }
    );

    const subAnimate = new CSSEffect(
      {
        animatedAttrs: {
          top: "0px",
        },
        attrs: {},
      },
      {
        duration: 600,
        selector: `.sub`,
        easing: "easeInOutQuart",
      }
    );

    const sloganAnimate = new CSSEffect(
      {
        animatedAttrs: {
          top: "0px",
        },
        attrs: {},
      },
      {
        duration: 600,
        selector: `.slogan`,
        easing: "easeInOutQuart",
      }
    );

    const borderAnimeteLeft = new CSSEffect(
      {
        animatedAttrs: {
          strokeDashoffset: "6000px",
        },
        attrs: {},
      },
      {
        duration: 1200,
        selector: `.shape2`,
      }
    );

    const titleAnimeteLeft = new CSSEffect(
      {
        animatedAttrs: {
          left: "100%",
        },
        attrs: {},
      },
      {
        duration: 800,
        selector: `.text`,
      }
    );

    const subAnimateLeft = new CSSEffect(
      {
        animatedAttrs: {
          left: "100%",
        },
        attrs: {},
      },
      {
        duration: 800,
        selector: `.sub`,
        easing: "easeInOutQuart",
      }
    );

    const sloganAnimateLeft = new CSSEffect(
      {
        animatedAttrs: {
          left: "150px",
        },
        attrs: {},
      },
      {
        duration: 800,
        selector: `.slogan`,
        easing: "easeInOutQuart",
      }
    );

    this.addIncident(borderAnimete, 0);
    this.addIncident(titleAnimete, 600);
    this.addIncident(subAnimate, 1200);
    this.addIncident(sloganAnimate, 1200);
    const grupMc = new Group();
    grupMc.addIncident(borderAnimeteLeft, 800);
    grupMc.addIncident(titleAnimeteLeft, 400);
    grupMc.addIncident(subAnimateLeft, 400);
    grupMc.addIncident(sloganAnimateLeft, 400);

    if (!this.attrs.stopOnLast) {
      this.addIncident(grupMc, 3000 + delayEnd);
    }
  }
}
