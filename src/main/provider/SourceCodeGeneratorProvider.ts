import {
	SourceCodeGenerator,
	NomnomlSourceCodeGenerator,
	PlantUmlSourceCodeGenerator,
} from '@nestorrente/erdiagram';
import ERDiagramCliConfig from '@/config/ERDiagramCliConfig';
import {OutputFormat} from '@/output-formats';
import SqlSourceCodeGeneratorProvider
	from '@/provider/SqlSourceCodeGeneratorProvider';
import JavaSourceCodeGeneratorProvider
	from '@/provider/JavaSourceCodeGeneratorProvider';
import TypeScriptSourceCodeGeneratorProvider
	from '@/provider/TypeScriptSourceCodeGeneratorProvider';

export class SourceCodeGeneratorProvider {

	private readonly sqlSourceCodeGeneratorProvider: SqlSourceCodeGeneratorProvider;
	private readonly javaSourceCodeGeneratorProvider = new JavaSourceCodeGeneratorProvider(this.config);
	private readonly typeScriptSourceCodeGeneratorProvider = new TypeScriptSourceCodeGeneratorProvider(this.config);

	constructor(
			private readonly config: ERDiagramCliConfig
	) {
		this.sqlSourceCodeGeneratorProvider = new SqlSourceCodeGeneratorProvider(this.config);
	}

	public getSourceCodeGenerator(outputFormat: OutputFormat): SourceCodeGenerator {
		switch (outputFormat) {
			case 'mysql':
			case 'oracle':
			case 'postgresql':
			case 'sqlite':
			case 'sqlserver':
				return this.sqlSourceCodeGeneratorProvider.getSourceCodeGenerator(outputFormat);
			case 'java':
				return this.javaSourceCodeGeneratorProvider.getSourceCodeGenerator();
			case 'typescript':
				return this.typeScriptSourceCodeGeneratorProvider.getSourceCodeGenerator();
			case 'nomnoml':
				return new NomnomlSourceCodeGenerator(this.config.output.nomnoml);
			case 'plantuml':
				return new PlantUmlSourceCodeGenerator();
			default:
				throw new Error(`Unknown output format: ${outputFormat}`);
		}
	}

}
