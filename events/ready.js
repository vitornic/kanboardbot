/**
    * Evento ready é disparado assim que o bot é conectado ao Discord
*/

module.exports = async (client) => {

    console.log(`KanBoardBot iniciado em ${client.fetchGuildPreview.length} servidores.`)
    client.user.setActivity(`${process.env.PREFIX}help`)

}