import yargs from 'yargs';
import fs from 'fs';
import {
	ClassModelGenerator,
	DatabaseModelGenerator,
	DatabaseModelToSqlCodeConverter,
	EntityRelationshipModelParser,
	EntityRelationshipModelToClassCodeConverter,
	EntityRelationshipModelToCodeConverter,
	EntityRelationshipModelToDatabaseCodeConverter,
	JavaClassModelToCodeConverter,
	MysqlDialect, NomnomlEntityRelationshipModelToDiagramCodeConverter,
	OracleDialect, PlantUmlEntityRelationshipModelToDiagramCodeConverter,
	PostgresqlDialect,
	SqlDialect,
	SqliteDialect,
	SqlServerDialect, TypeScriptClassModelToCodeConverter,
} from '@nestorrente/erdiagram';
import erdiagramCliConfigManager from '@/config/ERDiagramCliConfigManager';
import SqlDialectProvider from '@/resolver/SqlDialectProvider';
import ERDiagramCliConfig from '@/config/ERDiagramCliConfig';
import {OutputFormat} from '@/output-formats';
import ClassModelToCodeConverterProvider from '@/resolver/ClassModelToCodeConverterProvider';
import EntityRelationshipModelToClassCodeConverterProvider
	from '@/resolver/EntityRelationshipModelToClassCodeConverterProvider';
import EntityRelationshipModelToDatabaseCodeConverterProvider
	from '@/resolver/EntityRelationshipModelToDatabaseCodeConverterProvider';

export class EntityRelationshipModelToCodeConverterProvider {

	constructor(
			private readonly config: ERDiagramCliConfig
	) {

	}

	public getERModelToCodeConverter(outputFormat: OutputFormat): EntityRelationshipModelToCodeConverter {
		switch (outputFormat) {
			case 'mysql':
			case 'oracle':
			case 'postgresql':
			case 'sqlite':
			case 'sqlserver':
				const erModelToDatabaseCodeConverterProvider = new EntityRelationshipModelToDatabaseCodeConverterProvider(this.config);
				return erModelToDatabaseCodeConverterProvider.getERModelToDatabaseCodeConverter(outputFormat);
			case 'java':
			case 'typescript':
				const erModelToClassCodeConverterProvider = new EntityRelationshipModelToClassCodeConverterProvider(this.config);
				return erModelToClassCodeConverterProvider.getERModelToClassCodeConverter(outputFormat);
			case 'nomnoml':
				return new NomnomlEntityRelationshipModelToDiagramCodeConverter(this.config.output.nomnoml);
			case 'plantuml':
				return new PlantUmlEntityRelationshipModelToDiagramCodeConverter();
			default:
				throw new Error(`Unknown output format: ${outputFormat}`);
		}
	}

}
