import ERDiagramCliConfig from '@/config/ERDiagramCliConfig';
import {
	EntityRelationshipModelSourceCodeGenerator,
	JavaClassModelTransformer,
	JavaEntityRelationshipModelSourceCodeGenerator,
	JavaxValidationTransformer,
	JpaTransformer
} from '@nestorrente/erdiagram';

export default class JavaEntityRelationshipModelSourceCodeGeneratorProvider {

	constructor(
			private readonly config: ERDiagramCliConfig
	) {

	}

	public getSourceCodeGenerator(): EntityRelationshipModelSourceCodeGenerator {
		return JavaEntityRelationshipModelSourceCodeGenerator.builder()
				.withClassModelGeneratorConfig(this.config.classModel)
				// FIXME we should rename this config, as the user of the library should know nothing about "JavaClassModelGenerator"
				.withJavaClassModelGeneratorConfig(this.config.output.java.model)
				.addJavaClassModelTransformers(...this.getTransformers())
				.build();
		// Maybe:
		//     .builder().configureClassModel(...).configureJavaCodeGeneration(...).build()
		// So the JavaClassModelGenerator will receive a JavaCodeGenerationConfig. Config interfaces should
		// be defined taking into account the public API, not the internal components which use that configs.
	}

	private getTransformers(): JavaClassModelTransformer[] {

		const transformers: JavaClassModelTransformer[] = [];

		const {
			validation: validationTransformerConfig,
			jpa: jpaTransformerConfig
		} = this.config.output.java.transformers;

		if (validationTransformerConfig.enabled) {
			const javaxValidationTransformer = new JavaxValidationTransformer(this.config.output.java.transformers.validation);
			transformers.push(javaxValidationTransformer);
		}

		if (jpaTransformerConfig.enabled) {
			const jpaTransformer = JpaTransformer.builder()
					.withDatabaseModelGeneratorConfig(this.config.databaseModel)
					.withConfig(jpaTransformerConfig)
					.build();
			transformers.push(jpaTransformer);
		}

		return transformers;

	}

}