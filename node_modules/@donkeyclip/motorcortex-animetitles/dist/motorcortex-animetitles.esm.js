import { HTMLClip, CSSEffect, Group } from '@donkeyclip/motorcortex';

class RotatedLine extends HTMLClip {
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
      gap
    };
  }

  buildTree() {
    const rotateAminmeEnd = new CSSEffect({
      animatedAttrs: {
        transform: {
          rotate: "0deg"
        }
      },
      attrs: {}
    }, {
      duration: 450,
      selector: `.wrapper`,
      easing: "easeInOutQuart"
    });
    const widthLIne = new CSSEffect({
      animatedAttrs: {
        height: this.size.lineHeight
      },
      attrs: {}
    }, {
      duration: 450,
      selector: `.line`,
      easing: "easeInOutQuart"
    });
    const leftTextAnimate = new CSSEffect({
      animatedAttrs: {
        right: `${this.size.gap}%`
      },
      attrs: {}
    }, {
      duration: 900,
      selector: `.text-left`,
      easing: "easeInOutQuart"
    });

    for (let i = 1; i <= 3; i++) {
      const rightTextAnimate = new CSSEffect({
        animatedAttrs: {
          right: `-${this.size.gap}%`
        },
        attrs: {}
      }, {
        duration: 900 * i,
        selector: ".text-right" + i,
        easing: "easeOutExpo"
      });
      this.addIncident(rightTextAnimate, 1500);
    }

    const rightTextAnimateIn = new CSSEffect({
      animatedAttrs: {
        right: "100%"
      },
      attrs: {}
    }, {
      duration: 900,
      selector: ".text-right",
      easing: "easeOutExpo"
    });
    const leftTextAnimateIn = new CSSEffect({
      animatedAttrs: {
        right: "-100%"
      },
      attrs: {}
    }, {
      duration: 900,
      selector: `.text-left`,
      easing: "easeOutExpo"
    });
    const rotateAminmeStartOut = new CSSEffect({
      animatedAttrs: {
        transform: {
          rotate: "90deg"
        }
      },
      attrs: {}
    }, {
      duration: 450,
      selector: `.wrapper`,
      easing: "easeInOutQuart"
    });
    const widthLIneOut = new CSSEffect({
      animatedAttrs: {
        height: "0rem"
      },
      attrs: {}
    }, {
      duration: 450,
      selector: `.line`,
      easing: "easeInOutQuart"
    });
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

class RollingText extends HTMLClip {
  get html() {
    return `
      <div class="wrapper">
        <div class="line"></div>
        <div class="textClip"> 
          <span>${this.attrs.subTitle1}</span>
          <span>${this.attrs.subTitle2}</span>
          <span>${this.attrs.subTitle3}</span>
        </div>
      </div>
        `;
  }

  get css() {
    switch (this.attrs.size) {
      case "S":
        this.size = this.generateSize(21, "-21px", "31px", 0.5, "-42px");
        break;

      case "M":
        this.size = this.generateSize(28, "-28px", "38px", 1, "-56px");
        break;

      case "L":
        this.size = this.generateSize(35, "-35px", "45px", 1.5, "-70px");
        break;

      case "XL":
        this.size = this.generateSize(42, "-42px", "52px", 2, "-84px");
        break;

      case "XXL":
        this.size = this.generateSize(49, "-49px", "59px", 2, "-98px");
        break;

      case "XXXL":
        this.size = this.generateSize(70, "-70px", "80px", 2, "-140px", 86);
        break;
    }

    return `
      body{
       font-size: 62.5%;
      }

      .wrapper{
        white-space: nowrap;
        overflow: hidden;
        display: flex;
        height: ${this.size.lineHeight};
        width : ${this.attrs.width}px;
        justify-content: center;
        align-items: center;
        font-family: ${this.attrs.fontFamily} !important;
      }
    
      .line{
        position: relative; 
        height: 0;
        width: 3px;
        justify-content: center;
        background: ${this.attrs.lineColor} ;
        margin-right: ${this.size.gap}rem;
      
      }
      
      .textClip{
        position: relative;
        display: flex;
        flex-direction: column;
        font-size: ${this.size.fontSizeLeft}px;
        white-space: nowrap;
        overflow: hidden;
        height: ${this.size.fontSizeLeft}px;
      }
    
      .textClip span{
        color : ${this.attrs.textColor};
        position: relative;
        left : -${this.attrs.width / 2}px;
        width : 100%;
        height: ${this.size.fontSizeLeft}px;
        align-items: center;
        display: flex;
        top:0;
      }
  `;
  }

  generateSize(fontSizeLeft, topMove, lineHeight, gap, topMove2) {
    return {
      fontSizeLeft,
      topMove,
      lineHeight,
      gap,
      topMove2
    };
  }

  buildTree() {
    const animeLineHeight = new CSSEffect({
      animatedAttrs: {
        height: this.size.lineHeight
      },
      attrs: {}
    }, {
      duration: 450,
      selector: ".line"
    });
    const animeTextLeft = new CSSEffect({
      animatedAttrs: {
        left: "0px"
      },
      attrs: {}
    }, {
      duration: 800,
      selector: ".textClip span"
    });
    const animeTextTop = new CSSEffect({
      animatedAttrs: {
        top: this.size.topMove
      }
    }, {
      duration: 900,
      selector: ".textClip span"
    });
    const animeTextTopNext = new CSSEffect({
      animatedAttrs: {
        top: this.size.topMove2
      }
    }, {
      duration: 900,
      selector: ".textClip span"
    });
    const animeTextLeftBack = new CSSEffect({
      animatedAttrs: {
        left: `-${this.attrs.width / 2}px`
      }
    }, {
      duration: 900,
      selector: ".textClip span"
    });
    const animeLineHeightBack = new CSSEffect({
      animatedAttrs: {
        height: "0px"
      },
      attrs: {}
    }, {
      duration: 450,
      selector: ".line"
    });
    this.addIncident(animeLineHeight, 0);
    this.addIncident(animeTextLeft, 450);
    this.addIncident(animeTextTop, 2250);
    this.addIncident(animeTextTopNext, 3450);
    const delayEnd = this.attrs.delayEnd || 0;

    if (!this.attrs.stopOnLast) {
      this.addIncident(animeTextLeftBack, 4500 + delayEnd);
      this.addIncident(animeLineHeightBack, 5550 + delayEnd);
    }
  }

}

class SvgBorder extends HTMLClip {
  get html() {
    switch (this.attrs.size) {
      case "S":
        this.size = this.generateSize(600, 70, "2rem", "1rem", 50, 17, 50);
        break;

      case "M":
        this.size = this.generateSize(700, 90, "3rem", "2rem", 50, 34, 70);
        break;

      case "L":
        this.size = this.generateSize(1000, 110, "3.5rem", "2.5rem", 55, 45, 80);
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

  generateSize(borderWidth, borderHeight, fontSizeTitle, fontSizeSub, titleTop, subTop, titleContainerTop) {
    return {
      borderWidth,
      borderHeight,
      fontSizeTitle,
      fontSizeSub,
      titleTop,
      subTop,
      titleContainerTop
    };
  }

  buildTree() {
    const delayEnd = this.attrs.delayEnd || 0;
    const borderAnimete = new CSSEffect({
      animatedAttrs: {
        strokeDashoffset: ` ${12000 - this.attrs.borderGap}px`
      },
      attrs: {}
    }, {
      duration: 1400,
      selector: `.shape2`,
      easing: "easeInOutQuart"
    });
    const titleAnimete = new CSSEffect({
      animatedAttrs: {
        top: "0px"
      },
      attrs: {}
    }, {
      duration: 600,
      selector: `.text`
    });
    const subAnimate = new CSSEffect({
      animatedAttrs: {
        top: "0px"
      },
      attrs: {}
    }, {
      duration: 600,
      selector: `.sub`,
      easing: "easeInOutQuart"
    });
    const sloganAnimate = new CSSEffect({
      animatedAttrs: {
        top: "0px"
      },
      attrs: {}
    }, {
      duration: 600,
      selector: `.slogan`,
      easing: "easeInOutQuart"
    });
    const borderAnimeteLeft = new CSSEffect({
      animatedAttrs: {
        strokeDashoffset: "6000px"
      },
      attrs: {}
    }, {
      duration: 1200,
      selector: `.shape2`
    });
    const titleAnimeteLeft = new CSSEffect({
      animatedAttrs: {
        left: "100%"
      },
      attrs: {}
    }, {
      duration: 800,
      selector: `.text`
    });
    const subAnimateLeft = new CSSEffect({
      animatedAttrs: {
        left: "100%"
      },
      attrs: {}
    }, {
      duration: 800,
      selector: `.sub`,
      easing: "easeInOutQuart"
    });
    const sloganAnimateLeft = new CSSEffect({
      animatedAttrs: {
        left: "150px"
      },
      attrs: {}
    }, {
      duration: 800,
      selector: `.slogan`,
      easing: "easeInOutQuart"
    });
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

class RotatedLineReveal extends HTMLClip {
  get html() {
    switch (this.attrs.size) {
      case "S":
        this.size = this.generateSize("1.5rem", "1rem", "3.5rem", "55px");
        break;

      case "M":
        this.size = this.generateSize("2.5rem", "2rem", "5rem", "90px");
        break;

      case "L":
        this.size = this.generateSize("3.5rem", "2rem", "7rem", "100px");
        break;
    }

    return `
      <div class="wrapper">
        <div class="redLine">
          <div class="text text1"><div class="title ">${this.attrs.title}</div></div>
          <div class="text text2"><div class="sub">${this.attrs.subtitle}</div></div>
        </div>
      </div>
    `;
  }

  get css() {
    return `
      .wrapper{
        width:${this.attrs.width}px;
        height:100%;
        font-family: ${this.attrs.fontFamily} !important;
      }

      .redLine {
        border-left: 2px solid ${this.attrs.lineColor};
        width: 0rem;
        height: ${this.size.lineHeight};
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        transform: rotate(30deg);
        position: relative;
        left: 150%;
        transform-origin: top left;
        white-space: nowrap;
        overflow: hidden;
        color : ${this.attrs.textColor}
      }

      .title{
        font-size: ${this.size.fontSize};
        font-weight: 600;
      }

      .sub{
        font-size: ${this.size.fontSizeSub};
        top: -60px;
        position: relative;
      }

      .text {
        position: relative;
        left: -50px;
        white-space: nowrap;
        overflow: hidden;
      }
    `;
  }

  generateSize(fontSize, fontSizeSub, lineSize, lineHeight) {
    return {
      fontSize,
      fontSizeSub,
      lineSize,
      lineHeight
    };
  }

  buildTree() {
    const grupMc = new Group();
    const lineRotateEnd = new CSSEffect({
      animatedAttrs: {
        transform: {
          rotate: "0deg"
        }
      }
    }, {
      duration: 1200,
      selector: `.redLine`,
      easing: "easeOutExpo"
    });
    const lineMoveEnd = new CSSEffect({
      animatedAttrs: {
        left: `${this.attrs.leftEnd}px`
      }
    }, {
      duration: 2000,
      selector: `.redLine`,
      easing: "easeOutExpo"
    });
    const lineWidthEnd = new CSSEffect({
      animatedAttrs: {
        width: "400px"
      },
      attrs: {
        easing: "easeOutExpo"
      }
    }, {
      duration: 800,
      selector: `.redLine`
    });
    const moveText = new CSSEffect({
      animatedAttrs: {
        left: "10px"
      }
    }, {
      duration: 800,
      selector: `.text`,
      easing: "easeOutExpo"
    });
    const moveSub = new CSSEffect({
      animatedAttrs: {
        top: "0px"
      }
    }, {
      duration: 400,
      selector: `.sub`,
      easing: "easeOutExpo"
    });

    for (let i = 1; i <= 2; i++) {
      const moveTextOut = new CSSEffect({
        animatedAttrs: {
          left: `-${this.attrs.width}px`
        }
      }, {
        duration: Math.round(1700),
        selector: ".text" + i,
        easing: "easeOutExpo"
      });
      grupMc.addIncident(moveTextOut, 3125 + i * 100);
    }

    const lineHeight = new CSSEffect({
      animatedAttrs: {
        height: "0px"
      }
    }, {
      duration: 400,
      selector: `.redLine`,
      easing: "easeInSine"
    });
    this.addIncident(lineRotateEnd, 0);
    this.addIncident(lineMoveEnd, 0);
    this.addIncident(lineWidthEnd, 1200);
    this.addIncident(moveText, 1200);
    this.addIncident(moveSub, 2000);
    const delayEnd = this.attrs.delayEnd || 0;

    if (!this.attrs.stopOnLast) {
      this.addIncident(grupMc, delayEnd);
      this.addIncident(lineHeight, 4250 + delayEnd);
    }
  }

}

class SvgDraw extends HTMLClip {
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
    return {
      svgWidth,
      svgHeight,
      lineSize
    };
  }

  buildTree() {
    const textDrow = new CSSEffect({
      animatedAttrs: {
        strokeDashoffset: "0px"
      },
      attrs: {}
    }, {
      duration: 2700,
      selector: `svg path`,
      easing: "easeInSine"
    });
    const textBigBack = new CSSEffect({
      animatedAttrs: {
        transform: {
          scaleX: 1.3,
          scaleY: 1.3
        }
      }
    }, {
      duration: 1530,
      selector: `svg`,
      id: "transform2",
      easing: "easeOutElastic"
    });
    const textErase = new CSSEffect({
      animatedAttrs: {
        strokeDashoffset: this.attrs.strokeDashOffset
      },
      attrs: {}
    }, {
      duration: 2700,
      selector: `svg path`,
      easing: "easeInSine"
    });
    this.addIncident(textDrow, 0);
    this.addIncident(textBigBack, 2700);
    const delayEnd = this.attrs.delayEnd || 0;

    if (!this.attrs.stopOnLast) {
      this.addIncident(textErase, 3420 + delayEnd);
    }
  }

}

class Circle extends HTMLClip {
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
      selector: ".word"
    });
    this.addIncident(word, 0);
    const circleScale = new CSSEffect({
      animatedAttrs: {
        width: `${this.attrs.width}px`,
        height: `${this.attrs.width}px`
      },
      initialValues: {
        width: `0px`,
        height: `0px`
      }
    }, {
      duration: 500,
      selector: ".circle",
      easing: "easeOutExpo"
    });

    for (let i = 0; i < array.length; i++) {
      const textAnimation = new CSSEffect({
        animatedAttrs: {
          top: "0px",
          opacity: 1
        }
      }, {
        duration: 500,
        selector: ".letter" + (i + 1),
        easing: "easeOutExpo"
      });
      word.addIncident(textAnimation, 500 + 100 * (i + 1));
    }

    const circleScaleDown = new CSSEffect({
      animatedAttrs: {
        width: `${this.attrs.width * 0.8}px`,
        height: `${this.attrs.width * 0.8}px`
      } // initialValues:{
      //   width: `${this.attrs.width}px`,
      //   height: `${this.attrs.width}px`,
      // }

    }, {
      duration: 600,
      selector: ".circle",
      easing: "easeOutElastic"
    });
    const wrapperDown = new CSSEffect({
      animatedAttrs: {
        width: `${this.attrs.width * 0.8}px`,
        height: `${this.attrs.width * 0.8}px`,
        transform: {
          rotate: "10deg"
        }
      },
      attrs: {}
    }, {
      duration: 600,
      selector: ".wrapper",
      easing: "easeOutElastic"
    });
    const maskDown = new CSSEffect({
      animatedAttrs: {
        maskSize: `${this.attrs.width * 0.8}px`,
        transform: {
          rotate: "-10deg"
        }
      },
      attrs: {}
    }, {
      duration: 600,
      selector: ".circle",
      easing: "easeOutElastic"
    });
    const subOut = new CSSEffect({
      animatedAttrs: {
        top: "0px"
      },
      attrs: {}
    }, {
      duration: 600,
      selector: ".sub span",
      easing: "easeOutElastic"
    });
    const circleScaleDownEnd = new CSSEffect({
      animatedAttrs: {
        transform: {
          scale: 0
        }
      },
      initialValues: {
        transform: {
          scale: 1
        }
      },
      attrs: {}
    }, {
      duration: 600,
      selector: ".circle,.sub span,.sub",
      easing: "easeOutElastic"
    });
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

class LogoBox extends HTMLClip {
  get html() {
    return `
      <div class="wrapper">
        <div class="onemore">
          <div class="redLineContainer">
            <div class="yellow">
              <div class="logo"><img src="${this.attrs.logoUrl}" alt="Italian Trulli"></div>
            </div>
            <div class="redLine">
              <div class="text text1">${this.attrs.subTitle1}</div>
              <div class="text text2">${this.attrs.subTitle2}</div>
              <div class="text text3">${this.attrs.subTitle3}</div>
            </div>
           
          </div>
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
        font-family: ${this.attrs.fontFamily} !important;
      }

      .redLineContainer {
        white-space: nowrap;
        width: 0px;
        overflow: hidden;
        background: ${this.attrs.textColor};
        display: flex;
        justify-content: center;
        align-content: center;
        opacity: 0;
        border: ${1 * this.attrs.size}px solid ${this.attrs.textColor};
      }
      
      .redLine {
        position: relative;
        right:  100px;
        overflow: hidden;
        background: ${this.attrs.bgColor};
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        height: ${70 * this.attrs.size}px;
      }
      
      .yellow{
        width: 0px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .logo img{
        width: ${50 * this.attrs.size}px;
      }
      
      .logo{
        display: flex;
        align-items: center;
      }
      
      .text{ 
        left: ${-100 * this.attrs.size}px;
        position: relative;
        display: flex;
        align-items: center;
        height: ${22 * this.attrs.size}px;
        padding-left: 8%;
        color: ${this.attrs.textColor};
        font-size :${14 * this.attrs.size}px;
      }
    `;
  }

  buildTree() {
    const opacity = new CSSEffect({
      animatedAttrs: {
        opacity: 1
      },
      attrs: {}
    }, {
      duration: 1,
      selector: ".redLineContainer"
    });
    const border = new CSSEffect({
      animatedAttrs: {
        right: "0px"
      },
      attrs: {}
    }, {
      duration: 1000,
      selector: ".redLine"
    });
    const conteiner = new CSSEffect({
      animatedAttrs: {
        width: `${this.attrs.width * 0.75 * this.attrs.size}px`
      },
      attrs: {}
    }, {
      duration: 1000,
      selector: ".redLineContainer"
    });

    for (let i = 1; i <= 3; i++) {
      const textLeft = new CSSEffect({
        animatedAttrs: {
          left: "0px"
        },
        attrs: {}
      }, {
        duration: 500 * i,
        selector: ".text" + i,
        easing: "easeOutExpo"
      });
      this.addIncident(textLeft, 500);
    }

    const conteinerMore = new CSSEffect({
      animatedAttrs: {
        width: `${this.attrs.width * this.attrs.size}px`
      },
      attrs: {}
    }, {
      duration: 500,
      selector: ".redLineContainer"
    });
    const yellowW = new CSSEffect({
      animatedAttrs: {
        width: `${80 * this.attrs.size}px`
      },
      attrs: {}
    }, {
      duration: 500,
      selector: ".yellow"
    });
    const end = new CSSEffect({
      animatedAttrs: {
        width: "0%"
      },
      initialValues: {
        width: "100%"
      },
      attrs: {}
    }, {
      duration: 500,
      selector: ".wrapper"
    });
    this.addIncident(opacity, 0);
    this.addIncident(border, 0);
    this.addIncident(conteiner, 0);
    this.addIncident(conteinerMore, 1500);
    this.addIncident(yellowW, 1500);

    if (!this.attrs.stopOnLast) {
      this.addIncident(end, 3000);
    }
  }

}

class RightOpacity extends HTMLClip {
  get html() {
    this.list = this.attrs.text.split("");
    const divList = this.list.map((e, i) => {
      return `<div class="letter letter-item-${i}">${e}</div>`;
    }).join("");
    return `
      <div class="wrapper">
        <div class="letter-wrapper">
          ${divList}
        </div>
      </div>
    `;
  }

  get css() {
    const stroke = this.attrs.stroke === true ? `-webkit-text-stroke:${this.attrs.strokeSize}px ${this.attrs.strokeColor};` : ``;
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
    const left = new CSSEffect({
      animatedAttrs: {
        left: `@expression(index * ${this.attrs.width / this.list.length})px`
      },
      initialValues: {
        left: `@expression((index * ${this.attrs.width / this.list.length})+${this.attrs.width / 2})px`
      }
    }, {
      duration: 1,
      selector: ".letter",
      delay: "@stagger(0, 0)"
    });
    this.addIncident(left, 0);
    const opacity = new CSSEffect({
      animatedAttrs: {
        opacity: 1 // left: `@expression(index * ${this.attrs.width / this.list.length})px`

      },
      initialValues: {
        opacity: 0 // left: `@expression((index * ${this.attrs.width / this.list.length})+${this.attrs.width / 2})px`

      }
    }, {
      duration: 300,
      selector: ".letter",
      easing: "easeOutExpo",
      delay: "@stagger(0, 300)"
    });
    this.addIncident(opacity, 10);
    const left2 = new CSSEffect({
      animatedAttrs: {
        left: "0px"
      },
      initialValues: {
        left: `${this.attrs.width * 0.5}px`
      }
    }, {
      duration: 300,
      selector: ".letter-wrapper",
      easing: "easeOutExpo" // delay: "@stagger(0, 300)"

    });
    this.addIncident(left2, 0);
    const leftLetter = new CSSEffect({
      animatedAttrs: {
        left: `${this.attrs.width / 2}px`
      }
    }, {
      duration: 300,
      selector: ".letter",
      easing: "easeInQuad",
      delay: "@stagger(0, 300,0.5,easeInQuad,omni)"
    });
    this.addIncident(leftLetter, this.attrs.exitTime);
    const opacityback = new CSSEffect({
      animatedAttrs: {
        opacity: 0
      }
    }, {
      duration: 300,
      selector: ".letter"
    });
    this.addIncident(opacityback, this.calculatedDuration - 300);
  }

}

class LetterScale extends HTMLClip {
  get html() {
    this.list = this.attrs.text.split("");
    const divList = this.list.map((e, i) => {
      return `<div class="letter letter-item-${i}">${e}</div>`;
    }).join("");
    return `
      <div class="wrapper">
        <div class="letter-wrapper">
          ${divList}
        </div>
      </div>
    `;
  }

  get css() {
    const stroke = this.attrs.stroke === true ? `-webkit-text-stroke:${this.attrs.strokeSize}px ${this.attrs.strokeColor};` : ``;
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
    const left = new CSSEffect({
      animatedAttrs: {
        fontSize: `${this.attrs.fontSize}px`
      },
      initialValues: {
        fontSize: `${this.attrs.fontSize * 0.7}px`
      }
    }, {
      duration: 600,
      selector: ".letter",
      easing: "easeOutExpo",
      delay: `@stagger(0, 600,0.5,linear,omni)`
    });
    this.addIncident(left, 0);
  }

}

class CircularText extends HTMLClip {
  get html() {
    return `
    <div class="wrapper">
      <div class="circle">
        <svg viewBox="0 0 ${this.attrs.viewBox} ${this.attrs.viewBox}">
          <path d="M ${this.attrs.viewBox / 2 - this.attrs.path},${this.attrs.viewBox / 2} a ${this.attrs.path}, ${this.attrs.path} 0 1, 1 0,1 z" id="circular" />
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
    const left = new CSSEffect({
      animatedAttrs: {
        transform: {
          rotate: `360deg`
        }
      }
    }, {
      duration: 3000,
      selector: ".circle svg"
    });
    this.addIncident(left, 0);
  }

}

const _COLOR = "color";
const RotatedLIneVal = {
  width: {
    optional: false,
    type: "number",
    min: 0
  },
  size: {
    type: "enum",
    values: ["S", "M", "L", "XL"]
  },
  lineColor: {
    optional: true,
    type: _COLOR
  },
  textColor: {
    optional: true,
    type: _COLOR
  },
  subTitle1: {
    optional: false,
    type: "string"
  },
  subTitle2: {
    optional: false,
    type: "string"
  },
  subTitle3: {
    optional: false,
    type: "string"
  },
  title: {
    optional: false,
    type: "string"
  },
  stopOnLast: {
    optional: false,
    type: "boolean"
  },
  delayEnd: {
    optional: true,
    type: "number",
    min: 0
  },
  fontFamily: {
    optional: false,
    type: "string"
  }
};
const RollingTextVal = {
  width: {
    optional: false,
    type: "number",
    min: 0
  },
  size: {
    type: "enum",
    values: ["S", "M", "L", "XL", "XXL", "XXXL"]
  },
  lineColor: {
    optional: true,
    type: _COLOR
  },
  textColor: {
    optional: true,
    type: _COLOR
  },
  subTitle1: {
    optional: false,
    type: "string"
  },
  subTitle2: {
    optional: false,
    type: "string"
  },
  subTitle3: {
    optional: false,
    type: "string"
  },
  stopOnLast: {
    optional: false,
    type: "boolean"
  },
  delayEnd: {
    optional: true,
    type: "number",
    min: 0
  },
  fontFamily: {
    optional: false,
    type: "string"
  }
};
const RotatedLineRevealVal = {
  width: {
    optional: false,
    type: "number",
    min: 0
  },
  size: {
    type: "enum",
    values: ["S", "M", "L"]
  },
  lineColor: {
    optional: true,
    type: _COLOR
  },
  textColor: {
    optional: true,
    type: _COLOR
  },
  title: {
    optional: false,
    type: "string"
  },
  subtitle: {
    optional: false,
    type: "string"
  },
  stopOnLast: {
    optional: false,
    type: "boolean"
  },
  leftEnd: {
    optional: false,
    type: "number",
    min: 0
  },
  delayEnd: {
    optional: true,
    type: "number",
    min: 0
  },
  fontFamily: {
    optional: false,
    type: "string"
  }
};
const SvgBorderVal = {
  width: {
    optional: true,
    type: "number",
    min: 0
  },
  size: {
    type: "enum",
    values: ["S", "M", "L"]
  },
  lineColor: {
    optional: true,
    type: _COLOR
  },
  textColor: {
    optional: true,
    type: _COLOR
  },
  title: {
    optional: false,
    type: "string"
  },
  slogan: {
    optional: false,
    type: "string"
  },
  subTitle: {
    optional: false,
    type: "string"
  },
  stopOnLast: {
    optional: false,
    type: "boolean"
  },
  delayEnd: {
    optional: true,
    type: "number",
    min: 0
  },
  borderGap: {
    optional: false,
    type: "number",
    min: 0
  },
  fontFamily: {
    optional: false,
    type: "string"
  }
};
const CircleVal = {
  width: {
    optional: true,
    type: "number",
    min: 0
  },
  fontsize: {
    optional: true,
    type: "number",
    min: 1
  },
  circleColor: {
    optional: true,
    type: _COLOR
  },
  textColor: {
    optional: true,
    type: _COLOR
  },
  title: {
    optional: false,
    type: "string"
  },
  subTitle: {
    optional: false,
    type: "string"
  },
  stopOnLast: {
    optional: false,
    type: "boolean"
  },
  delayEnd: {
    optional: true,
    type: "number",
    min: 0
  },
  fontFamily: {
    optional: false,
    type: "string"
  }
};
const SvgDrawVal = {
  width: {
    optional: true,
    type: "number",
    min: 0
  },
  size: {
    type: "enum",
    values: ["S", "M", "L"]
  },
  lineColor: {
    optional: true,
    type: _COLOR
  },
  textColor: {
    optional: true,
    type: _COLOR
  },
  strokeDashOffset: {
    optional: true,
    type: "number"
  },
  StrokeDashArray: {
    optional: true,
    type: "number"
  },
  erase: {
    optional: true,
    type: "boolean"
  },
  svg: {
    optional: true,
    type: "string"
  },
  stopOnLast: {
    optional: false,
    type: "boolean"
  },
  delayEnd: {
    optional: true,
    type: "number",
    min: 0
  },
  fontFamily: {
    optional: false,
    type: "string"
  }
};
const RigthOpacityValidationVal = {
  width: {
    optional: false,
    type: "number",
    min: 0
  },
  height: {
    optional: false,
    type: "number",
    min: 0
  },
  text: {
    optional: false,
    type: "string"
  },
  color: {
    optional: true,
    type: _COLOR
  },
  fontSize: {
    optional: false,
    type: "number",
    min: 0
  },
  stroke: {
    optional: false,
    type: "boolean"
  },
  strokeSize: {
    optional: true,
    type: "number",
    min: 0
  },
  strokeColor: {
    optional: true,
    type: _COLOR
  },
  fontFamily: {
    optional: false,
    type: "string"
  },
  exitTime: {
    optional: false,
    type: "number",
    min: 0
  }
};
const LetterScaleValidationVal = {
  width: {
    optional: false,
    type: "number",
    min: 0
  },
  height: {
    optional: false,
    type: "number",
    min: 0
  },
  text: {
    optional: false,
    type: "string"
  },
  color: {
    optional: true,
    type: _COLOR
  },
  fontSize: {
    optional: false,
    type: "number",
    min: 0
  },
  stroke: {
    optional: false,
    type: "boolean"
  },
  strokeSize: {
    optional: true,
    type: "number",
    min: 0
  },
  strokeColor: {
    optional: true,
    type: _COLOR
  },
  fontFamily: {
    optional: false,
    type: "string"
  }
};
const CircularTextValidation = {
  width: {
    optional: false,
    type: "number",
    min: 0
  },
  height: {
    optional: false,
    type: "number",
    min: 0
  },
  color: {
    optional: true,
    type: _COLOR
  },
  text: {
    optional: false,
    type: "string"
  },
  fontSize: {
    optional: false,
    type: "number",
    min: 0
  },
  viewBox: {
    optional: false,
    type: "number"
  },
  path: {
    optional: false,
    type: "number",
    min: 0
  },
  fill: {
    optional: false,
    type: _COLOR
  },
  fontFamily: {
    optional: false,
    type: "string"
  }
};

var name = "@donkeyclip/motorcortex-animetitles";
var version = "1.2.3";

var index = {
  npm_name: name,
  version: version,
  incidents: [{
    exportable: RotatedLine,
    name: "RotatedLine",
    attributesValidationRules: RotatedLIneVal
  }, {
    exportable: RollingText,
    name: "RollingText",
    attributesValidationRules: RollingTextVal
  }, {
    exportable: SvgBorder,
    name: "SvgBorder",
    attributesValidationRules: SvgBorderVal
  }, {
    exportable: RotatedLineReveal,
    name: "RotatedLineReveal",
    attributesValidationRules: RotatedLineRevealVal
  }, {
    exportable: SvgDraw,
    name: "SvgDraw",
    attributesValidationRules: SvgDrawVal
  }, {
    exportable: Circle,
    name: "Circle",
    attributesValidationRules: CircleVal
  }, {
    exportable: LogoBox,
    name: "LogoBox"
  }, {
    exportable: RightOpacity,
    name: "RightOpacity",
    attributesValidationRules: RigthOpacityValidationVal
  }, //todo
  // {
  //   exportable: FlushStroke,
  //   name: "FlushStroke"
  //   attributesValidationRules: Circle
  // },
  {
    exportable: LetterScale,
    name: "LetterScale",
    attributesValidationRules: LetterScaleValidationVal
  }, {
    exportable: CircularText,
    name: "CircularText",
    attributesValidationRules: CircularTextValidation
  }]
};

export { index as default };
