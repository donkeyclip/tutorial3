import { HTMLClip /*, loadPlugin*/ } from "@donkeyclip/motorcortex";
// import AnimeDefinition from "@donkeyclip/motorcortex-anime";
// const Anime = loadPlugin(AnimeDefinition);

export default class FlushStroke extends HTMLClip {
  get html() {
    const divList = this.attrs.text
      .map((e, i) => {
        return `<div class="letter letter-item-${i}">${e}</div>`;
      })
      .join("");

    return `
      <div class="wrapper">
        ${divList}
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
        flex-direction: column;
      }

      .letter{
        font-size:${this.attrs.fontSize}px;
        color:rgba(${this.attrs.strokeColor[0]},${this.attrs.strokeColor[1]},${this.attrs.strokeColor[2]},0);
        text-transform:uppercase;
        font-family: ${this.attrs.fontFamily};
        -webkit-text-stroke:${this.attrs.strokeSize}px rgb(${this.attrs.strokeColor[0]},${this.attrs.strokeColor[1]},${this.attrs.strokeColor[2]});
      }
    `;
  }

  buildTree() {
    // const left = new CSSEffect(
    //   {
    //     animatedAttrs: {
    //       color: `rgba(${this.attrs.strokeColor[0]},${this.attrs.strokeColor[1]},${this.attrs.strokeColor[2]},1)`
    //     },
    //     initialValues: {
    //       color: `rgba(${this.attrs.strokeColor[0]},${this.attrs.strokeColor[1]},${this.attrs.strokeColor[2]},0)`
    //     }
    //   },
    //   {
    //     duration: 150,
    //     selector: ".letter",
    //     delay: "@stagger(0, 300)"
    //   }
    // );
    // this.addIncident(left, 0);
  }
}
