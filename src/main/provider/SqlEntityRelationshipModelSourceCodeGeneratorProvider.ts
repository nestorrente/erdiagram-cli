import {SqlEntityRelationshipModelSourceCodeGenerator} from '@nestorrente/erdiagram';
import {SqlOutputFormat} from '@/output-formats';
import ERDiagramCliConfig from '@/config/ERDiagramCliConfig';
import SqlDialectProvider from '@/provider/SqlDialectProvider';

export default class SqlEntityRelationshipModelSourceCodeGeneratorProvider {

	private readonly sqlDialectProvider: SqlDialectProvider;

	constructor(
			private readonly config: ERDiagramCliConfig
	) {
		this.sqlDialectProvider = new SqlDialectProvider(this.config);
	}

	public getSourceCodeGenerator(outputFormat: SqlOutputFormat): SqlEntityRelationshipModelSourceCodeGenerator {
		return SqlEntityRelationshipModelSourceCodeGenerator.builder()
				.withDatabaseModelGeneratorConfig(this.config.databaseModel)
				.withSqlDialect(this.sqlDialectProvider.getSqlDialect(outputFormat))
				.build();
	}

}
