import { HTMLClip, CSSEffect } from "@donkeyclip/motorcortex";

export default class Circle extends HTMLClip {
  get html() {
    return `
      <div class="wrapper">
        <div class="circle">
          <div class="word"></div>
        </div>
        <div class="sub">
          <span >${this.attrs.subTitle}</span>
        </div>
      </div>
    `;
  }

  get css() {
    return `
      .wrapper{
        white-space: nowrap;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        width: ${this.attrs.width}px;
        height: ${this.attrs.width}px;
        font-family: ${this.attrs.fontFamily} !important;
      }

      .circle{
        width: 0px;
        height: 0px;
        background: ${this.attrs.circleColor};
        position: relative;
        border-radius: 100%;
        mask-position-y: 69px;
        mask-size: 810px;
      }

      .word{
        overflow: hidden;
        width: 9px;
        height: 3px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }
      
      .letter{
        font-size: ${this.attrs.fontSize}px;
        color: ${this.attrs.textColor};
        left: 2.5px;
        position: relative;
        text-align: center;
        top : ${this.attrs.width}px;
        width: 100%;
        background-color:#ffffff00
        
      }

      .sub{
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        top: 33%;
        transform: rotate(-10deg);
        width: 400px;
        height: 400px;

      }

      .sub span{
        font-size: ${this.attrs.fontSize * 0.8}px;
        position: relative;
        top:100%;
        letter-spacing: 3px;
      }
    `;
  }

  buildTree() {
    const array = this.attrs.title.split("");

    let html = "";
    for (let i = 0; i < array.length; i++) {
      html += `<span class='letter letter${i + 1}'>${array[i]}</span>`;
    }

    const word = new HTMLClip({
      css: this.css,
      html: ` <div class="wrapper" >${html} </div>`,
      selector: ".word",
    });

    this.addIncident(word, 0);

    const circleScale = new CSSEffect(
      {
        animatedAttrs: {
          width: `${this.attrs.width}px`,
          height: `${this.attrs.width}px`,
        },
        initialValues: {
          width: `0px`,
          height: `0px`,
        },
      },
      {
        duration: 500,
        selector: ".circle",
        easing: "easeOutExpo",
      }
    );

    for (let i = 0; i < array.length; i++) {
      const textAnimation = new CSSEffect(
        {
          animatedAttrs: {
            top: "0px",
            opacity: 1,
          },
        },
        {
          duration: 500,
          selector: ".letter" + (i + 1),
          easing: "easeOutExpo",
        }
      );

      word.addIncident(textAnimation, 500 + 100 * (i + 1));
    }

    const circleScaleDown = new CSSEffect(
      {
        animatedAttrs: {
          width: `${this.attrs.width * 0.8}px`,
          height: `${this.attrs.width * 0.8}px`,
        },
        // initialValues:{
        //   width: `${this.attrs.width}px`,
        //   height: `${this.attrs.width}px`,
        // }
      },
      {
        duration: 600,
        selector: ".circle",
        easing: "easeOutElastic",
      }
    );

    const wrapperDown = new CSSEffect(
      {
        animatedAttrs: {
          width: `${this.attrs.width * 0.8}px`,
          height: `${this.attrs.width * 0.8}px`,
          transform: {
            rotate: "10deg",
          },
        },
        attrs: {},
      },
      {
        duration: 600,
        selector: ".wrapper",
        easing: "easeOutElastic",
      }
    );

    const maskDown = new CSSEffect(
      {
        animatedAttrs: {
          maskSize: `${this.attrs.width * 0.8}px`,
          transform: {
            rotate: "-10deg",
          },
        },
        attrs: {},
      },
      {
        duration: 600,
        selector: ".circle",
        easing: "easeOutElastic",
      }
    );

    const subOut = new CSSEffect(
      {
        animatedAttrs: {
          top: "0px",
        },
        attrs: {},
      },
      {
        duration: 600,
        selector: ".sub span",
        easing: "easeOutElastic",
      }
    );

    const circleScaleDownEnd = new CSSEffect(
      {
        animatedAttrs: {
          transform: {
            scale: 0,
          },
        },
        initialValues: {
          transform: {
            scale: 1,
          },
        },
        attrs: {},
      },
      {
        duration: 600,
        selector: ".circle,.sub span,.sub",
        easing: "easeOutElastic",
      }
    );

    word.addIncident(wrapperDown, 2000);
    this.addIncident(circleScaleDown, 2000);
    this.addIncident(maskDown, 2000);
    this.addIncident(subOut, 2000);
    this.addIncident(circleScale, 0);

    const delayEnd = this.attrs.delayEnd || 0;
    if (!this.attrs.stopOnLast) {
      this.addIncident(circleScaleDownEnd, 3600 + delayEnd);
    }
  }
}
