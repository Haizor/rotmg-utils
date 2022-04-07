import { SourceLoader } from "./SourceLoader";
import JSZip from "jszip";
export declare class File2TextSourceLoader implements SourceLoader<JSZip.JSZipObject, string> {
    convert(src: JSZip.JSZipObject): Promise<string>;
}
