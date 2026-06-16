module.exports = {
    name: "menu2",
    alias: ["m2"],

    async execute({ sock, m }) {
        await sock.sendMessage(
            m.chat,
            {
                text: `╭──〔 MENU 2 〕──⬣
│ .alive
│ .fb
│ .ig-dl
│ .spamfast
│ .stopspamfast
╰────────────⬣`
            },
            { quoted: m }
        );
    }
};
