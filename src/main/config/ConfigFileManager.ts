import ERDiagramCliSerializableConfig from '@/config/ERDiagramCliSerializableConfig';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import erdiagramCliConfigManager from '@/config/ERDiagramCliConfigManager';
import ERDiagramCliConfig from '@/config/ERDiagramCliConfig';
import merge from 'lodash.merge'

type RecursivePartial<T> = {
	[P in keyof T]?:
	T[P] extends (infer U)[] ? RecursivePartial<U>[] :
			T[P] extends object ? RecursivePartial<T[P]> :
					T[P];
};

const DEFAULT_CONFIG_FILE_PATH = 'erdiagram-cli.json';

const rl = readline.createInterface(process.stdin, process.stdout);

export default class ConfigFileManager {

	public parseConfigFile(configFilePath?: string): ERDiagramCliConfig {

		const defaultSerializableConfig = this.getDefaultSerializedConfig();
		const partialSerializableConfig = this.getSerializableConfigFromConfigFile(configFilePath);

		const fullSerializableConfig: ERDiagramCliSerializableConfig = merge(defaultSerializableConfig, partialSerializableConfig);

		return erdiagramCliConfigManager.convertFromSerializableObject(fullSerializableConfig);

	}

	private getSerializableConfigFromConfigFile(configFilePath?: string): RecursivePartial<ERDiagramCliSerializableConfig> | undefined {

		if(!configFilePath && !fs.existsSync(DEFAULT_CONFIG_FILE_PATH)) {
			return undefined;
		}

		const normalizedConfigFilePath = path.normalize(configFilePath ?? DEFAULT_CONFIG_FILE_PATH);

		if (!fs.existsSync(normalizedConfigFilePath)) {
			throw new Error(`Config file ${normalizedConfigFilePath} doesn't exists`);
		}

		const configFileContents = fs.readFileSync(normalizedConfigFilePath).toString();

		try {
			return JSON.parse(configFileContents);
		} catch (e) {
			throw new Error(`Config file ${normalizedConfigFilePath} is not a valid JSON file`);
		}

	}

	public async createConfigFile(configFilePath?: string) {

		const normalizedConfigFilePath = path.normalize(configFilePath ?? DEFAULT_CONFIG_FILE_PATH);

		if(fs.existsSync(normalizedConfigFilePath) && !await this.confirmFileOverwrite(normalizedConfigFilePath)) {
			process.stdout.write('Operation cancelled by the user.\n');
			return;
		}

		const defaultSerializableConfig = this.getDefaultSerializedConfig();

		const jsonConfig = JSON.stringify(defaultSerializableConfig, undefined, 2);

		fs.writeFileSync(normalizedConfigFilePath, jsonConfig);
		process.stdout.write(`Config file ${normalizedConfigFilePath} sucessfully generated.\n`);

	}

	private confirmFileOverwrite(filePath: string): Promise<boolean> {
		return new Promise(resolve => {

			const questionMessage = `File ${filePath} already exists. Do you like to overwrite it? (y/N) `;

			rl.question(questionMessage, answer => {
				const processedAnswer = answer.trim().toLowerCase();
				const confirmed = ['y', 'yes'].includes(processedAnswer);
				resolve(confirmed);
			});

		})
	}

	private getDefaultSerializedConfig() {
		const defaultConfig = erdiagramCliConfigManager.getDefaultConfig();
		return erdiagramCliConfigManager.convertToSerializableObject(defaultConfig);
	}

}

export const configFileManager = new ConfigFileManager();
