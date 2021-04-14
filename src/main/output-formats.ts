export type SqlOutputFormat = 'mysql' | 'oracle' | 'postgresql' | 'sqlite' | 'sqlserver';
export type ClassOutputFormat = 'java' | 'typescript';
export type DiagramOutputFormat = 'nomnoml' | 'plantuml';

export type OutputFormat = SqlOutputFormat | ClassOutputFormat | DiagramOutputFormat;
