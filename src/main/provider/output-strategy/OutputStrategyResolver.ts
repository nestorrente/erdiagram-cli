import OutputStrategy from '@/provider/output-strategy/OutputStrategy';
import FileOutputStrategy from '@/provider/output-strategy/FileOutputStrategy';
import StdoutOutputStrategy from '@/provider/output-strategy/StdoutOutputStrategy';

export default class OutputStrategyResolver {

	public resolveOutputStrategy(outputFilePath?: string): OutputStrategy {

		if (outputFilePath) {
			return new FileOutputStrategy(outputFilePath);
		}

		return new StdoutOutputStrategy();

	}

}
