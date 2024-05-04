// 工具包
import fs from 'node:fs';
import path from 'node:path';

// 判断当前包是否合法
// 引用：https://github.com/vuejs/create-vue/blob/main/index.ts
export function isValidPackageName(projectName: string): boolean {
    return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName);
}

// resolve
export const pathResolve = (...pathList: string[]): string => {
    return path.resolve(process.cwd(), ...pathList);
};

// 拼接dir
export const resolveCWD = (dir: string): string => {
    return path.isAbsolute(dir) ? dir : pathResolve(dir);
};

// 检测文件路径是否存在
export const pathExistsSync = (pathDir: string): boolean => {
    return fs.existsSync(pathDir);
};

// cover the file
export const coverFileByOptions = (filePath: string, options: Record<string, string> = {}): void => {
    const pkg = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    fs.writeFileSync(filePath, JSON.stringify({ ...pkg, ...options }, null, 2));
};

// 删除文件夹
export const removeSync = (pathDir: string) => {
    fs.rmSync(pathDir, { recursive: true, focus: true });
};
