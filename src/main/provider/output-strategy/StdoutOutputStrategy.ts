import OutputStrategy from '@/provider/output-strategy/OutputStrategy';

export default class StdoutOutputStrategy implements OutputStrategy {

	write(outputCode: string): void {
		process.stdout.write(outputCode);
		process.stdout.write('\n');
	}

}
