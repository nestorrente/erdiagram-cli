import {SqlSourceCodeGenerator} from '@nestorrente/erdiagram';
import {SqlOutputFormat} from '@/output-formats';
import ERDiagramCliConfig from '@/config/ERDiagramCliConfig';
import SqlDialectProvider from '@/provider/SqlDialectProvider';

export default class SqlSourceCodeGeneratorProvider {

	private readonly sqlDialectProvider: SqlDialectProvider;

	constructor(
			private readonly config: ERDiagramCliConfig
	) {
		this.sqlDialectProvider = new SqlDialectProvider(this.config);
	}

	public getSourceCodeGenerator(outputFormat: SqlOutputFormat): SqlSourceCodeGenerator {
		return SqlSourceCodeGenerator.builder()
				.configureDatabaseModel(this.config.databaseModel)
				.useDialect(this.sqlDialectProvider.getSqlDialect(outputFormat))
				.build();
	}

}
