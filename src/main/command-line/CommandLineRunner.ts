import yargs from 'yargs';
import {OutputFormat} from '@/output-formats';
import generateCommandRunner from '@/command-line/command/GenerateCommandRunner';
import createConfigCommandRunner from '@/command-line/command/CreateConfigCommandRunner';
import CommandRunner from '@/command-line/command/CommandRunner';

type CommandLineOutputFormat = OutputFormat | OutputFormatAlias;
type OutputFormatAlias = 'postgres' | 'mssql' | 'mssqlserver' | 'ts';

const NO_COMMAND_USAGE_MESSAGE = `
${APP_VERSION}

Try '${ERDIAGRAM_CLI_COMMAND} <command> -h' for get more info about command options.
`.trim();

const GENERATE_COMMAND_USAGE_MESSAGE = `
${ERDIAGRAM_CLI_COMMAND} generate -f <outputFormat> [-c <configFile>] [-o <outputFile>] <input>

Supported output formats:
  - Database:
    - mysql
    - oracle
    - postgresql (alias: postgres)
    - sqlite
    - sqlserver (aliases: mssql, mssqlserver)
  - OOP classes/interfaces:
    - java
    - typescript (alias: ts)
  - Diagram:
    - nomnoml
    - plantuml
`.trim();

const CREATE_CONFIG_COMMAND_USAGE_MESSAGE = `
${ERDIAGRAM_CLI_COMMAND} --create-config [-c <configFile>] [--overwrite]
`.trim();

const OUTPUT_FORMAT_ALIASES_MAP: Record<OutputFormatAlias, OutputFormat> = {
	postgres: 'postgresql',
	mssql: 'sqlserver',
	mssqlserver: 'sqlserver',
	ts: 'typescript'
};

function isOutputFormatAlias(outputFormat: CommandLineOutputFormat): outputFormat is OutputFormatAlias {
	return OUTPUT_FORMAT_ALIASES_MAP.hasOwnProperty(outputFormat);
}

export class CommandLineRunner {

	public run(args: string[] = process.argv.slice(2)) {
		// tslint:disable-next-line:no-unused-expression
		yargs(args)
				.command(
						'generate <input>',
						'Generate the code of an entity-relationship model',
						commandYargs => {
							return commandYargs
									.positional('input', {
										type: 'string',
										description: 'Input file path',
										demandOption: true
									})
									.option('config', {
										alias: 'c',
										type: 'string',
										description: 'Config file path. If not specified, uses \'erdiagram.config.json\' (if exists)',
										requiresArg: true
									})
									.option('format', {
										alias: 'f',
										type: 'string',
										description: 'Output format',
										requiresArg: true,
										demandOption: true
									})
									.option('output', {
										alias: 'o',
										type: 'string',
										description: 'Output file path. Prints to standard output if not specified',
										requiresArg: true
									})
									.usage(GENERATE_COMMAND_USAGE_MESSAGE);
						},
						argv => this.runCommand(generateCommandRunner, {
							configFilePath: argv.config,
							inputFilePath: argv.input,
							outputFilePath: argv.output,
							outputFormat: this.processOutputFormat(argv.format as CommandLineOutputFormat)
						})
				)
				.command(
						'create-config',
						'Create a config file with the default values',
						commandYargs => {
							return commandYargs
									.option('config', {
										alias: 'c',
										type: 'string',
										description: 'Config file path. If not specified, uses \'erdiagram.config.json\'',
										requiresArg: true
									})
									.option('overwrite', {
										alias: 'w',
										type: 'boolean',
										description: 'Overwrite existing config file without asking'
									})
									.option('preserve', {
										alias: 'p',
										type: 'boolean',
										description: 'Preserve existing config file without asking'
									})
									.usage(CREATE_CONFIG_COMMAND_USAGE_MESSAGE);
						},
						argv => this.runCommand(createConfigCommandRunner, {
							configFilePath: argv.config,
							overwrite: argv.overwrite ?? false,
							preserve: argv.preserve ?? false
						})
				)
				.help()
				.alias('help', 'h')
				.version(APP_VERSION)
				.alias('version', 'v')
				.usage(NO_COMMAND_USAGE_MESSAGE)
				.demandCommand(1)
				.recommendCommands()
				.showHelpOnFail(true)
				.strict()
				.argv;
	}

	private processOutputFormat(outputFormat: CommandLineOutputFormat): OutputFormat {

		if (isOutputFormatAlias(outputFormat)) {
			return OUTPUT_FORMAT_ALIASES_MAP[outputFormat];
		}

		return outputFormat as OutputFormat;

	}

	private runCommand<A>(commandRunner: CommandRunner<A>, args: A) {
		commandRunner.run(args)
				.then(() => this.exitSucessfully())
				.catch(error => this.exitWithError(error));
	}

	private exitSucessfully() {
		return process.exit();
	}

	private exitWithError(error: any) {

		const errorMessage = 'message' in error ? error.message : error;

		process.stderr.write(errorMessage);
		process.stderr.write('\n');

		process.exit(-1);

	}

}

export const commandLineArgumentsResolver = new CommandLineRunner();
