import yargs from 'yargs';
import fs from 'fs';
import {
	ClassModelGenerator,
	DatabaseModelGenerator,
	EntityRelationshipModelParser,
	EntityRelationshipModelToClassCodeConverter,
	EntityRelationshipModelToCodeConverter,
	EntityRelationshipModelToDatabaseCodeConverter,
	JavaClassModelToCodeConverter,
	MySqlDatabaseModelToCodeConverter,
	OracleDatabaseModelToCodeConverter,
	SqlServerDatabaseModelToCodeConverter,
	TypeScriptClassModelToCodeConverter
} from '@nestorrente/erdiagram';

const args = yargs
		.option('format', {
			alias: 'f',
			type: 'string',
			description: 'Output format (mysql/sqlserver/java/typescript)'
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
					new DatabaseModelGenerator(),
					new MySqlDatabaseModelToCodeConverter()
			);
		case 'sqlserver':
			return new EntityRelationshipModelToDatabaseCodeConverter(
					new DatabaseModelGenerator(),
					new SqlServerDatabaseModelToCodeConverter()
			);
		case 'oracle':
			return new EntityRelationshipModelToDatabaseCodeConverter(
					new DatabaseModelGenerator(),
					new OracleDatabaseModelToCodeConverter()
			);
		case 'java':
			return new EntityRelationshipModelToClassCodeConverter(
					new ClassModelGenerator(),
					new JavaClassModelToCodeConverter({
						generatedClassesPackage: 'com.example.erdiagram',
						useSpringNullabilityAnnotations: true
					})
			);
		case 'typescript':
			return new EntityRelationshipModelToClassCodeConverter(
					new ClassModelGenerator(),
					new TypeScriptClassModelToCodeConverter()
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

const model = new EntityRelationshipModelParser({
	allowUnknownEntities: true
}).parseModel(inputCode);
const outputCode = modelCodeGenerator.generateCode(model);

outputCallback(outputCode);
