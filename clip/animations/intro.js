import ATP from "@donkeyclip/motorcortex-animetitles";
import { loadPlugin } from "@donkeyclip/motorcortex";

const AT = loadPlugin(ATP);

export const circle = new AT.Circle(
	{
		fontSize: 40,
		circleColor: "#ff0000",
		textColor: "#d0ff00",
		title: "WINTER 2022",
		subTitle: "walk / run / pose",
		stopOnLast: false,
		delayEnd: 0,
		width: 400,
	},
	{
		selector: "#intro",
		duration: 4000
	}
);