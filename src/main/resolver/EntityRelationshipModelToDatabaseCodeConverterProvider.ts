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
import SqlDialectProvider from '@/resolver/SqlDialectProvider';

export default class EntityRelationshipModelToDatabaseCodeConverterProvider {

	constructor(
			private readonly config: ERDiagramCliConfig
	) {

	}

	public getERModelToDatabaseCodeConverter(outputFormat: SqlOutputFormat): EntityRelationshipModelToDatabaseCodeConverter {

		const databaseModelGenerator = new DatabaseModelGenerator(this.config.databaseModel);

		const sqlDialectProvider = new SqlDialectProvider(this.config);
		const sqlDialect = sqlDialectProvider.getSqlDialect(outputFormat);

		const databaseModelToCodeConverter = new DatabaseModelToSqlCodeConverter(sqlDialect);

		return new EntityRelationshipModelToDatabaseCodeConverter(
				databaseModelGenerator,
				databaseModelToCodeConverter
		);

	}

}
