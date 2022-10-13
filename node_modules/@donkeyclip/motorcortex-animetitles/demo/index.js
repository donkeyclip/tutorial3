import { HTMLClip, loadPlugin, CSSEffect } from "@donkeyclip/motorcortex";
import Player from "@donkeyclip/motorcortex-player";
import TitlesPlugin from "../dist/motorcortex-animetitles.esm";
import imgsvg from "./assets/imgsvg.js";

const Titles = loadPlugin(TitlesPlugin);

const clip = new HTMLClip({
  css: `
    body{
      background-color : white;
    }

    .container{
      position: relative;
      background:linear-gradient(141deg, #ccc 25%, #eee 40%, #ddd 55%);
      height:100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;
    }

    .row{
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    .cel{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: absolute;
    }

    .full{
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,
  html: `
    <div class="container">
      <div class="row" >
        <div class="cel"> <div class="rollingtext full"></div>  </div>
        <div class="cel"><div class="svgborder full"></div> </div>
        <div class="cel"> <div class="rotatedline full"></div> </div>
        <div class="cel"> <div class="rotatedlinereveal full"></div> </div>
        <div class="cel"><div class="svgdraw full"></div> </div>
        <div class="cel"><div class="circle full"></div> </div>
        <div class="cel"><div class="logobox full"></div> </div>
        <div class="cel"><div class="textwriting full"></div> </div>
        <div class="cel"><div class="rightopacity full"></div> </div>
        <div class="cel"><div class="letterscale full"></div> </div>
        <div class="cel"><div class="circulartext full"></div> </div>
      </div>
    </div>
  `,
  fonts: [
    {
      type: `google-font`,
      src: `https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap`,
    },
    {
      type: `google-font`,
      src: `https://fonts.googleapis.com/css2?family=Righteous&display=swap`,
    },
    {
      type: "google-font",
      src: "https://fonts.googleapis.com/css2?family=Commissioner:wght@100;200;300;400;500;600;700;800;900&display=swap",
    },
  ],
  host: document.getElementById("clip"),
  containerParams: {
    width: "1280px",
    height: "720px",
  },
});

const svgdraw = new Titles.SvgDraw(
  {
    duration: 3600,
    width: 900,
    size: "L",
    lineColor: "#ff0000",
    strokeDashOffset: 10000,
    StrokeDashArray: 10000,
    svg: imgsvg,
    stopOnLast: false,
  },
  {
    selector: ".svgdraw",
  }
);

const rolinText = new Titles.RollingText(
  {
    duration: 6000,
    width: 450,
    size: "XL",
    lineColor: "#ff0000",
    textColor: "#000",
    subTitle1: "The",
    subTitle2: "MotorCortex Team",
    subTitle3: "Presents",
    stopOnLast: false,
    delayEnd: 1000,
    fontFamily: "Commissioner",
  },
  {
    selector: ".rollingtext",
  }
);

const rotatedlinereveal = new Titles.RotatedLineReveal(
  {
    duration: 5000,
    width: 800,
    size: "M",
    lineColor: "#ff0000",
    textColor: "#000",
    title: "Animetitles",
    subtitle: "MC Plugin",
    leftEnd: 100,
    stopOnLast: false,
    fontFamily: "Commissioner",
  },
  {
    selector: ".rotatedlinereveal",
  }
);

const rotatedlinerevealOp = new CSSEffect(
  {
    animatedAttrs: {
      opacity: 1,
    },
    initialValues: {
      opacity: 0,
    },
  },
  {
    duration: 1,
    selector: ".rotatedlinereveal",
  }
);

const rotatedline = new Titles.RotatedLine(
  {
    duration: 6000,
    width: 400,
    size: "XL",
    lineColor: "#ff0000",
    textColor: "#000",
    subTitle1: "Minimal",
    subTitle2: "Elegant",
    subTitle3: "Modern",
    title: "Title",
    stopOnLast: false,
    fontFamily: "Commissioner",
  },
  {
    selector: ".rotatedline",
  }
);

const svgborder = new Titles.SvgBorder(
  {
    duration: 5000,
    size: "L",
    lineColor: "#ff0000",
    textColor: "#000",
    subTitle: "Developed by",
    slogan: "-KMB-",
    title: "MotorCortex Team",
    stopOnLast: false,
    fontFamily: "Commissioner",
    borderGap: 300,
  },
  {
    selector: ".svgborder",
  }
);

const circle = new Titles.Circle(
  {
    fontSize: 40,
    circleColor: "#ff0000",
    textColor: "#000",
    title: "ANIMATED",
    subTitle: "TITLES",
    stopOnLast: false,
    fontFamily: "Righteous",
    width: 500,
  },
  {
    selector: ".circle",
  }
);

const logobox = new Titles.LogoBox(
  {
    size: 2,
    textColor: "#fff",
    bgColor: "#000",
    subTitle1: "TYPOGRAPHY",
    subTitle2: "ANIMATION",
    subTitle3: "BY",
    width: 200,
    stopOnLast: false,
    fontFamily: "Commissioner",
    logoUrl:
      "https://donkeyclip.github.io/motorcortex-animetitles/demo/assets/logo.png",
  },
  {
    selector: ".logobox",
  }
);

const RightOpacity = new Titles.RightOpacity(
  {
    width: 1000,
    height: 250,
    text: "RightOpacity",
    color: "#0000",
    fontSize: 100,
    stroke: true,
    strokeSize: 2,
    strokeColor: "rebeccapurple",
    fontFamily: "Rubik Mono One",
    exitTime: 1000,
  },
  {
    selector: ".rightopacity",
  }
);

const rightopacityOpacity = new CSSEffect(
  {
    animatedAttrs: {
      opacity: 1,
    },
    initialValues: {
      opacity: 0,
    },
  },
  {
    duration: 1,
    selector: ".rightopacity",
  }
);

const LetterScale = new Titles.LetterScale(
  {
    width: 900,
    height: 900,
    color: "rebeccapurple",
    text: "LetterScale",
    fontSize: 100,
    stroke: false,
    strokeSize: 2,
    strokeColor: "rebeccapurple",
    fontFamily: "Righteous",
  },
  {
    selector: ".letterscale",
  }
);

const LetterScaleOpacity = new CSSEffect(
  {
    animatedAttrs: {
      opacity: 1,
    },
    initialValues: {
      opacity: 0,
    },
  },
  {
    duration: 1,
    selector: ".letterscale",
  }
);
const LetterScaleOpacityBack = new CSSEffect(
  {
    animatedAttrs: {
      opacity: 0,
    },
  },
  {
    duration: 1,
    selector: ".letterscale",
  }
);

const CircularText = new Titles.CircularText(
  {
    width: 500,
    height: 500,
    color: "#ff0000",
    text: "CircularText - AnimeTitles - MotorCortex - Plugin -",
    fontSize: 10,
    viewBox: 100,
    path: 38,
    fill: "#ff000000",
    fontFamily: "Righteous",
  },
  {
    selector: ".circulartext",
    repeats: 2,
  }
);

const CircularTextOpacity = new CSSEffect(
  {
    animatedAttrs: {
      opacity: 1,
    },
    initialValues: {
      opacity: 0,
    },
  },
  {
    duration: 1,
    selector: ".circulartext",
  }
);

clip.addIncident(rolinText, 0);
clip.addIncident(rotatedlinereveal, 7000);
clip.addIncident(rotatedlinerevealOp, 7000);
clip.addIncident(svgborder, 11025);
clip.addIncident(rotatedline, 16025);
clip.addIncident(circle, 22025);
clip.addIncident(logobox, 26225);
clip.addIncident(svgdraw, 29725);
clip.addIncident(rightopacityOpacity, 35845);
clip.addIncident(RightOpacity, 35846);
clip.addIncident(LetterScaleOpacity, clip.calculatedDuration);
clip.addIncident(LetterScale, clip.calculatedDuration);
clip.addIncident(LetterScaleOpacityBack, clip.calculatedDuration);
clip.addIncident(CircularTextOpacity, clip.calculatedDuration);
clip.addIncident(CircularText, clip.calculatedDuration);

new Player({ clip });
