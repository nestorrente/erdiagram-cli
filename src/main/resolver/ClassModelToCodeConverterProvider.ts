import yargs from 'yargs';
import fs from 'fs';
import {
	ClassModelGenerator, ClassModelToCodeConverter,
	DatabaseModelGenerator,
	DatabaseModelToSqlCodeConverter,
	EntityRelationshipModelParser,
	EntityRelationshipModelToClassCodeConverter,
	EntityRelationshipModelToCodeConverter,
	EntityRelationshipModelToDatabaseCodeConverter,
	JavaClassModelToCodeConverter,
	MysqlDialect, NomnomlEntityRelationshipModelToDiagramCodeConverter,
	OracleDialect, PlantUmlEntityRelationshipModelToDiagramCodeConverter,
	PostgresqlDialect,
	SqlDialect,
	SqliteDialect,
	SqlServerDialect, TypeScriptClassModelToCodeConverter,
} from '@nestorrente/erdiagram';
import erdiagramCliConfigManager from '@/config/ERDiagramCliConfigManager';
import {ClassOutputFormat, SqlOutputFormat} from '@/output-formats';
import ERDiagramCliConfig from '@/config/ERDiagramCliConfig';

export default class ClassModelToCodeConverterProvider {

	constructor(
			private readonly config: ERDiagramCliConfig
	) {

	}

	public getClassModelToCodeConverter(outputFormat: ClassOutputFormat): ClassModelToCodeConverter {
		switch (outputFormat) {
			case 'java':
				return new JavaClassModelToCodeConverter(this.config.output.java);
			case 'typescript':
				return new TypeScriptClassModelToCodeConverter(this.config.output.typescript);
			default:
				throw new Error(`Unknown class format: ${outputFormat}`);
		}
	}

}
