export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/jest-setup.ts'],

    // This is the new, recommended way to configure ts-jest
    transform: {
        // Use ts-jest for any file ending in .ts or .tsx
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: './tsconfig.jest.json',
            },
        ],
    },

    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};