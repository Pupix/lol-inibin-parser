# lol-inibin-parser
A parser for .inibin files from League of Legends.

## Download
lol-inibin-parser is installable via:

- [GitHub](https://github.com/Pupix/lol-inibin-parser) `git clone https://github.com/Pupix/lol-inibin-parser.git`
- [npm](https://www.npmjs.com/): `npm install lol-inibin-parser`

## Usage example

```js
var InibinParser = require('lol-inibin-parser'),
    inibin = new InibinParser();
    
    // Read the package.json file
    inibin.read('Kindred.inibin', function (err, data) {
        console.log(data);
        //  {
        //      "Info": {
        //          "IconCircle": "Kindred_Circle.dds",
        //          "IconSquare": "Kindred_Square.dds"
        //      },
        //      "Data: {
        //          "SelectionHeight": 155,
        //          "Name": "game_character_displayname_Kindred",
        //          "BaseHP": 540,
        //          "BaseMP":300
        //          ...
        //      }
        //      ...
        //  }
    });

```

## Available methods

**N.B:** All methods act as promises if no callback is passed.

### parse(path, cb)

It will roughly parse a .inibin file from the given path.

**Parameters**

1. **path {string}** A path to where the file to parse resides.
2. **[cb] {Function}** A callback called with `(error, parsedData)` as arguments.

### read(path, cb)

It will read a .inibin file from the given path, leaving only the relevant data of the skeleton model.

**Parameters**

1. **path {string}** A path to where the file to read resides.
2. **[cb] {Function}** A callback called with `(error, readData)` as arguments.

