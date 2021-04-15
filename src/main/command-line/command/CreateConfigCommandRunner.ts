import CommandRunner from '@/command-line/command/CommandRunner';
import {configFileWriter, WriteExistingFileStrategy} from '@/config/ConfigFileWriter';

export interface CreateConfigCommandArgs {
	configFilePath?: string;
	overwrite: boolean;
	preserve: boolean;
}

const createConfigCommandRunner: CommandRunner<CreateConfigCommandArgs> = {
	async run(args: CreateConfigCommandArgs) {
		const writeExistingFileStrategy = resolveWriteExistingFileStrategy(args);
		await configFileWriter.createConfigFile(args.configFilePath, writeExistingFileStrategy);
	}
};

function resolveWriteExistingFileStrategy(args: CreateConfigCommandArgs): WriteExistingFileStrategy {

	if(args.overwrite && args.preserve) {
		throw new Error('--overwrite and --preserve options cannot be used simultaneously');
	}

	if(args.overwrite) {
		return WriteExistingFileStrategy.OVERWRITE;
	}

	if(args.preserve) {
		return WriteExistingFileStrategy.PRESERVE;
	}

	return WriteExistingFileStrategy.ASK;

}

export default createConfigCommandRunner;
