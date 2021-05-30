import fs from 'fs';
import CommandRunner from '@/command-line/command/CommandRunner';
import {EntityRelationshipModelParser} from '@nestorrente/erdiagram';
import {EntityRelationshipModelSourceCodeGeneratorProvider} from '@/provider/EntityRelationshipModelSourceCodeGeneratorProvider';
import OutputStrategyResolver from '@/provider/output-strategy/OutputStrategyResolver';
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
		const erModelSourceCodeGeneratorProvider = new EntityRelationshipModelSourceCodeGeneratorProvider(config);
		const erModelSourceCodeGenerator = erModelSourceCodeGeneratorProvider.getSourceCodeGenerator(outputFormat);
		const outputStrategyResolver = new OutputStrategyResolver();

		const inputCode = fs.readFileSync(inputFilePath).toString();
		const model = erModelParser.parseModel(inputCode);
		const outputCode = erModelSourceCodeGenerator.generateSourceCode(model);

		const outputStrategy = outputStrategyResolver.resolveOutputStrategy(outputFilePath);
		outputStrategy.write(outputCode);

	}

};

export default generateCommandRunner;
