const _forEach = require("lodash/forEach")
const _isObject = require("lodash/isObject")
const _isEmpty = require("lodash/isEmpty")

const getKeyPath = (obj, parent, paths) => {
    
    console.log("\n")
    console.log(
        "mapping keys for obj", obj,
        "with parent", parent,
    )
    
    _forEach(obj, (value, key) => {

        console.log("\n")
        console.log("obj", obj)
        console.log("parent", parent)
        console.log("key", key)
        console.log("value", value)
        console.log("paths", paths)
        console.log("condition", value ? true : false, _isObject(value), !_isEmpty(value))


        paths = (value && _isObject(value) && !_isEmpty(value))
        ? getKeyPath(value, `${parent ? parent + "." : ""}${key}`, paths) 
        : {...paths, [`${parent ? parent + "." : ""}${key}`]: 1}

        console.log("key", key)
        console.log("value", value)
        console.log("paths", paths)
        console.log("\n")
    })
    return paths
}

module.exports = getKeyPath