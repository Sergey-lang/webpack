export type BuildModeType = 'production' | 'development'

export interface IBuildPath {
    entry: string;
    html: string;
    output: string;
}

export interface IBuildOptions {
    port: number;
    paths: IBuildPath;
    mode: BuildModeType
}