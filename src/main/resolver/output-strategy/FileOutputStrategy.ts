import fs from 'fs';
import OutputStrategy from '@/resolver/output-strategy/OutputStrategy';

export default class FileOutputStrategy implements OutputStrategy {

	constructor(
			private readonly outputFilePath: string
	) {

	}

	write(outputCode: string): void {
		fs.writeFileSync(this.outputFilePath, outputCode + '\n')
	}

}
