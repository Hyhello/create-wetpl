#!/usr/bin/env node

import prompts from 'prompts';
import logger from './logger';
import getBanner from './banner';
import { GIT_REPO, promptsConfig } from './config';
import { resolveCWD, pathResolve, pathExistsSync, coverFileByOptions, downloadTemplate } from './utils';

function init() {
    // 输出banner
    logger.info(getBanner());

    prompts(promptsConfig, {
        onCancel() {
            logger.warn('\n Info: Create Cancelled\n');
            process.exit(0);
        }
    })
        .then((answer) => {
            const { projectName, projectDescription, projectType } = answer;
            const outputDir = resolveCWD(projectName);
            if (pathExistsSync(outputDir)) {
                logger.error(
                    `\nError: The '${projectName}' folder already exists in the current path. Please change the project name and try again`
                );
                return process.exit(1);
            }
            // copy in create-vue
            logger.info(`\nScaffolding project in ${outputDir}...`);
            downloadTemplate(`${GIT_REPO}/${projectType}`, { dir: projectName })
                .then(() => {
                    const pkgOptions = { name: projectName, version: '1.0.0', description: projectDescription };
                    coverFileByOptions(pathResolve(projectName, 'package.json'), pkgOptions);
                    // copy in create-vue
                    logger.info('\nDone. Now run:\n');
                    logger.success(`  cd ${projectName}`);
                    logger.success('  npm install\n');
                    process.exit(0);
                })
                .catch((e) => {
                    logger.error(`\n${e.stack || e.message}`);
                    process.exit(1);
                });
        })
        .catch((e) => {
            logger.error(`\n${e.stack || e.message}`);
            process.exit(1);
        });
}

init();
