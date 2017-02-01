var parent = require('parent-package-json'),
    path = require('path')

function getPlatformInfo() {
    if (/linux/.test(process.platform)) {
        return 'linux'
    } else if (/darwin/.test(process.platform)) {
        return 'osx'
    } else {
        return 'windows'
    }
}

try {
    var manifest = require(parent().path)
} catch (e) {}

var inf = (manifest && manifest['prebuilt']) ? manifest['prebuilt'] : {}
var targetDir = process.env.PREBUILT_TARGET_DIR || inf.targetDir || './bin'
var targetBin = process.env.PREBUILT_BINARY || inf.targetBin
var paths = inf.paths
var platform = process.env.PREBUILT_PLATFORM || inf.platform || getPlatformInfo()

if (targetBin)
    module.exports.binary = require(targetDir + '/' + targetBin);

if(paths)
    module.exports.path = path.join(__dirname, paths[platform])