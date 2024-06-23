export type BuildModeType = 'production' | 'development'
export type BuildPlatformType = 'mobile' | 'desktop'

export interface IBuildPath {
    entry: string;
    html: string;
    output: string;
    src: string;
    public: string;
}

export interface IBuildOptions {
    port: number;
    paths: IBuildPath;
    mode: BuildModeType;
    platform: BuildPlatformType;
    analyzer?: boolean;
}