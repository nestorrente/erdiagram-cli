import {
	ClassModelGeneratorConfig, DatabaseModelGeneratorConfig,
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

type PartialERDiagramCliConfig = Partial<{
	parser: Partial<EntityRelationshipModelParserConfig>;
	classModel: Partial<ClassModelGeneratorConfig>;
	databaseModel: Partial<DatabaseModelGeneratorConfig>;
	output: {
		mysql: Partial<MysqlDialectConfig>;
		oracle: Partial<OracleDialectConfig>;
		postgresql: Partial<PostgresqlDialectConfig>;
		sqlite: Partial<SqliteDialectConfig>;
		sqlserver: Partial<SqlServerDialectConfig>;
		java: Partial<JavaClassModelToCodeConverterConfig>;
		typescript: Partial<TypeScriptClassModelToCodeConverterConfig>;
		nomnoml: Partial<NomnomlEntityRelationshipModelToDiagramCodeConverterConfig>;
	}
}>;

export default PartialERDiagramCliConfig;
