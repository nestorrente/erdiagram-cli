import {
	AbstractConfigManager,
	beanValidationConfigManager,
	classModelConfigManager,
	ConfigManager,
	databaseModelConfigManager,
	entityRelationshipModelParserConfigManager,
	javaClassModelConfigManager,
	jpaConfigManager,
	mysqlDialectConfigManager,
	nomnomlConfigManager,
	oracleDialectConfigManager,
	postgresqlDialectConfigManager,
	sqliteDialectConfigManager,
	sqlServerDialectConfigManager,
	typescriptConfigManager
} from '@nestorrente/erdiagram';
import ERDiagramCliConfig, {Enablable} from '@/config/ERDiagramCliConfig';
import PartialERDiagramCliConfig from '@/config/PartialERDiagramCliConfig';
import {JsonAdapter, JsonAdapters, JsonObject} from 'true-json';

export class ERDiagramCliConfigManager
		extends AbstractConfigManager<ERDiagramCliConfig, PartialERDiagramCliConfig> {

	getDefaultConfig(): ERDiagramCliConfig {
		return {
			parser: entityRelationshipModelParserConfigManager.getDefaultConfig(),
			databaseModel: databaseModelConfigManager.getDefaultConfig(),
			classModel: classModelConfigManager.getDefaultConfig(),
			output: {
				sql: {
					mysql: mysqlDialectConfigManager.getDefaultConfig(),
					oracle: oracleDialectConfigManager.getDefaultConfig(),
					postgresql: postgresqlDialectConfigManager.getDefaultConfig(),
					sqlite: sqliteDialectConfigManager.getDefaultConfig(),
					sqlserver: sqlServerDialectConfigManager.getDefaultConfig()
				},
				java: {
					code: javaClassModelConfigManager.getDefaultConfig(),
					transformers: {
						validation: {
							enabled: false,
							...beanValidationConfigManager.getDefaultConfig()
						},
						jpa: {
							enabled: false,
							...jpaConfigManager.getDefaultConfig()
						}
					}
				},
				typescript: typescriptConfigManager.getDefaultConfig(),
				nomnoml: nomnomlConfigManager.getDefaultConfig(),
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
				sql: {
					mysql: mysqlDialectConfigManager.mergeConfigs(
							fullConfig.output.sql.mysql,
							partialConfig?.output?.sql?.mysql
					),
					oracle: oracleDialectConfigManager.mergeConfigs(
							fullConfig.output.sql.oracle,
							partialConfig?.output?.sql?.oracle
					),
					postgresql: postgresqlDialectConfigManager.mergeConfigs(
							fullConfig.output.sql.postgresql,
							partialConfig?.output?.sql?.postgresql
					),
					sqlite: sqliteDialectConfigManager.mergeConfigs(
							fullConfig.output.sql.sqlite,
							partialConfig?.output?.sql?.sqlite
					),
					sqlserver: sqlServerDialectConfigManager.mergeConfigs(
							fullConfig.output.sql.sqlserver,
							partialConfig?.output?.sql?.sqlserver
					)
				},
				java: {
					code: javaClassModelConfigManager.mergeConfigs(
							fullConfig.output.java.code,
							partialConfig?.output?.java?.code
					),
					transformers: {
						validation: {
							enabled: partialConfig?.output?.java?.transformers?.validation?.enabled ?? fullConfig.output.java.transformers.validation.enabled,
							...beanValidationConfigManager.mergeConfigs(
									fullConfig.output.java.transformers.validation,
									partialConfig?.output?.java?.transformers?.validation
							)
						},
						jpa: {
							enabled: partialConfig?.output?.java?.transformers?.jpa?.enabled ?? fullConfig.output.java.transformers.jpa.enabled,
							...jpaConfigManager.mergeConfigs(
									fullConfig.output.java.transformers.jpa,
									partialConfig?.output?.java?.transformers?.jpa
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
			}
		};
	}

	protected getJsonAdapter(): JsonAdapter<ERDiagramCliConfig> {
		return JsonAdapters.object<ERDiagramCliConfig>({
			parser: useConfigManagerAsJsonAdapter(entityRelationshipModelParserConfigManager),
			classModel: useConfigManagerAsJsonAdapter(classModelConfigManager),
			databaseModel: useConfigManagerAsJsonAdapter(databaseModelConfigManager),
			output: JsonAdapters.object<ERDiagramCliConfig['output']>({
				sql: JsonAdapters.object<ERDiagramCliConfig['output']['sql']>({
					mysql: useConfigManagerAsJsonAdapter(mysqlDialectConfigManager),
					oracle: useConfigManagerAsJsonAdapter(oracleDialectConfigManager),
					postgresql: useConfigManagerAsJsonAdapter(postgresqlDialectConfigManager),
					sqlite: useConfigManagerAsJsonAdapter(sqliteDialectConfigManager),
					sqlserver: useConfigManagerAsJsonAdapter(sqlServerDialectConfigManager)
				}),
				java: JsonAdapters.object<ERDiagramCliConfig['output']['java']>({
					code: useConfigManagerAsJsonAdapter(javaClassModelConfigManager),
					transformers: JsonAdapters.object<ERDiagramCliConfig['output']['java']['transformers']>({
						validation: useConfigManagerAsJsonAdapterForEnablable(beanValidationConfigManager),
						jpa: useConfigManagerAsJsonAdapterForEnablable(jpaConfigManager)
					})
				}),
				typescript: useConfigManagerAsJsonAdapter(typescriptConfigManager),
				nomnoml: useConfigManagerAsJsonAdapter(nomnomlConfigManager)
			})
		});
	}

}

function useConfigManagerAsJsonAdapter<T>(configManager: ConfigManager<T, any>): JsonAdapter<T> {
	return JsonAdapters.custom({
		adaptToJson(value) {
			return configManager.convertToSerializableObject(value);
		},
		recoverFromJson(value) {
			return configManager.convertFromSerializableObject(value);
		}
	});
}

function useConfigManagerAsJsonAdapterForEnablable<T>(configManager: ConfigManager<T, any>): JsonAdapter<Enablable<T>, JsonObject> {
	return JsonAdapters.custom({
		adaptToJson(value) {
			return {
				enabled: value.enabled,
				...configManager.convertToSerializableObject(value) as JsonObject
			};
		},
		recoverFromJson(value) {
			return {
				enabled: value.enabled as boolean,
				...configManager.convertFromSerializableObject(value)
			};
		}
	});
}

const erdiagramCliConfigManager = new ERDiagramCliConfigManager();
export default erdiagramCliConfigManager;
