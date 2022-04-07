import { SourceLoader } from "./SourceLoader";
export declare type Fetcher = (src: string) => Promise<string>;
export declare class Url2TextSourceLoader implements SourceLoader<string, string> {
    fetcher?: Fetcher;
    constructor(fetcher?: Fetcher);
    convert(src: string): Promise<string>;
}
