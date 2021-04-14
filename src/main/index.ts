import fs from 'fs';
import {EntityRelationshipModelParser} from '@nestorrente/erdiagram';
import {EntityRelationshipModelToCodeConverterProvider} from '@/resolver/EntityRelationshipModelToCodeConverterProvider';
import {commandLineArgumentsResolver} from '@/cl-args/CommandLineArgumentsResolver';
import {configFileManager} from '@/config/ConfigFileManager';
import OutputStrategyResolver from '@/resolver/output-strategy/OutputStrategyResolver';

run().then(finishSucessfully).catch(finishWithError);

async function run() {

	const {
		createConfig,
		configFilePath,
		inputFilePath,
		outputFilePath,
		outputFormat
	} = commandLineArgumentsResolver.resolveCommandLineArguments();

	if (createConfig) {
		await configFileManager.createConfigFile(configFilePath);
		return;
	}

	if(!inputFilePath) {
		throw new Error('Missing input file (use -h for more information)');
	}

	if(!outputFormat) {
		throw new Error('Missing output format (use -h for more information)');
	}

	const config = configFileManager.parseConfigFile(configFilePath);

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

function finishSucessfully() {
	return process.exit();
}

function finishWithError(e: any) {

	const errorMessage = 'message' in e ? e.message : e;

	process.stderr.write(errorMessage);
	process.stderr.write('\n');

	process.exit(-1);

}
