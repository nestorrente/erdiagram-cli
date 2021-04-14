import yargs from 'yargs';
import {OutputFormat} from '@/output-formats';
import CommandLineArguments from '@/cl-args/CommandLineArguments';

type CommandLineOutputFormat = OutputFormat | OutputFormatAlias;
type OutputFormatAlias = 'postgres' | 'mssql' | 'mssqlserver' | 'ts';

const ERDIAGRAM_CLI_COMMAND = 'erdiagram-cli';

const USAGE_MESSAGE = `
Usage: ${ERDIAGRAM_CLI_COMMAND} [options]

  Generate output code from ERD file
  $ ${ERDIAGRAM_CLI_COMMAND} -f OUTPUT_FORMAT [-c CONFIG_FILE] [-o OUTPUT_FILE] INPUT_FILE

  Create sample config file
  $ ${ERDIAGRAM_CLI_COMMAND} --create-config [-c CONFIG_FILE]

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

const OUTPUT_FORMAT_ALIASES_MAP: Record<OutputFormatAlias, OutputFormat> = {
	postgres: 'postgresql',
	mssql: 'sqlserver',
	mssqlserver: 'sqlserver',
	ts: 'typescript'
};

function isOutputFormatAlias(outputFormat: CommandLineOutputFormat): outputFormat is OutputFormatAlias {
	return OUTPUT_FORMAT_ALIASES_MAP.hasOwnProperty(outputFormat);
}

export class CommandLineArgumentsResolver {

	public resolveCommandLineArguments(args: string[] = process.argv.slice(2)): CommandLineArguments {

		const yargsArgs = yargs(args)
				.option('format', {
					alias: 'f',
					type: 'string',
					description: 'Output format'
				})
				.option('config', {
					alias: 'c',
					type: 'string',
					description: 'JSON config file path'
				})
				.option('output', {
					alias: 'o',
					type: 'string',
					description: 'Output file (prints to standard output if not specified)'
				})
				.option('create-config', {
					type: 'boolean',
					description: 'Create a config file with the default values'
				})
				.help()
				.alias('help', 'h')
				.version('1.0.0-beta.4')
				.alias('version', 'v')
				.usage(USAGE_MESSAGE)
				.argv;

		const createConfig = yargsArgs['create-config'] ?? false;

		return {
			createConfig,
			configFilePath: yargsArgs.config,
			inputFilePath: createConfig ? undefined : this.processInputFilePath(yargsArgs._[0]),
			outputFilePath: yargsArgs.output,
			outputFormat: createConfig ? undefined : this.processOutputFormat(yargsArgs.format as CommandLineOutputFormat)
		};

	}

	private processInputFilePath(inputFilePath: string | number): string | undefined {

		if (typeof inputFilePath === 'number') {
			return String(inputFilePath);
		}

		if (!inputFilePath) {
			return undefined;
		}

		return String(inputFilePath);

	}

	private processOutputFormat(outputFormat: CommandLineOutputFormat): OutputFormat | undefined {

		if (!outputFormat) {
			return undefined;
		}

		if (isOutputFormatAlias(outputFormat)) {
			return OUTPUT_FORMAT_ALIASES_MAP[outputFormat];
		}

		return outputFormat as OutputFormat;

	}

}

export const commandLineArgumentsResolver = new CommandLineArgumentsResolver();
