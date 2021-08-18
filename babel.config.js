module.exports = {
    presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
    plugins: [
        'babel-plugin-transform-typescript-metadata',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
        [
            'module-resolver',
            {
                alias: {
                    '@adapters': './src/adapters',
                    '@entities': './src/entities',
                    '@external': './src/external',
                    '@main': './src/main',
                    '@services': './src/services',
                    '@shared': './src/shared',
                    '@usecases': './src/usecases'
                }
            }
        ]
    ],
    ignore: ['**/*.spec.ts', '**/*.test.ts']
}
