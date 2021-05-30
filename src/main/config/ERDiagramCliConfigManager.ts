import {
	AbstractComponentConfigManager,
	classModelGeneratorConfigManager,
	ComponentConfigManager,
	databaseModelGeneratorConfigManager,
	entityRelationshipModelParserConfigManager,
	javaClassModelGeneratorConfigManager,
	javaxValidationTransformerConfigManager,
	jpaTransformerConfigManager,
	mysqlDialectConfigManager,
	nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager,
	oracleDialectConfigManager,
	postgresqlDialectConfigManager,
	sqliteDialectConfigManager,
	sqlServerDialectConfigManager,
	typescriptClassModelToCodeConverterConfigManager
} from '@nestorrente/erdiagram';
import ERDiagramCliConfig, {Enablable} from '@/config/ERDiagramCliConfig';
import PartialERDiagramCliConfig from '@/config/PartialERDiagramCliConfig';
import {JsonAdapter, JsonAdapters, JsonObject} from 'true-json';

function useConfigManagerAsJsonAdapter<T>(configManager: ComponentConfigManager<T, any>): JsonAdapter<T> {
	return JsonAdapters.custom({
		adaptToJson(value) {
			return configManager.convertToSerializableObject(value);
		},
		recoverFromJson(value) {
			return configManager.convertFromSerializableObject(value);
		}
	});
}

function useConfigManagerAsJsonAdapterForEnablable<T>(configManager: ComponentConfigManager<T, any>): JsonAdapter<Enablable<T>, JsonObject> {
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

export class ERDiagramCliConfigManager
		extends AbstractComponentConfigManager<ERDiagramCliConfig, PartialERDiagramCliConfig> {

	getDefaultConfig(): ERDiagramCliConfig {
		return {
			parser: entityRelationshipModelParserConfigManager.getDefaultConfig(),
			databaseModel: databaseModelGeneratorConfigManager.getDefaultConfig(),
			classModel: classModelGeneratorConfigManager.getDefaultConfig(),
			output: {
				sql: {
					mysql: mysqlDialectConfigManager.getDefaultConfig(),
					oracle: oracleDialectConfigManager.getDefaultConfig(),
					postgresql: postgresqlDialectConfigManager.getDefaultConfig(),
					sqlite: sqliteDialectConfigManager.getDefaultConfig(),
					sqlserver: sqlServerDialectConfigManager.getDefaultConfig()
				},
				java: {
					model: javaClassModelGeneratorConfigManager.getDefaultConfig(),
					transformers: {
						validation: {
							enabled: false,
							...javaxValidationTransformerConfigManager.getDefaultConfig()
						},
						jpa: {
							enabled: false,
							...jpaTransformerConfigManager.getDefaultConfig()
						}
					}
				},
				typescript: typescriptClassModelToCodeConverterConfigManager.getDefaultConfig(),
				nomnoml: nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager.getDefaultConfig(),
			}
		};
	}

	mergeConfigs(fullConfig: ERDiagramCliConfig, partialConfig?: PartialERDiagramCliConfig): ERDiagramCliConfig {
		return {
			parser: entityRelationshipModelParserConfigManager.mergeConfigs(
					fullConfig.parser,
					partialConfig?.parser
			),
			databaseModel: databaseModelGeneratorConfigManager.mergeConfigs(
					fullConfig.databaseModel,
					partialConfig?.databaseModel
			),
			classModel: classModelGeneratorConfigManager.mergeConfigs(
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
					model: javaClassModelGeneratorConfigManager.mergeConfigs(
							fullConfig.output.java.model,
							partialConfig?.output?.java?.model
					),
					transformers: {
						validation: {
							enabled: partialConfig?.output?.java?.transformers?.validation?.enabled ?? fullConfig.output.java.transformers.validation.enabled,
							...javaxValidationTransformerConfigManager.mergeConfigs(
									fullConfig.output.java.transformers.validation,
									partialConfig?.output?.java?.transformers?.validation
							)
						},
						jpa: {
							enabled: partialConfig?.output?.java?.transformers?.jpa?.enabled ?? fullConfig.output.java.transformers.jpa.enabled,
							...jpaTransformerConfigManager.mergeConfigs(
									fullConfig.output.java.transformers.jpa,
									partialConfig?.output?.java?.transformers?.jpa
							)
						}
					}
				},
				typescript: typescriptClassModelToCodeConverterConfigManager.mergeConfigs(
						fullConfig.output.typescript,
						partialConfig?.output?.typescript
				),
				nomnoml: nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager.mergeConfigs(
						fullConfig.output.nomnoml,
						partialConfig?.output?.nomnoml
				),
			}
		};
	}

	protected getJsonAdapter(): JsonAdapter<ERDiagramCliConfig> {
		return JsonAdapters.object<ERDiagramCliConfig>({
			parser: useConfigManagerAsJsonAdapter(entityRelationshipModelParserConfigManager),
			classModel: useConfigManagerAsJsonAdapter(classModelGeneratorConfigManager),
			databaseModel: useConfigManagerAsJsonAdapter(databaseModelGeneratorConfigManager),
			output: JsonAdapters.object<ERDiagramCliConfig['output']>({
				sql: JsonAdapters.object<ERDiagramCliConfig['output']['sql']>({
					mysql: useConfigManagerAsJsonAdapter(mysqlDialectConfigManager),
					oracle: useConfigManagerAsJsonAdapter(oracleDialectConfigManager),
					postgresql: useConfigManagerAsJsonAdapter(postgresqlDialectConfigManager),
					sqlite: useConfigManagerAsJsonAdapter(sqliteDialectConfigManager),
					sqlserver: useConfigManagerAsJsonAdapter(sqlServerDialectConfigManager)
				}),
				java: JsonAdapters.object<ERDiagramCliConfig['output']['java']>({
					model: useConfigManagerAsJsonAdapter(javaClassModelGeneratorConfigManager),
					transformers: JsonAdapters.object<ERDiagramCliConfig['output']['java']['transformers']>({
						validation: useConfigManagerAsJsonAdapterForEnablable(javaxValidationTransformerConfigManager),
						jpa: useConfigManagerAsJsonAdapterForEnablable(jpaTransformerConfigManager)
					})
				}),
				typescript: useConfigManagerAsJsonAdapter(typescriptClassModelToCodeConverterConfigManager),
				nomnoml: useConfigManagerAsJsonAdapter(nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager)
			})
		});
	}

}

const erdiagramCliConfigManager = new ERDiagramCliConfigManager();
export default erdiagramCliConfigManager;
