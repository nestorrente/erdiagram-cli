import yargs from 'yargs';
import fs from 'fs';
import {
	ClassModelGenerator,
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
import ClassModelToCodeConverterProvider from '@/resolver/ClassModelToCodeConverterProvider';

export default class EntityRelationshipModelToClassCodeConverterProvider {

	constructor(
			private readonly config: ERDiagramCliConfig
	) {

	}

	public getERModelToClassCodeConverter(outputFormat: ClassOutputFormat): EntityRelationshipModelToClassCodeConverter {

		const classModelToCodeConverterProvider = new ClassModelToCodeConverterProvider(this.config);

		const classModelToCodeConverter = classModelToCodeConverterProvider.getClassModelToCodeConverter(outputFormat);

		return new EntityRelationshipModelToClassCodeConverter(
				new ClassModelGenerator(this.config.classModel),
				classModelToCodeConverter
		);

	}

}
