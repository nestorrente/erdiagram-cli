import {
	NomnomlConfig,
	PartialBeanValidationConfig,
	PartialClassModelConfig,
	PartialDatabaseModelConfig,
	PartialEntityRelationshipModelParserConfig,
	PartialJavaClassModelConfig,
	PartialJpaConfig,
	PartialMysqlDialectConfig,
	PartialOracleDialectConfig,
	PartialPostgresqlDialectConfig,
	PartialSqliteDialectConfig,
	PartialSqlServerDialectConfig,
	PartialTypeScriptConfig
} from '@nestorrente/erdiagram';
import {Enablable} from '@/config/ERDiagramCliConfig';

export type PartialEnablable<T> = Partial<Enablable<T>>;

type PartialERDiagramCliConfig = Partial<{
	parser: PartialEntityRelationshipModelParserConfig;
	classModel: PartialClassModelConfig;
	databaseModel: PartialDatabaseModelConfig;
	output: Partial<{
		sql: Partial<{
			mysql: PartialMysqlDialectConfig;
			oracle: PartialOracleDialectConfig;
			postgresql: PartialPostgresqlDialectConfig;
			sqlite: PartialSqliteDialectConfig;
			sqlserver: PartialSqlServerDialectConfig;
		}>;
		java: Partial<{
			code: PartialJavaClassModelConfig;
			transformers: Partial<{
				validation: PartialEnablable<PartialBeanValidationConfig>;
				jpa: PartialEnablable<PartialJpaConfig>;
			}>;
		}>;
		typescript: PartialTypeScriptConfig;
		nomnoml: NomnomlConfig;
	}>;
}>;

export default PartialERDiagramCliConfig;
