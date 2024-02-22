module.exports.addDefaultImport = function addImport(tree, mod, name) {
    tree.children.unshift({
      type: 'import',
      value: `import _${name} from '${mod}'`,
    });
    return `_${name}`;
  };