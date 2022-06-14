import "reflect-metadata";
export interface Serializable {
    serialize(): string;
}
export declare const XMLValue: {
    serialize: (input: any) => any;
    deserialize: (input: any) => any;
};
export declare const XMLBoolean: {
    serialize: (input: any) => {
        "#text": string;
    };
    deserialize: (input: any) => boolean;
};
export declare function XMLArray<T>(constructor: new () => T): DataController<T[]>;
export declare function XMLEnum(e: any): {
    serialize: (input: any) => any;
    deserialize: (input: any) => any;
};
export declare function XMLNoDefault<T>(defaultValue: T): {
    serialize: (input: T) => T;
    deserialize: (input: any) => any;
};
export declare const XMLHex: DataController<string>;
export declare type DataController<T> = {
    serialize: (input: T) => any;
    deserialize: (input: any) => T;
};
export declare type SerializationData = {
    name: string;
    controller: DataController<any>;
    options: DataOptions;
};
export declare type DataOptions = {
    isConstructed?: boolean;
    deserializeFullObject?: boolean;
};
export declare function Data(name: string, dataController?: DataController<any>, options?: DataOptions): (target: any, propertyKey: string) => void;
export declare function serializeObject(target: any): any;
export declare function deserializeObject(target: any, data: any): any;
