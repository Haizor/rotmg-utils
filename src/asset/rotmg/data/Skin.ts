import { XMLObject } from "./XMLObject";
import { Data } from "../../../asset/normal/Serializable";

export class Skin extends XMLObject {
	@Data("PlayerClassType")
	playerClassType: number = -1;
}