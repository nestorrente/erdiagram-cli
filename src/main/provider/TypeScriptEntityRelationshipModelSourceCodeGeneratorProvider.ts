import ERDiagramCliConfig from '@/config/ERDiagramCliConfig';
import {
	EntityRelationshipModelSourceCodeGenerator,
	TypeScriptEntityRelationshipModelSourceCodeGenerator
} from '@nestorrente/erdiagram';

export default class JavaEntityRelationshipModelSourceCodeGeneratorProvider {

	constructor(
			private readonly config: ERDiagramCliConfig
	) {

	}

	public getSourceCodeGenerator(): EntityRelationshipModelSourceCodeGenerator {
		return TypeScriptEntityRelationshipModelSourceCodeGenerator.builder()
				.withClassModelGeneratorConfig(this.config.classModel)
				// FIXME we should rename this config, as the user of the library should know nothing about "TypeScriptClassModelToCodeConverter"
				.withTypeScriptClassModelToCodeConverterConfig(this.config.output.typescript)
				.build();
		// Maybe:
		//     .builder().configureClassModel(...).configureTypeScriptCodeGeneration(...).build()
		// So the TypeScriptClassModelToCodeConverter will receive a TypeScriptCodeGenerationConfig.
		// Config interfaces should be defined taking into account the public API, not the internal components
		// which use that configs.
	}

}