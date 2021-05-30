import {
	MysqlDialect, OracleDialect, PostgresqlDialect,
	SqlDialect,
	SqliteDialect,
	SqlServerDialect,
} from '@nestorrente/erdiagram';
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
				return new MysqlDialect(this.config.output.sql.mysql);
			case 'oracle':
				return new OracleDialect(this.config.output.sql.oracle);
			case 'postgresql':
				return new PostgresqlDialect(this.config.output.sql.postgresql);
			case 'sqlite':
				return new SqliteDialect(this.config.output.sql.sqlite);
			case 'sqlserver':
				return new SqlServerDialect(this.config.output.sql.sqlserver);
			default:
				throw new Error(`Unknown SQL format: ${outputFormat}`);
		}
	}

}
