const Discord = require('discord.js')

module.exports = {

  run: async (client, message, args) => {
    if (process.env.QUADRO == message.channel.id) {
        message.channel.send("Canal já foi definido como um quadro kanbam")
    } else {
        process.env.QUADRO = message.channel.id
        message.channel.send("Canal definido como um quadro kanbam 😉")
    }
  },

  conf: {},

  get help () {
    return {
      name: 'kbquadro',
      description: 'Define o canal atual como quadro kanbam.',
      usage: 'kbquadro',
      category: 'Util'
    }
  }
}