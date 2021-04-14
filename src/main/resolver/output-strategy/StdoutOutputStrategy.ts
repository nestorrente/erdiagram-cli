import fs from 'fs';
import OutputStrategy from '@/resolver/output-strategy/OutputStrategy';

export default class StdoutOutputStrategy implements OutputStrategy {

	write(outputCode: string): void {
		process.stdout.write(outputCode);
		process.stdout.write('\n');
	}

}
