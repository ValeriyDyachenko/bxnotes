const metaCreator = require("../../metaCreator.js");

module.exports = function() {
  return metaCreator.getSectionMeta(__dirname);
};