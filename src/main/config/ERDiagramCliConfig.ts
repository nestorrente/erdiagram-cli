import {
	BeanValidationConfig,
	ClassModelConfig,
	DatabaseModelConfig,
	EntityRelationshipModelParserConfig,
	JavaClassModelConfig,
	JpaConfig,
	MysqlDialectConfig,
	NomnomlConfig,
	OracleDialectConfig,
	PostgresqlDialectConfig,
	SqliteDialectConfig,
	SqlServerDialectConfig,
	TypeScriptConfig
} from '@nestorrente/erdiagram';

export type Enablable<T> = T & { enabled: boolean };

export default interface ERDiagramCliConfig {
	parser: EntityRelationshipModelParserConfig;
	classModel: ClassModelConfig;
	databaseModel: DatabaseModelConfig;
	output: {
		sql: {
			mysql: MysqlDialectConfig;
			oracle: OracleDialectConfig;
			postgresql: PostgresqlDialectConfig;
			sqlite: SqliteDialectConfig;
			sqlserver: SqlServerDialectConfig;
		};
		java: {
			code: JavaClassModelConfig;
			transformers: {
				validation: Enablable<BeanValidationConfig>;
				jpa: Enablable<JpaConfig>;
			};
		};
		typescript: TypeScriptConfig;
		nomnoml: NomnomlConfig;
	};
}
