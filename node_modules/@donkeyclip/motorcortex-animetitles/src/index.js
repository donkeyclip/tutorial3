import RotatedLIne from "./incidents/RotatedLine";
import RollingText from "./incidents/RollingText";
import SvgBorder from "./incidents/SvgBorder";
import RotatedLineReveal from "./incidents/RotatedLineReveal";
import SvgDraw from "./incidents/SvgDraw";
import Circle from "./incidents/Circle";
import LogoBox from "./incidents/LogoBox";
import RightOpacity from "./incidents/RightOpacity";
// import FlushStroke from "./incidents/FlushStroke";
import LetterScale from "./incidents/LetterScale";
import CircularText from "./incidents/CircularText";
import {
  RotatedLIneVal,
  RollingTextVal,
  SvgBorderVal,
  RotatedLineRevealVal,
  SvgDrawVal,
  CircleVal,
  RigthOpacityValidationVal,
  LetterScaleValidationVal,
  CircularTextValidation,
} from "./validation";
import { name, version } from "../package.json";

export default {
  npm_name: name,
  version: version,
  incidents: [
    {
      exportable: RotatedLIne,
      name: "RotatedLine",
      attributesValidationRules: RotatedLIneVal,
    },
    {
      exportable: RollingText,
      name: "RollingText",
      attributesValidationRules: RollingTextVal,
    },
    {
      exportable: SvgBorder,
      name: "SvgBorder",
      attributesValidationRules: SvgBorderVal,
    },
    {
      exportable: RotatedLineReveal,
      name: "RotatedLineReveal",
      attributesValidationRules: RotatedLineRevealVal,
    },
    {
      exportable: SvgDraw,
      name: "SvgDraw",
      attributesValidationRules: SvgDrawVal,
    },
    {
      exportable: Circle,
      name: "Circle",
      attributesValidationRules: CircleVal,
    },
    {
      exportable: LogoBox,
      name: "LogoBox",
    },
    {
      exportable: RightOpacity,
      name: "RightOpacity",
      attributesValidationRules: RigthOpacityValidationVal,
    },
    //todo
    // {
    //   exportable: FlushStroke,
    //   name: "FlushStroke"
    //   attributesValidationRules: Circle
    // },
    {
      exportable: LetterScale,
      name: "LetterScale",
      attributesValidationRules: LetterScaleValidationVal,
    },
    {
      exportable: CircularText,
      name: "CircularText",
      attributesValidationRules: CircularTextValidation,
    },
  ],
};
