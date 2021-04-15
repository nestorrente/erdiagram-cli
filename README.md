# ERDiagram CLI

This application is the CLI version of the [ERDiagram library](https://github.com/nestorrente/erdiagram).

Please, refer to the library docs for further information about _ERDiagram_ features.

## Table of contents

* [Installation](#installation)
* [Usage](#usage)
    + [Generate command](#generate-command)
    + [Create config command](#create-config-command)

## Installation

```shell
npm install --global @nestorrente/erdiagram-cli
```

## Usage

```shell
erdiagram <command> [options]
```

Commands:
  * `erdiagram generate <input>`: generate the code of an entity-relationship model.
  * `erdiagram create-config`: create a config file with the default values.

Options:
  * `--help`, `-h`: Show help.
  * `--version`, `-v`  Show version number.

### Generate command

The `generate` command generates the output code from an input entity-relationship diagram written using the _ERDiagram_
language.

Usage:

```shell
erdiagram generate -f <outputFormat> [-o <outputFile>] [-c <configFile>] <input>
```

Options:
  * `--config`, `-c`: config file path (if not specified, uses `erdiagram.config.json` if exists).
  * `--format`, `-f`: output format (see below the full list of supported formats).
  * `--output`, `-o`: output file path (prints to standard output if not specified).

Supported output formats:
  * Database creation script:
    * `mysql`
    * `oracle`
    * `postgresql`, `postgres`
    * `sqlite`
    * `sqlserver`, `mssql`, `mssqlserver`
  * OOP classes/interfaces:
    * `java`
    * `typescript`, `ts`
  * Diagram:
    * `nomnoml`
    * `plantuml`

### Create config command

The `create-config` commands generates a config file with the default values.

By default, if the file already exists, it asks for confirmation, but this behaviour can be customized using the
`--override` and `--preserve` options.

```shell
erdiagram create-config [-c <configFile>]
```

Options:
* `--config`, `-c`: config file path (if not specified, uses `erdiagram.config.json` if exists).
* `--overwrite`, `-w`: overwrite existing config file without asking.
* `--preserve`, `-p`: preserve existing config file without asking.
