import ERDiagramCliConfig from '@/config/ERDiagramCliConfig';
import {
	BeanValidationTransformer,
	JavaClassModelTransformer,
	JavaSourceCodeGenerator,
	JpaTransformer,
	SourceCodeGenerator
} from '@nestorrente/erdiagram';

export default class JavaSourceCodeGeneratorProvider {

	constructor(
			private readonly config: ERDiagramCliConfig
	) {

	}

	public getSourceCodeGenerator(): SourceCodeGenerator {
		return JavaSourceCodeGenerator.builder()
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
			const beanValidationTransformer = new BeanValidationTransformer(this.config.output.java.transformers.validation);
			transformers.push(beanValidationTransformer);
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