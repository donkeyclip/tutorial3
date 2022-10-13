import { HTMLClip, CSSEffect } from "@donkeyclip/motorcortex";

export default class RotatedLine extends HTMLClip {
  get html() {
    return `
      <div class="wrapper">
        <div class="text--container text--container-left">
          <div class="text-left">${this.attrs.title}</div>
        </div>
        <div class="line"></div>
        <div class="text--container text--container-right">
          <div class="text-right text-right1">${this.attrs.subTitle1}</div>
          <div class="text-right text-right2">${this.attrs.subTitle2}</div>
          <div class="text-right text-right3">${this.attrs.subTitle3}</div>
        </div>
      </div>
    `;
  }

  get css() {
    switch (this.attrs.size) {
      case "S":
        this.size = this.generateSize("1.5rem", "1rem", "0.2rem", "5rem", 3);
        break;
      case "M":
        this.size = this.generateSize("2rem", "1.2rem", "0.3rem", "7rem", 4);
        break;
      case "L":
        this.size = this.generateSize("2.5rem", "1.5rem", "0.3rem", "9rem", 4);
        break;
      case "XL":
        this.size = this.generateSize("3rem", "2rem", "0.3rem", "11rem", 4);
        break;
    }

    return `
      body{
       font-size: 62.5%;
      }

      .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        transform: rotate(90deg);
        white-space: nowrap;
        overflow: hidden;
        width : 100%;
        width : ${this.attrs.width + this.size.lineWidth}px;
        color : ${this.attrs.textColor};
        font-family: ${this.attrs.fontFamily} !important;
      }

      .line {
        width: 3px;
        background: ${this.attrs.lineColor} ;
        height: 0rem;
      }
      
      .text-left {
        position: relative;
        right : -100%;
        font-size: ${this.size.fontSizeLeft};
        text-align: right;
      }
      
      .text-right {
        position: relative;
        right: 100%;
        font-size: ${this.size.fontSizeRigth};
      }
      
      .text--container {
        white-space: nowrap;
        overflow: hidden;
        position: relative;
        width :${this.attrs.width / 2}px;
      } 
    `;
  }

  generateSize(fontSizeLeft, fontSizeRigth, lineWidth, lineHeight, gap) {
    return {
      fontSizeLeft,
      fontSizeRigth,
      lineWidth,
      lineHeight,
      gap,
    };
  }

  buildTree() {
    const rotateAminmeEnd = new CSSEffect(
      {
        animatedAttrs: {
          transform: {
            rotate: "0deg",
          },
        },
        attrs: {},
      },
      {
        duration: 450,
        selector: `.wrapper`,
        easing: "easeInOutQuart",
      }
    );

    const widthLIne = new CSSEffect(
      {
        animatedAttrs: {
          height: this.size.lineHeight,
        },
        attrs: {},
      },
      {
        duration: 450,
        selector: `.line`,
        easing: "easeInOutQuart",
      }
    );

    const leftTextAnimate = new CSSEffect(
      {
        animatedAttrs: {
          right: `${this.size.gap}%`,
        },
        attrs: {},
      },
      {
        duration: 900,
        selector: `.text-left`,
        easing: "easeInOutQuart",
      }
    );

    for (let i = 1; i <= 3; i++) {
      const rightTextAnimate = new CSSEffect(
        {
          animatedAttrs: {
            right: `-${this.size.gap}%`,
          },
          attrs: {},
        },
        {
          duration: 900 * i,
          selector: ".text-right" + i,
          easing: "easeOutExpo",
        }
      );

      this.addIncident(rightTextAnimate, 1500);
    }

    const rightTextAnimateIn = new CSSEffect(
      {
        animatedAttrs: {
          right: "100%",
        },
        attrs: {},
      },
      {
        duration: 900,
        selector: ".text-right",
        easing: "easeOutExpo",
      }
    );

    const leftTextAnimateIn = new CSSEffect(
      {
        animatedAttrs: {
          right: "-100%",
        },
        attrs: {},
      },
      {
        duration: 900,
        selector: `.text-left`,
        easing: "easeOutExpo",
      }
    );

    const rotateAminmeStartOut = new CSSEffect(
      {
        animatedAttrs: {
          transform: {
            rotate: "90deg",
          },
        },
        attrs: {},
      },
      {
        duration: 450,
        selector: `.wrapper`,
        easing: "easeInOutQuart",
      }
    );

    const widthLIneOut = new CSSEffect(
      {
        animatedAttrs: {
          height: "0rem",
        },
        attrs: {},
      },
      {
        duration: 450,
        selector: `.line`,
        easing: "easeInOutQuart",
      }
    );

    const delayEnd = this.attrs.delayEnd || 0;

    this.addIncident(widthLIne, 0);
    this.addIncident(rotateAminmeEnd, 450);
    this.addIncident(leftTextAnimate, 900);
    if (!this.attrs.stopOnLast) {
      this.addIncident(rightTextAnimateIn, 4200 + delayEnd);
      this.addIncident(leftTextAnimateIn, 4200 + delayEnd);
      this.addIncident(rotateAminmeStartOut, 5100 + delayEnd);
      this.addIncident(widthLIneOut, 5550 + delayEnd);
    }
  }
}
