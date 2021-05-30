import {
	EntityRelationshipModelSourceCodeGenerator,
	NomnomlEntityRelationshipModelSourceCodeGenerator,
	PlantUmlEntityRelationshipModelSourceCodeGenerator,
} from '@nestorrente/erdiagram';
import ERDiagramCliConfig from '@/config/ERDiagramCliConfig';
import {OutputFormat} from '@/output-formats';
import SqlEntityRelationshipModelSourceCodeGeneratorProvider
	from '@/provider/SqlEntityRelationshipModelSourceCodeGeneratorProvider';
import JavaEntityRelationshipModelSourceCodeGeneratorProvider
	from '@/provider/JavaEntityRelationshipModelSourceCodeGeneratorProvider';
import TypeScriptEntityRelationshipModelSourceCodeGeneratorProvider
	from '@/provider/TypeScriptEntityRelationshipModelSourceCodeGeneratorProvider';

export class EntityRelationshipModelSourceCodeGeneratorProvider {

	private readonly sqlEntityRelationshipModelSourceCodeGeneratorProvider: SqlEntityRelationshipModelSourceCodeGeneratorProvider;
	private readonly javaEntityRelationshipModelSourceCodeGeneratorProvider = new JavaEntityRelationshipModelSourceCodeGeneratorProvider(this.config);
	private readonly typeScriptEntityRelationshipModelSourceCodeGeneratorProvider = new TypeScriptEntityRelationshipModelSourceCodeGeneratorProvider(this.config);

	constructor(
			private readonly config: ERDiagramCliConfig
	) {
		this.sqlEntityRelationshipModelSourceCodeGeneratorProvider = new SqlEntityRelationshipModelSourceCodeGeneratorProvider(this.config);
	}

	public getSourceCodeGenerator(outputFormat: OutputFormat): EntityRelationshipModelSourceCodeGenerator {
		switch (outputFormat) {
			case 'mysql':
			case 'oracle':
			case 'postgresql':
			case 'sqlite':
			case 'sqlserver':
				return this.sqlEntityRelationshipModelSourceCodeGeneratorProvider.getSourceCodeGenerator(outputFormat);
			case 'java':
				return this.javaEntityRelationshipModelSourceCodeGeneratorProvider.getSourceCodeGenerator();
			case 'typescript':
				return this.typeScriptEntityRelationshipModelSourceCodeGeneratorProvider.getSourceCodeGenerator();
			case 'nomnoml':
				return new NomnomlEntityRelationshipModelSourceCodeGenerator(this.config.output.nomnoml);
			case 'plantuml':
				return new PlantUmlEntityRelationshipModelSourceCodeGenerator();
			default:
				throw new Error(`Unknown output format: ${outputFormat}`);
		}
	}

}
