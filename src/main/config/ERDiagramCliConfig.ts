import {
	BeanValidationConfig,
	ClassModelConfig,
	DatabaseModelConfig,
	EntityRelationshipModelParserConfig,
	JavaClassModelConfig, JpaConfig,
	MysqlDialectConfig,
	NomnomlConfig,
	OracleDialectConfig,
	PlantUmlConfig,
	PostgresqlDialectConfig,
	SqliteDialectConfig,
	SqlServerDialectConfig,
	TypeScriptConfig
} from '@nestorrente/erdiagram';

export default interface ERDiagramCliConfig {
	parser: EntityRelationshipModelParserConfig;
	classModel: ClassModelConfig;
	databaseModel: DatabaseModelConfig;
	output: {
		mysql: MysqlDialectConfig;
		oracle: OracleDialectConfig;
		postgresql: PostgresqlDialectConfig;
		sqlite: SqliteDialectConfig;
		sqlserver: SqlServerDialectConfig;
		java: {
			classModel: JavaClassModelConfig,
			transformers: {
				validation: {
					enabled: boolean;
					config: BeanValidationConfig;
				};
				jpa: {
					enabled: boolean;
					config: JpaConfig;
				};
			};
		};
		typescript: TypeScriptConfig;
		nomnoml: NomnomlConfig;
		plantuml: PlantUmlConfig;
	}
}
