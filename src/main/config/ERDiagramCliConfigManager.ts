import {
	AbstractConfigManager, beanValidationConfigManager,
	classModelConfigManager,
	ConfigManager,
	databaseModelConfigManager,
	entityRelationshipModelParserConfigManager,
	javaClassModelConfigManager, jpaConfigManager,
	mysqlDialectConfigManager,
	nomnomlConfigManager,
	oracleDialectConfigManager, plantUmlConfigManager,
	postgresqlDialectConfigManager,
	sqliteDialectConfigManager,
	sqlServerDialectConfigManager,
	typescriptConfigManager
} from '@nestorrente/erdiagram';
import {
	JsonAdapter,
	JsonAdapters,
	JsonObject
} from 'true-json';
import ERDiagramCliConfig from '@/config/ERDiagramCliConfig';
import PartialERDiagramCliConfig from '@/config/PartialERDiagramCliConfig';

export class ERDiagramCliConfigManager
		extends AbstractConfigManager<ERDiagramCliConfig, PartialERDiagramCliConfig> {

	getDefaultConfig(): ERDiagramCliConfig {
		return {
			parser: entityRelationshipModelParserConfigManager.getDefaultConfig(),
			databaseModel: databaseModelConfigManager.getDefaultConfig(),
			classModel: classModelConfigManager.getDefaultConfig(),
			output: {
				mysql: mysqlDialectConfigManager.getDefaultConfig(),
				oracle: oracleDialectConfigManager.getDefaultConfig(),
				postgresql: postgresqlDialectConfigManager.getDefaultConfig(),
				sqlite: sqliteDialectConfigManager.getDefaultConfig(),
				sqlserver: sqlServerDialectConfigManager.getDefaultConfig(),
				java: {
					classModel: javaClassModelConfigManager.getDefaultConfig(),
					transformers: {
						validation: {
							enabled: true,
							config: beanValidationConfigManager.getDefaultConfig()
						},
						jpa: {
							enabled: true,
							config: jpaConfigManager.getDefaultConfig()
						}
					}
				},
				typescript: typescriptConfigManager.getDefaultConfig(),
				nomnoml: nomnomlConfigManager.getDefaultConfig(),
				plantuml: plantUmlConfigManager.getDefaultConfig(),
			}
		};
	}

	mergeConfigs(fullConfig: ERDiagramCliConfig, partialConfig?: PartialERDiagramCliConfig): ERDiagramCliConfig {
		return {
			parser: entityRelationshipModelParserConfigManager.mergeConfigs(
					fullConfig.parser,
					partialConfig?.parser
			),
			databaseModel: databaseModelConfigManager.mergeConfigs(
					fullConfig.databaseModel,
					partialConfig?.databaseModel
			),
			classModel: classModelConfigManager.mergeConfigs(
					fullConfig.classModel,
					partialConfig?.classModel
			),
			output: {
				mysql: mysqlDialectConfigManager.mergeConfigs(
						fullConfig.output.mysql,
						partialConfig?.output?.mysql
				),
				oracle: oracleDialectConfigManager.mergeConfigs(
						fullConfig.output.oracle,
						partialConfig?.output?.oracle
				),
				postgresql: postgresqlDialectConfigManager.mergeConfigs(
						fullConfig.output.postgresql,
						partialConfig?.output?.postgresql
				),
				sqlite: sqliteDialectConfigManager.mergeConfigs(
						fullConfig.output.sqlite,
						partialConfig?.output?.sqlite
				),
				sqlserver: sqlServerDialectConfigManager.mergeConfigs(
						fullConfig.output.sqlserver,
						partialConfig?.output?.sqlserver
				),
				java: {
					classModel: javaClassModelConfigManager.mergeConfigs(
						fullConfig.output.java.classModel,
						partialConfig?.output?.java?.classModel
					),
					transformers: {
						validation: {
							enabled: partialConfig?.output?.java?.transformers?.validation?.enabled ?? fullConfig.output.java.transformers.validation.enabled,
							config: beanValidationConfigManager.mergeConfigs(
								fullConfig.output.java.transformers.validation.config,
								partialConfig?.output?.java?.transformers?.validation?.config
							)
						},
						jpa: {
							enabled: partialConfig?.output?.java?.transformers?.jpa?.enabled ?? fullConfig.output.java.transformers.jpa.enabled,
							config: jpaConfigManager.mergeConfigs(
								fullConfig.output.java.transformers.jpa.config,
								partialConfig?.output?.java?.transformers?.jpa?.config
							)
						}
					}
				},
				typescript: typescriptConfigManager.mergeConfigs(
						fullConfig.output.typescript,
						partialConfig?.output?.typescript
				),
				nomnoml: nomnomlConfigManager.mergeConfigs(
						fullConfig.output.nomnoml,
						partialConfig?.output?.nomnoml
				),
				plantuml: plantUmlConfigManager.mergeConfigs(
						fullConfig.output.plantuml,
						partialConfig?.output?.plantuml
				),
			}
		};
	}

	convertToSerializableObject(fullConfig: ERDiagramCliConfig): JsonObject {
		return super.convertToSerializableObject(fullConfig) as JsonObject;
	}

	protected getJsonAdapter(): JsonAdapter<ERDiagramCliConfig> {
		return JsonAdapters.object({
			parser: adaptConfigManagerToJsonAdapter(entityRelationshipModelParserConfigManager),
			databaseModel: adaptConfigManagerToJsonAdapter(databaseModelConfigManager),
			classModel: adaptConfigManagerToJsonAdapter(classModelConfigManager),
			output: JsonAdapters.object({
				mysql: adaptConfigManagerToJsonAdapter(mysqlDialectConfigManager),
				oracle: adaptConfigManagerToJsonAdapter(oracleDialectConfigManager),
				postgresql: adaptConfigManagerToJsonAdapter(postgresqlDialectConfigManager),
				sqlite: adaptConfigManagerToJsonAdapter(sqliteDialectConfigManager),
				sqlserver: adaptConfigManagerToJsonAdapter(sqlServerDialectConfigManager),
				java: JsonAdapters.object({
					classModel: adaptConfigManagerToJsonAdapter(javaClassModelConfigManager),
					transformers: JsonAdapters.object({
						validation: JsonAdapters.object({
							enabled: JsonAdapters.identity<boolean>(),
							config: adaptConfigManagerToJsonAdapter(beanValidationConfigManager)
						}),
						jpa: JsonAdapters.object({
							enabled: JsonAdapters.identity<boolean>(),
							config: adaptConfigManagerToJsonAdapter(jpaConfigManager)
						}),
					})
				}),
				typescript: adaptConfigManagerToJsonAdapter(typescriptConfigManager),
				nomnoml: adaptConfigManagerToJsonAdapter(nomnomlConfigManager),
				plantuml: adaptConfigManagerToJsonAdapter(plantUmlConfigManager)
			})
		});
	}

}

function adaptConfigManagerToJsonAdapter<T>(configManager: ConfigManager<T, any>): JsonAdapter<T> {
	return JsonAdapters.custom({
		adaptToJson(value) {
			return configManager.convertToSerializableObject(value);
		},
		recoverFromJson(value) {
			return configManager.convertFromSerializableObject(value);
		}
	});
}

const erdiagramCliConfigManager = new ERDiagramCliConfigManager();
export default erdiagramCliConfigManager;
