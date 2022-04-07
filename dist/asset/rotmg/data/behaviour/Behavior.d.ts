declare type BehaviorConstructor = new () => Behavior;
export declare const behaviorConstructors: Map<string, BehaviorConstructor>;
export declare abstract class Behavior {
    bucket?: string;
    cooldown?: number;
    abstract get name(): string;
    serialize(): any;
}
export declare function XMLBehavior(): (constructor: BehaviorConstructor) => void;
export {};
