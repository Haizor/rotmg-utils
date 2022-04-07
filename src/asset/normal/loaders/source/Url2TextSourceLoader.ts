import { SourceLoader } from "./SourceLoader";

export type Fetcher = (src: string) => Promise<string>;

export class Url2TextSourceLoader implements SourceLoader<string, string> {
	fetcher?: Fetcher;
	
	constructor(fetcher?: Fetcher) {
		this.fetcher = fetcher;
	}
	
	async convert(src: string): Promise<string> {
		if (this.fetcher) {
			return this.fetcher(src);
		}
		return (await fetch(src)).text();
	}
}