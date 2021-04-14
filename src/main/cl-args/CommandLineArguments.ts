import {OutputFormat} from '@/output-formats';

export default interface CommandLineArguments {
	createConfig: boolean;
	configFilePath?: string;
	inputFilePath?: string;
	outputFilePath?: string;
	outputFormat?: OutputFormat;
}