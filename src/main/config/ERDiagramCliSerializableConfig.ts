import {
	ClassModelGeneratorSerializableConfig,
	DatabaseModelGeneratorSerializableConfig,
	EntityRelationshipModelParserSerializableConfig,
	JavaClassModelToCodeConverterSerializableConfig,
	MysqlDialectSerializableConfig,
	NomnomlEntityRelationshipModelToDiagramCodeConverterSerializableConfig,
	OracleDialectSerializableConfig,
	PostgresqlDialectSerializableConfig,
	SqliteDialectSerializableConfig,
	SqlServerDialectSerializableConfig,
	TypeScriptClassModelToCodeConverterSerializableConfig
} from '@nestorrente/erdiagram';

export default interface ERDiagramCliSerializableConfig {
	parser: EntityRelationshipModelParserSerializableConfig;
	classModel: ClassModelGeneratorSerializableConfig;
	databaseModel: DatabaseModelGeneratorSerializableConfig;
	output: {
		mysql: MysqlDialectSerializableConfig;
		oracle: OracleDialectSerializableConfig;
		postgresql: PostgresqlDialectSerializableConfig;
		sqlite: SqliteDialectSerializableConfig;
		sqlserver: SqlServerDialectSerializableConfig;
		java: JavaClassModelToCodeConverterSerializableConfig;
		typescript: TypeScriptClassModelToCodeConverterSerializableConfig;
		nomnoml: NomnomlEntityRelationshipModelToDiagramCodeConverterSerializableConfig;
	}
};
