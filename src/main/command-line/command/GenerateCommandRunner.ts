import fs from 'fs';
import CommandRunner from '@/command-line/command/CommandRunner';
import {EntityRelationshipModelParser} from '@nestorrente/erdiagram';
import {EntityRelationshipModelToCodeConverterProvider} from '@/resolver/EntityRelationshipModelToCodeConverterProvider';
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

		const erModelParser = new EntityRelationshipModelParser(config.parser);
		const erModelToCodeConverterProvider = new EntityRelationshipModelToCodeConverterProvider(config);
		const erModelToCodeConverter = erModelToCodeConverterProvider.getERModelToCodeConverter(outputFormat);
		const outputStrategyResolver = new OutputStrategyResolver();

		const inputCode = fs.readFileSync(inputFilePath).toString();
		const model = erModelParser.parseModel(inputCode);
		const outputCode = erModelToCodeConverter.convertToCode(model);

		const outputStrategy = outputStrategyResolver.resolveOutputStrategy(outputFilePath);
		outputStrategy.write(outputCode);

	}

}

export default generateCommandRunner;
