import {
	NomnomlSourceCodeGeneratorConfig,
	PartialClassModelGeneratorConfig,
	PartialDatabaseModelGeneratorConfig,
	PartialEntityRelationshipModelParserConfig,
	PartialJavaClassModelGeneratorConfig,
	PartialBeanValidationTransformerConfig,
	PartialJpaTransformerConfig,
	PartialMysqlDialectConfig,
	PartialOracleDialectConfig,
	PartialPostgresqlDialectConfig,
	PartialSqliteDialectConfig,
	PartialSqlServerDialectConfig,
	PartialTypeScriptClassModelToCodeConverterConfig
} from '@nestorrente/erdiagram';
import {Enablable} from '@/config/ERDiagramCliConfig';

export type PartialEnablable<T> = Partial<Enablable<T>>;

type PartialERDiagramCliConfig = Partial<{
	parser: PartialEntityRelationshipModelParserConfig;
	classModel: PartialClassModelGeneratorConfig;
	databaseModel: PartialDatabaseModelGeneratorConfig;
	output: Partial<{
		sql: Partial<{
			mysql: PartialMysqlDialectConfig;
			oracle: PartialOracleDialectConfig;
			postgresql: PartialPostgresqlDialectConfig;
			sqlite: PartialSqliteDialectConfig;
			sqlserver: PartialSqlServerDialectConfig;
		}>;
		java: Partial<{
			code: PartialJavaClassModelGeneratorConfig;
			transformers: Partial<{
				validation: PartialEnablable<PartialBeanValidationTransformerConfig>;
				jpa: PartialEnablable<PartialJpaTransformerConfig>;
			}>;
		}>;
		typescript: PartialTypeScriptClassModelToCodeConverterConfig;
		nomnoml: NomnomlSourceCodeGeneratorConfig;
	}>;
}>;

export default PartialERDiagramCliConfig;
