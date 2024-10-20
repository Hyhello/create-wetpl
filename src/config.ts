// config file
import type { PromptObject } from 'prompts';
import { isValidPackageName } from './utils';

// git repo
export const GIT_REPO = 'https://api.github.com/repos/Hyhello/template/zipball';

// prompts config
export const promptsConfig: Array<PromptObject> = [
    {
        type: 'text',
        name: 'projectName',
        message: 'Project name:',
        initial: 'wetpl',
        validate(val) {
            return isValidPackageName(val) || 'Invalid package.json name';
        }
    },
    {
        type: 'text',
        name: 'projectDescription',
        message: 'Project description:'
    },
    {
        type: 'select',
        name: 'projectType',
        message: 'Project template:',
        choices: [
            { title: 'Vue2', description: 'Vue2 framework project template', value: 'vue2' },
            { title: 'Vue3', description: 'Vue3 framework project template', value: 'vue3' },
            { title: 'Uniapp', description: 'Uniapp framework project template', value: 'uniapp' },
            { title: 'Utils', description: 'Utils project template', value: 'utils' }
        ]
    }
];
