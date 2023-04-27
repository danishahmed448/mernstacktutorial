const chalk = require('chalk');

const errorHighlighter = (error)=>{
    console.log(chalk.bold.red('[error]'),chalk.yellow(error.message));
}

const successHighlighter = (item,message)=>{
    console.log(chalk.bold.green(item),chalk.green(message))
}

module.exports = {errorHighlighter,successHighlighter}