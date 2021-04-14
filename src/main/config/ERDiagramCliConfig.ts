import {
	ClassModelGeneratorConfig,
	DatabaseModelGeneratorConfig,
	EntityRelationshipModelParserConfig,
	JavaClassModelToCodeConverterConfig,
	MysqlDialectConfig,
	NomnomlEntityRelationshipModelToDiagramCodeConverterConfig,
	OracleDialectConfig,
	PostgresqlDialectConfig,
	SqliteDialectConfig,
	SqlServerDialectConfig,
	TypeScriptClassModelToCodeConverterConfig
} from '@nestorrente/erdiagram';

export default interface ERDiagramCliConfig {
	parser: EntityRelationshipModelParserConfig;
	classModel: ClassModelGeneratorConfig;
	databaseModel: DatabaseModelGeneratorConfig;
	output: {
		mysql: MysqlDialectConfig;
		oracle: OracleDialectConfig;
		postgresql: PostgresqlDialectConfig;
		sqlite: SqliteDialectConfig;
		sqlserver: SqlServerDialectConfig;
		java: JavaClassModelToCodeConverterConfig;
		typescript: TypeScriptClassModelToCodeConverterConfig;
		nomnoml: NomnomlEntityRelationshipModelToDiagramCodeConverterConfig;
	}
}
