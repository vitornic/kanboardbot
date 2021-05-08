require('dotenv').config()

const Enmap = require('enmap')
const Discord = require('discord.js')
const client = new Discord.Client()
const { readdirSync } = require('fs')

client.startTime = Date.now()

//Carrega todos os comandos do bot
client.commands = new Enmap()
const cmdFiles = readdirSync('./commands/')
console.log('log', `Carregando o total de ${cmdFiles.length} comandos.`)

cmdFiles.forEach(f => {
    try {
      const props = require(`./commands/${f}`)
      if (f.split('.').slice(-1)[0] !== 'js') return
  
      console.log('log', `Carregando comando: ${props.help.name}`)
  
      if (props.init) props.init(client)
  
      client.commands.set(props.help.name, props)
      if (props.help.aliases) {
        props.alias = true
        props.help.aliases.forEach(alias => client.commands.set(alias, props))
      }
    } catch (e) {
      console.log(`Impossivel executar comando ${f}: ${e}`)
    }
})

//carrega todos os eventos do bot
const evtFiles = readdirSync('./events/')
console.log('log', `Carregando o total de ${evtFiles.length} eventos`)
evtFiles.forEach(f => {
  const eventName = f.split('.')[0]
  const event = require(`./events/${f}`)

  client.on(eventName, event.bind(null, client))
})

//inicia o bot
client.login(process.env.AUTH_TOKEN)