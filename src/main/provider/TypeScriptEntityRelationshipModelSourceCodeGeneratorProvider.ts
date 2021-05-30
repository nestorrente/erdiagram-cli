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
				.configureClassModel(this.config.classModel)
				.configureTypeScriptCode(this.config.output.typescript)
				.build();
	}

}