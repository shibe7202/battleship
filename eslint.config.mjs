import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
    {
        languageOptions: { globals: globals.browser },
    },
    pluginJs.configs.recommended,
    {
        ignores: ['**/*.config.js', 'dist/*', '**/*.test.js'],
    },
]
