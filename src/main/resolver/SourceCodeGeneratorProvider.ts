import {
	BeanValidationTransformer,
	JavaSourceCodeGenerator, JpaTransformer,
	NomnomlSourceCodeGenerator,
	PlantUmlSourceCodeGenerator,
	SourceCodeGenerator,
	SqlSourceCodeGenerator,
	TypeScriptSourceCodeGenerator
} from '@nestorrente/erdiagram';
import ERDiagramCliConfig from '@/config/ERDiagramCliConfig';
import {OutputFormat} from '@/output-formats';
import SqlDialectResolver from '@/resolver/SqlDialectResolver';

export class SourceCodeGeneratorProvider {

	constructor(
			private readonly config: ERDiagramCliConfig
	) {

	}

	public getSourceCodeGenerator(outputFormat: OutputFormat): SourceCodeGenerator {
		switch (outputFormat) {
			case 'mysql':
			case 'oracle':
			case 'postgresql':
			case 'sqlite':
			case 'sqlserver':
				const sqlDialect = new SqlDialectResolver(this.config).getSqlDialect(outputFormat);

				return SqlSourceCodeGenerator.builder(sqlDialect)
					.configureDatabaseModel(this.config.databaseModel)
					.build();
			case 'java':
				const builder = JavaSourceCodeGenerator.builder()
					.configureClassModel(this.config.classModel)
					.configureJavaClassModel(this.config.output.java.classModel);

				if (this.config.output.java.transformers.validation.enabled) {
					builder.addTransformers(
						new BeanValidationTransformer(this.config.output.java.transformers.validation.config)
					)
				}

				if (this.config.output.java.transformers.jpa.enabled) {
					builder.addTransformers(
						JpaTransformer.builder()
							.configureDatabaseModel(this.config.databaseModel)
							.configureJpa(this.config.output.java.transformers.jpa.config)
							.build()
					)
				}

				return builder.build();
			case 'typescript':
				return TypeScriptSourceCodeGenerator.builder()
					.configureClassModel(this.config.classModel)
					.configureTypeScript(this.config.output.typescript)
					.build();
			case 'nomnoml':
				return new NomnomlSourceCodeGenerator(this.config.output.nomnoml);
			case 'plantuml':
				return new PlantUmlSourceCodeGenerator(this.config.output.plantuml);
			default:
				throw new Error(`Unknown output format: ${outputFormat}`);
		}
	}

}
