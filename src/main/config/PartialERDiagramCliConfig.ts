import {
	PartialBeanValidationConfig,
	PartialClassModelConfig,
	PartialDatabaseModelConfig,
	PartialEntityRelationshipModelParserConfig,
	PartialJavaClassModelConfig, PartialJpaConfig,
	PartialMysqlDialectConfig,
	PartialNomnomlConfig,
	PartialOracleDialectConfig,
	PartialPlantUmlConfig,
	PartialPostgresqlDialectConfig,
	PartialSqliteDialectConfig,
	PartialSqlServerDialectConfig,
	PartialTypeScriptConfig
} from '@nestorrente/erdiagram';

type PartialERDiagramCliConfig = {
	parser?: PartialEntityRelationshipModelParserConfig;
	classModel?: PartialClassModelConfig;
	databaseModel?: PartialDatabaseModelConfig;
	output?: {
		mysql?: PartialMysqlDialectConfig;
		oracle?: PartialOracleDialectConfig;
		postgresql?: PartialPostgresqlDialectConfig;
		sqlite?: PartialSqliteDialectConfig;
		sqlserver?: PartialSqlServerDialectConfig;
		java?: {
			classModel?: PartialJavaClassModelConfig,
			transformers?: {
				validation?: {
					enabled?: boolean;
					config?: PartialBeanValidationConfig;
				};
				jpa?: {
					enabled?: boolean;
					config?: PartialJpaConfig;
				};
			};
		};
		typescript?: PartialTypeScriptConfig;
		nomnoml?: PartialNomnomlConfig;
		plantuml?: PartialPlantUmlConfig;
	};
};

export default PartialERDiagramCliConfig;
