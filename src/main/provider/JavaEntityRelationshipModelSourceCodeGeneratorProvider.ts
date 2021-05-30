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
				.configureClassModel(this.config.classModel)
				.configureJavaCode(this.config.output.java.code)
				.addTransformers(...this.getTransformers())
				.build();
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
					.configureDatabaseModel(this.config.databaseModel)
					.configureJpa(jpaTransformerConfig)
					.build();
			transformers.push(jpaTransformer);
		}

		return transformers;

	}

}