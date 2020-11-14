# Commands template

Time to add new commands to Aila! But, how can you do it? Here is a guide for you.

## Overview

First fo all, all the commands are managed by the `command-base.js` file and loaded by `load-commands.js` both in commands folder.

## Template

If you want to add new commands to the bot, I would like to follow a standard, to keep files sorted and avoid misunderstandings.

Here is an example of a new command:
```javascript
module.exports = {
    commands: 'newcommand',
    expectedArgs: '<in case of error, show this> <and this>',
    minArgs: 2, //default set to 0, in this case i want MIN 2 args.
    maxArgs: 2, //default set to null, is this case i want MAX 2 args.
    callback: (message, arguments, text, client, prefix, traslations) => {
        //when the command is triggered, to this.
    },
    permissions: ['ADMINISTRATOR', 'MANAGE_GUILD'], //default set to empty.
    permissionError: 'custom permission error message', //show this message instead of the default one.
    requiredRoles: [], //default set to empty.
}
```

## Parameters

Let's take a deep look of what we see above.

- `commands`:
  - Type: `String` or `Array` of `Strings`
  - Use: command alias or aliases. 
- `expectedArgs`:
  - Type: `String`
  - Use: expected arguments from user, if we have one.
- `minArgs`:
  - Type: `int`
  - Use: minimum amount of arguments user must provide.
- `maxArgs`:
  - Type: `int`
  - Use: maximum amount of arguments user can provide.
- `callback`:
  - Type: `Function`
  - Use: instructions to be performed when the command is triggered.
- `permissions`:
  - Type: `String` or `Array` of `Strings`
  - Use: required permissions to trigger the command.
- `permissionError`:
  - Type: `String`
  - Use: custom permission error message instead of the default one.
- `requiredRoles`:
  - Type: `Array` of `Strings`
  - Use: required roles to trigger the command.