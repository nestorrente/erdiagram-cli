import yargs from 'yargs';
import fs from 'fs';
import {
	entityRelationshipModelParser,
	EntityRelationshipModelToClassCodeConverter,
	EntityRelationshipModelToCodeConverter,
	EntityRelationshipModelToDatabaseCodeConverter,
	JavaClassModelToCodeConverter,
	MySqlDatabaseModelToCodeConverter
} from '@nestorrente/erdiagram';

const args = yargs
		.option('format', {
			alias: 'f',
			type: 'string',
			description: 'Output format (mysql/java)'
		})
		.option('output', {
			alias: 'o',
			type: 'string',
			description: 'Output file path (console if not specified)'
		})
		.help()
		.alias('help', 'h')
		.version()
		.alias('version', 'v')
		.argv;

const config = {
	inputFile: args._[0],
	format: (args.format ?? 'mysql').toLowerCase(),
	outputFile: args.output
};

const modelCodeGenerator = ((): EntityRelationshipModelToCodeConverter => {
	switch (config.format) {
		case 'mysql':
			return new EntityRelationshipModelToDatabaseCodeConverter(
					new MySqlDatabaseModelToCodeConverter({
						// idNamingStrategy: StandardIdNamingStrategies.ENTITY_NAME_PREFIX,
						// tableNameCaseFormat: StandardCaseFormats.UPPER_UNDERSCORE,
						// columnNameCaseFormat: StandardCaseFormats.LOWER_UNDERSCORE,
					})
			);
		case 'java':
			return new EntityRelationshipModelToClassCodeConverter(
					new JavaClassModelToCodeConverter({
						generatedClassesPackage: 'com.example.erdiagram',
						useSpringNullabilityAnnotations: true,
						typesMap: {
							// [EntityPropertyType.INT]: createJavaType('int')
						}
					})
			);
		default:
			throw new Error(`Unknown format: ${config.format}`);
	}
})();

type OutputCallback = (text: string) => void;

const outputCallback = ((): OutputCallback => {

	const {outputFile} = config;

	if (outputFile) {
		return text => fs.writeFileSync(outputFile, text + '\n');
	} else {
		return text => console.log(text);
	}

})();

const inputCode = fs.readFileSync(config.inputFile).toString();

const model = entityRelationshipModelParser.parseModel(inputCode);
const outputCode = modelCodeGenerator.generateCode(model);

outputCallback(outputCode);
