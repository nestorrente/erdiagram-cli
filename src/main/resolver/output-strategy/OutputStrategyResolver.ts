import fs from 'fs';
import OutputStrategy from '@/resolver/output-strategy/OutputStrategy';
import FileOutputStrategy from '@/resolver/output-strategy/FileOutputStrategy';
import StdoutOutputStrategy from '@/resolver/output-strategy/StdoutOutputStrategy';

export default class OutputStrategyResolver {

	public resolveOutputStrategy(outputFilePath?: string): OutputStrategy {

		if (outputFilePath) {
			return new FileOutputStrategy(outputFilePath);
		}

		return new StdoutOutputStrategy();

	}

}
