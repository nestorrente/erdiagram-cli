import {
	AbstractComponentConfigManager,
	classModelGeneratorConfigManager, ComponentConfigManager,
	databaseModelGeneratorConfigManager,
	entityRelationshipModelParserConfigManager,
	javaClassModelToCodeConverterConfigManager,
	mysqlDialectConfigManager,
	nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager,
	oracleDialectConfigManager,
	postgresqlDialectConfigManager,
	sqliteDialectConfigManager,
	sqlServerDialectConfigManager,
	typescriptClassModelToCodeConverterConfigManager
} from '@nestorrente/erdiagram';
import ERDiagramCliConfig from '@/config/ERDiagramCliConfig';
import ERDiagramCliSerializableConfig from '@/config/ERDiagramCliSerializableConfig';
import PartialERDiagramCliConfig from '@/config/PartialERDiagramCliConfig';

export class ERDiagramCliConfigManager
		extends AbstractComponentConfigManager<ERDiagramCliConfig, PartialERDiagramCliConfig, ERDiagramCliSerializableConfig> {

	getDefaultConfig(): ERDiagramCliConfig {
		return {
			parser: entityRelationshipModelParserConfigManager.getDefaultConfig(),
			databaseModel: databaseModelGeneratorConfigManager.getDefaultConfig(),
			classModel: classModelGeneratorConfigManager.getDefaultConfig(),
			output: {
				mysql: mysqlDialectConfigManager.getDefaultConfig(),
				oracle: oracleDialectConfigManager.getDefaultConfig(),
				postgresql: postgresqlDialectConfigManager.getDefaultConfig(),
				sqlite: sqliteDialectConfigManager.getDefaultConfig(),
				sqlserver: sqlServerDialectConfigManager.getDefaultConfig(),
				java: javaClassModelToCodeConverterConfigManager.getDefaultConfig(),
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
				java: javaClassModelToCodeConverterConfigManager.mergeConfigs(
						fullConfig.output.java,
						partialConfig?.output?.java
				),
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

	convertToSerializableObject(fullConfig: ERDiagramCliConfig): ERDiagramCliSerializableConfig {
		return {
			parser: entityRelationshipModelParserConfigManager.convertToSerializableObject(fullConfig.parser),
			databaseModel: databaseModelGeneratorConfigManager.convertToSerializableObject(fullConfig.databaseModel),
			classModel: classModelGeneratorConfigManager.convertToSerializableObject(fullConfig.classModel),
			output: {
				mysql: mysqlDialectConfigManager.convertToSerializableObject(fullConfig.output.mysql),
				oracle: oracleDialectConfigManager.convertToSerializableObject(fullConfig.output.oracle),
				postgresql: postgresqlDialectConfigManager.convertToSerializableObject(fullConfig.output.postgresql),
				sqlite: sqliteDialectConfigManager.convertToSerializableObject(fullConfig.output.sqlite),
				sqlserver: sqlServerDialectConfigManager.convertToSerializableObject(fullConfig.output.sqlserver),
				java: javaClassModelToCodeConverterConfigManager.convertToSerializableObject(fullConfig.output.java),
				typescript: typescriptClassModelToCodeConverterConfigManager.convertToSerializableObject(fullConfig.output.typescript),
				nomnoml: nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager.convertToSerializableObject(fullConfig.output.nomnoml)
			}
		};
	}

	convertFromSerializableObject(serializableConfig: ERDiagramCliSerializableConfig): ERDiagramCliConfig {
		return {
			parser: this.processSerializableObject(entityRelationshipModelParserConfigManager, serializableConfig?.parser),
			databaseModel: this.processSerializableObject(databaseModelGeneratorConfigManager, serializableConfig?.databaseModel),
			classModel: this.processSerializableObject(classModelGeneratorConfigManager, serializableConfig?.classModel),
			output: {
				mysql: this.processSerializableObject(mysqlDialectConfigManager, serializableConfig?.output?.mysql),
				oracle: this.processSerializableObject(oracleDialectConfigManager, serializableConfig?.output?.oracle),
				postgresql: this.processSerializableObject(postgresqlDialectConfigManager, serializableConfig?.output?.postgresql),
				sqlite: this.processSerializableObject(sqliteDialectConfigManager, serializableConfig?.output?.sqlite),
				sqlserver: this.processSerializableObject(sqlServerDialectConfigManager, serializableConfig?.output?.sqlserver),
				java: this.processSerializableObject(javaClassModelToCodeConverterConfigManager, serializableConfig?.output?.java),
				typescript: this.processSerializableObject(typescriptClassModelToCodeConverterConfigManager, serializableConfig?.output?.typescript),
				nomnoml: this.processSerializableObject(nomnomlEntityRelationshipModelToDiagramCodeConverterConfigManager, serializableConfig?.output?.nomnoml)
			}
		};
	}

	private processSerializableObject<C, P, S>(configManager: ComponentConfigManager<C, P, S>, partialSerializableConfig?: Partial<S>): C {

		const defaultSerializableConfig = configManager.convertToSerializableObject(configManager.getDefaultConfig());

		const fullSerializableConfig: S = {
			...defaultSerializableConfig,
			...partialSerializableConfig
		}

		return configManager.convertFromSerializableObject(fullSerializableConfig);

	}

}

const erdiagramCliConfigManager = new ERDiagramCliConfigManager();
export default erdiagramCliConfigManager;
