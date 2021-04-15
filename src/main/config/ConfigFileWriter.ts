import fs from 'fs';
import path from 'path';
import readline from 'readline';
import erdiagramCliConfigManager from '@/config/ERDiagramCliConfigManager';

export enum WriteExistingFileStrategy {
	OVERWRITE,
	PRESERVE,
	ASK
}

const DEFAULT_CONFIG_FILE_PATH = 'erdiagram.config.json';

const rl = readline.createInterface(process.stdin, process.stdout);

export default class ConfigFileWriter {

	public async createConfigFile(configFilePath?: string, writeExistingFileStrategy: WriteExistingFileStrategy = WriteExistingFileStrategy.ASK) {

		const normalizedConfigFilePath = path.normalize(configFilePath ?? DEFAULT_CONFIG_FILE_PATH);

		if(fs.existsSync(normalizedConfigFilePath)) {

			const preserveExistingFile = await this.shouldPreserveExistingFile(normalizedConfigFilePath, writeExistingFileStrategy);

			if(preserveExistingFile) {
				process.stdout.write(`Existing config file '${normalizedConfigFilePath}' was preserved.\n`);
				return;
			}

		}

		const defaultSerializableConfig = this.getDefaultSerializedConfig();

		const jsonConfig = JSON.stringify(defaultSerializableConfig, undefined, 2);

		fs.writeFileSync(normalizedConfigFilePath, jsonConfig);
		process.stdout.write(`Config file '${normalizedConfigFilePath}' sucessfully generated.\n`);

	}

	private async shouldPreserveExistingFile(filePath: string, writeExistingFileStrategy: WriteExistingFileStrategy): Promise<boolean> {
		switch (writeExistingFileStrategy) {
			case WriteExistingFileStrategy.OVERWRITE:
				return false;
			case WriteExistingFileStrategy.PRESERVE:
				return true;
			default:
				return !await this.confirmFileOverwrite(filePath);
		}
	}

	private confirmFileOverwrite(filePath: string): Promise<boolean> {
		return new Promise(resolve => {

			const questionMessage = `File '${filePath}' already exists. Do you like to overwrite it? (y/N) `;

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

export const configFileWriter = new ConfigFileWriter();
