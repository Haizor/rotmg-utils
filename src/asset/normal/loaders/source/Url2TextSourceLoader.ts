import { SourceLoader } from "./SourceLoader";

export type Fetcher = (src: string) => Promise<any>;

export class Url2TextSourceLoader implements SourceLoader<string, string> {
	fetcher?: Fetcher;
	
	constructor(fetcher?: Fetcher) {
		this.fetcher = fetcher;
	}
	
	async convert(src: string): Promise<string> {
		const fetcher = this.fetcher ?? fetch;
		return (await fetcher(src)).text();
	}
}