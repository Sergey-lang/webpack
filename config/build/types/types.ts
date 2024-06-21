export type BuildModeType = 'production' | 'development'

export interface IBuildPath {
    entry: string;
    html: string;
    output: string;
    src: string;
}

export interface IBuildOptions {
    port: number;
    paths: IBuildPath;
    mode: BuildModeType
    analyzer?: boolean;
}