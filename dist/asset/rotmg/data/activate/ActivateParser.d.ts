export declare const activateConstructors: Map<any, any>;
export declare function XMLActivate(): (constructor: Function) => void;
export default class ActivateParser {
    static fromXML(xml: any, nodeName: string): any | undefined;
}
