import { DataController } from "../../../../asset/normal/Serializable";
import { Behavior } from "./Behavior";
import { Transition } from "./Transition";
export declare const BehaviorData: DataController<Behavior[]>;
export declare const StateData: DataController<State[]>;
export declare const TransitionData: DataController<Transition[]>;
export declare class State {
    id: string;
    behaviors: Behavior[];
    states: State[];
    transitions: Transition[];
    parent?: State;
    getChildWithID(id: string): State | undefined;
    serialize(): any;
}
