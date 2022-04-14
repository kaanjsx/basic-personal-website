const express = require("express");
const Discord = require('discord.js');
const client = new Discord.Client();
const path = require("path");
const app = express();

const dataDir = path.resolve(`${process.cwd()}${path.sep}views`);

const templateDir = path.resolve(`${dataDir}${path.sep}pages${path.sep}`);

app.use("/css", express.static(path.resolve(`${dataDir}${path.sep}css`)));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

const yukle = (res, req, template, data = {}) => {
    const baseData = {
        bot: client,
        server: client.guilds.cache.get('934730561052872744').iconURL({dynamic: true}),
        path: req.path,
        users: client.guilds.cache.get('934730561052872744').memberCount,
        createdate: client.guilds.cache.get('934730561052872744').createdAt,
        name: client.guilds.cache.get('934730561052872744').name
    };
    res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
  };

app.get("/", (req, res) => {
    yukle(res, req, "index.ejs");
});

app.get("/discord", (req, res) => {
    res.redirect("https://discord.gg/KCfCMKnFzK")
});


client.login(process.env.token)


client.on('ready', () => {
app.listen(8000, () => console.log('Port Dinleniyor: 8000'));
})

module.exports = app;
