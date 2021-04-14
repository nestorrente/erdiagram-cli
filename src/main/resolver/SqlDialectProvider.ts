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
import {SqlOutputFormat} from '@/output-formats';
import ERDiagramCliConfig from '@/config/ERDiagramCliConfig';

export default class SqlDialectProvider {

	constructor(
			private readonly config: ERDiagramCliConfig
	) {

	}

	public getSqlDialect(outputFormat: SqlOutputFormat): SqlDialect {
		switch (outputFormat) {
			case 'mysql':
				return new MysqlDialect(this.config.output.mysql);
			case 'oracle':
				return new OracleDialect(this.config.output.oracle);
			case 'postgresql':
				return new PostgresqlDialect(this.config.output.postgresql);
			case 'sqlite':
				return new SqliteDialect(this.config.output.sqlite);
			case 'sqlserver':
				return new SqlServerDialect(this.config.output.sqlserver);
			default:
				throw new Error(`Unknown SQL format: ${outputFormat}`);
		}
	}

}
