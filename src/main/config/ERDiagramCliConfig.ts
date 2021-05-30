import {
	ClassModelGeneratorConfig,
	DatabaseModelGeneratorConfig,
	EntityRelationshipModelParserConfig,
	JavaClassModelGeneratorConfig,
	JavaxValidationTransformerConfig,
	JpaTransformerConfig,
	MysqlDialectConfig,
	NomnomlEntityRelationshipModelSourceCodeGeneratorConfig,
	OracleDialectConfig,
	PostgresqlDialectConfig,
	SqliteDialectConfig,
	SqlServerDialectConfig,
	TypeScriptClassModelToCodeConverterConfig
} from '@nestorrente/erdiagram';

export type Enablable<T> = T & { enabled: boolean };

export default interface ERDiagramCliConfig {
	parser: EntityRelationshipModelParserConfig;
	classModel: ClassModelGeneratorConfig;
	databaseModel: DatabaseModelGeneratorConfig;
	output: {
		sql: {
			mysql: MysqlDialectConfig;
			oracle: OracleDialectConfig;
			postgresql: PostgresqlDialectConfig;
			sqlite: SqliteDialectConfig;
			sqlserver: SqlServerDialectConfig;
		};
		java: {
			code: JavaClassModelGeneratorConfig;
			transformers: {
				validation: Enablable<JavaxValidationTransformerConfig>;
				jpa: Enablable<JpaTransformerConfig>;
			};
		};
		typescript: TypeScriptClassModelToCodeConverterConfig;
		nomnoml: NomnomlEntityRelationshipModelSourceCodeGeneratorConfig;
	};
}
