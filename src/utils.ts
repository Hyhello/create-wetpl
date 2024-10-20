// 工具包
import fs from 'node:fs';
import axios from 'axios';
import path from 'node:path';
import AdmZip from 'adm-zip';

interface DownloadTemplateOptions {
    dir?: string;
    cwd?: string;
    auth?: string;
}

type DownloadTemplateResult = {
    dir: string;
};

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

export async function downloadTemplate(
    input: string,
    options: DownloadTemplateOptions = {}
): Promise<DownloadTemplateResult> {
    const extractPath = pathResolve(options.cwd || '.', options.dir);

    const response = await axios.get(input, { responseType: 'arraybuffer' });

    if (response.status !== 200) {
        throw new Error('Failed to resolve template from github');
    }

    const zip = new AdmZip(response.data);

    const zipEntries = zip.getEntries();

    zipEntries.forEach((entry) => {
        const ePath = entry.entryName.split('/').slice(1).join('/');
        const nPath = path.join(extractPath, ePath);

        // Extract template
        if (!entry.isDirectory) {
            zip.extractEntryTo(entry, path.dirname(nPath), false, true);
        }
    });

    return {
        dir: extractPath
    };
}
