import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    testEnvironment: 'jsdom',
    preset: 'ts-jest',
    transform: {
        '\\.tsx?$': 'babel-jest'
    },
    setupFiles: ['./tests/setup.ts'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testRegex: '/tests/.*\\.test.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
export default config;
