import fs from 'fs';
import path from 'path';
import erdiagramCliConfigManager from '@/config/ERDiagramCliConfigManager';
import ERDiagramCliConfig from '@/config/ERDiagramCliConfig';
import merge from 'lodash.merge'
import {JsonObject} from 'true-json';

type RecursivePartial<T> = {
	[P in keyof T]?:
	T[P] extends (infer U)[] ? RecursivePartial<U>[] :
			T[P] extends object ? RecursivePartial<T[P]> :
					T[P];
};

const DEFAULT_CONFIG_FILE_PATH = 'erdiagram.config.json';

export default class ConfigFileReader {

	public parseConfigFile(configFilePath?: string): ERDiagramCliConfig {

		const defaultSerializableConfig = this.getDefaultSerializedConfig();
		const partialSerializableConfig = this.getSerializableConfigFromConfigFile(configFilePath);

		const fullSerializableConfig = merge(defaultSerializableConfig, partialSerializableConfig);

		return erdiagramCliConfigManager.convertFromSerializableObject(fullSerializableConfig);

	}

	private getSerializableConfigFromConfigFile(configFilePath?: string): JsonObject | undefined {

		if(!configFilePath && !fs.existsSync(DEFAULT_CONFIG_FILE_PATH)) {
			return undefined;
		}

		const normalizedConfigFilePath = path.normalize(configFilePath ?? DEFAULT_CONFIG_FILE_PATH);

		if (!fs.existsSync(normalizedConfigFilePath)) {
			throw new Error(`Config file '${normalizedConfigFilePath}' doesn't exists`);
		}

		const configFileContents = fs.readFileSync(normalizedConfigFilePath).toString();

		try {
			return JSON.parse(configFileContents);
		} catch (e) {
			throw new Error(`Config file '${normalizedConfigFilePath}' is not a valid JSON file`);
		}

	}

	private getDefaultSerializedConfig() {
		const defaultConfig = erdiagramCliConfigManager.getDefaultConfig();
		return erdiagramCliConfigManager.convertToSerializableObject(defaultConfig);
	}

}

export const configFileReader = new ConfigFileReader();
