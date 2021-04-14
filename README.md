# ERDiagram CLI

This application is the CLI version of the [ERDiagram library](https://github.com/nestorrente/erdiagram).

Please, refer to the library docs for further information about _ERDiagram_ features.

## Installation

```shell
npm install --global @nestorrente/erdiagram-cli
```

## Usage

You can execute the CLI command in order to generate the output code from an input entity-relationship diagram writing
in the _ERDiagram_ language:

```shell
erdiagram-cli -f OUTPUT_FORMAT [-o OUTPUT_FILE] [-c CONFIG_FILE] INPUT_FILE
```

If you don't specify any config file, `erdiagram-cli.json` will be used (if exists).

For example, this is the command you should execute if you want to generate the MySQL creation script for the
`input_model.erd` file using the `custom_config.json` config file:

```shell
erdiagram-cli -f mysql -c custom_config.json -o creation_script.sql input_model.erd
```

You can also generate a sample config file with all the default values:

```shell
erdiagram-cli --create-config [-c CONFIG_FILE]
```

## Supported output formats

### Database

| Dialect    | Output format value                    |
|------------|----------------------------------------|
| MySQL      | `mysql`                                |
| Oracle     | `oracle`                               |
| PostgreSQL | `postgresql` or `postgres`             |
| SQLite     | `sqlite`                               |
| SQL Server | `sqlserver`, `mssql`, or `mssqlserver` |

### OOP classes / interfaces

| Language   | Output format value  |
|------------|----------------------|
| Java       | `java`               |
| TypeScript | `typescript` or `ts` |

### Diagram

| Diagram engine | Output format value |
|----------------|---------------------|
| Nomnoml        | `nomnoml`           |
| PlantUML       | `plantuml`          |
