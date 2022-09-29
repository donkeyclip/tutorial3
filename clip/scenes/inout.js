import { Group } from "@donkeyclip/motorcortex";

import { slidein } from "../effects/slidein";
import { slideout } from "../effects/slideout";

export const inout = new Group();
inout.addIncident(slidein, 0);
inout.addIncident(slideout, 3000);
