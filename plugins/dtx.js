const activeTxt = new Map();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
    name: "dtx",
    alias: ["dtxspam"],

    async execute({ from, args, send }) {

        let dtxDelay = 100;
        let dtxText = "";

        if (args.length) {
            const match = args[args.length - 1]
                .toLowerCase()
                .match(/^(\d+)(ms|s)?$/);

            if (match) {
                dtxDelay = match[2] === "s"
                    ? parseInt(match[1]) * 1000
                    : parseInt(match[1]);

                args.pop();
            }

            dtxText = args.join(" ");
        }

        if (!dtxText) {
            return await send(
                from,
                "❌ Usage: .dtx <text> [delay]\n\nExample:\n.dtx Hello 500ms\n.dtx Hi 2s"
            );
        }

        const dtxId = `${from}_dtx`;

        if (activeTxt.has(dtxId)) {
            return await send(from, "⚠️ DTX spam already running!");
        }

        activeTxt.set(dtxId, true);

        (async () => {
            while (activeTxt.has(dtxId)) {
                try {
                    await send(from, dtxText);
                    await delay(dtxDelay);
                } catch (err) {
                    activeTxt.delete(dtxId);
                    console.log(err);
                }
            }
        })();

        await send(
            from,
            `⚙️ DTX SPAM ACTIVE!\n\n📝 Text: ${dtxText}\n⏱️ Delay: ${dtxDelay}ms\n\n🛑 Stop: .stopdtx`
        );
    }
};
