const version = require('../../../lerna.json').version

module.exports = {
  prompt: async ({ prompter, args }) => {
    let prompt
    prompt = await prompter.prompt({
      type: 'input',
      name: 'name',
      initial: args.name,
      message: `Введите название пакета`,
    })
    prompt.version = version
    return prompt
  },
}
