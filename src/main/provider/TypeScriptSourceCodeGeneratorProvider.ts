import ERDiagramCliConfig from '@/config/ERDiagramCliConfig';
import {SourceCodeGenerator, TypeScriptSourceCodeGenerator} from '@nestorrente/erdiagram';

export default class JavaSourceCodeGeneratorProvider {

	constructor(
			private readonly config: ERDiagramCliConfig
	) {

	}

	public getSourceCodeGenerator(): SourceCodeGenerator {
		return TypeScriptSourceCodeGenerator.builder()
				.configureClassModel(this.config.classModel)
				.configureTypeScript(this.config.output.typescript)
				.build();
	}

}