import fs from 'fs';
import CommandRunner from '@/command-line/command/CommandRunner';
import {EntityRelationshipModelParser} from '@nestorrente/erdiagram';
import {SourceCodeGeneratorProvider} from '@/resolver/SourceCodeGeneratorProvider';
import OutputStrategyResolver from '@/resolver/output-strategy/OutputStrategyResolver';
import {OutputFormat} from '@/output-formats';
import {configFileReader} from '@/config/ConfigFileReader';

export interface GenerateCommandArgs {
	configFilePath?: string;
	inputFilePath: string;
	outputFilePath?: string;
	outputFormat: OutputFormat;
}

const generateCommandRunner: CommandRunner<GenerateCommandArgs> = {

	async run(args: GenerateCommandArgs) {

		const {
			configFilePath,
			inputFilePath,
			outputFilePath,
			outputFormat
		} = args;

		const config = configFileReader.parseConfigFile(configFilePath);

		const inputCode = fs.readFileSync(inputFilePath).toString();

		const model = new EntityRelationshipModelParser(config.parser)
            .parseModel(inputCode);

		const outputCode = new SourceCodeGeneratorProvider(config)
            .getSourceCodeGenerator(outputFormat)
            .generateSourceCode(model);

		new OutputStrategyResolver()
			.resolveOutputStrategy(outputFilePath)
            .write(outputCode);

	}

}

export default generateCommandRunner;
