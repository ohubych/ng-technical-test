const yaml = require('js-yaml');
const fs = require('fs');

/**
 * Script custom configuration
 */
// Set here the blacklisted keys that won't be considered into config files comparison
const blacklistConfigKeys = [];

/* ****************************************************************** */

// Names of the different config files per env
const ymlFileConfigNames = ['main.yml', 'main.yaml'];

const [ymlConfigKey] = process.argv.slice(2);

/* eslint-disable no-param-reassign */
const listFilesByName = (dirPath, fileNames, arrayOfFiles = []) => {
    try {
        const files = fs.readdirSync(dirPath);

        files.forEach(file => {
            if (fs.statSync(`${dirPath}/${file}`).isDirectory() && file !== 'node_modules') {
                arrayOfFiles = listFilesByName(`${dirPath}/${file}`, fileNames, arrayOfFiles);
            } else if (fileNames.includes(file)) {
                arrayOfFiles.push(`${dirPath}/${file}`);
            }
        });

        return arrayOfFiles;
    } catch (e) {
        console.log('***************** ERROR *************************');
        console.log(`Error when listing the directory ${dirPath}`);
        throw new Error(e);
    }
};
/* eslint-enable */

const compareConfig = ([basePath, baseConfig], [comparedPath, comparedConfig]) => {
    console.log(`Comparing ${basePath} and ${comparedPath}...`);
    for (const keyInBaseConfig of Object.keys(baseConfig)) {
        if (blacklistConfigKeys.includes(keyInBaseConfig)) {
            break;
        }
        if (typeof comparedConfig[keyInBaseConfig] === 'undefined') {
            throw new Error(
                `property ${keyInBaseConfig} exists in ${basePath} but is missing in ${comparedPath}`
            );
        }
        if (typeof baseConfig[keyInBaseConfig] !== typeof comparedConfig[keyInBaseConfig]) {
            throw new Error(
                `property ${keyInBaseConfig} in ${comparedPath} is not type of
                ${typeof baseConfig[keyInBaseConfig]} as in ${basePath}`
            );
        }
    }
};

const devConfigFilePaths = listFilesByName('../..', ['config.json']);
const devConfigMap = new Map();
for (path of devConfigFilePaths) {
    let devConfigFile;
    try {
        devConfigFile = fs.readFileSync(path, 'utf8');
    } catch (e) {
        console.log('***************** ERROR *************************');
        console.log(`Failed when loading file ${path}`);
        throw new Error(e);
    }
    let devConfig;
    try {
        devConfig = JSON.parse(devConfigFile);
    } catch (e) {
        console.log('***************** ERROR *************************');
        console.log(`Failed when parsing file ${path} - ${devConfigFile}`);
        throw new Error(e);
    }
    devConfigMap.set(path, devConfig);
}

/* We extract the first local dev config from the list of dev configs
   It will be used as a base of comparison for other local conf and yml env conf */
if (devConfigMap.size > 0) {
    const baseDevConfig = devConfigMap.entries().next();
    devConfigMap.delete(baseDevConfig.value[0]);
}

/**
 * 1st STEP : CHECK ALL DEV CONFIG FILES CONTAIN THE SAME KEYS
 */

devConfigMap.forEach((devConfig, devPath) => {
    compareConfig(baseDevConfig.value, [devPath, devConfig]);
    compareConfig([devPath, devConfig], baseDevConfig.value);
});

const ymlFilesPath = listFilesByName('../../configs', ymlFileConfigNames);
const ymlConfigMap = new Map();
for (path of ymlFilesPath) {
    let ymlFile;
    try {
        ymlFile = yaml.load(fs.readFileSync(path, 'utf8'));
    } catch (e) {
        console.log('***************** ERROR *************************');
        console.log(`Failed when loading file ${path}`);
        throw new Error(e);
    }
    let ymlFileConfig;
    try {
        ymlFileConfig = JSON.parse(ymlFile.config[ymlConfigKey]);
    } catch (e) {
        console.log('***************** ERROR *************************');
        console.log(`Failed when parsing file ${path} - ${ymlFile.config[ymlConfigKey]}`);
        throw new Error(e);
    }
    ymlConfigMap.set(path, ymlFileConfig);
}

/**
 * 2nd step : COMPARE DEV CONFIG TO YAML CONFIG FILES
 */

ymlConfigMap.forEach((ymnlConfig, ymlPath) => {
    compareConfig(baseDevConfig.value, [ymlPath, ymnlConfig]);
    compareConfig([ymlPath, ymnlConfig], baseDevConfig.value);
});

console.log('***************** SUCCESS *************************');
console.log('All your config match, you are good to go !');
