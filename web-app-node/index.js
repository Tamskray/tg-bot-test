const TelegramBot = require("node-telegram-bot-api");
const Jimp = require("jimp");
const axios = require("axios");
const fs = require("fs");
const { pipeline } = require("stream/promises");
const { token } = require("./token.json");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const expenseRouter = require("./routes/ExpenseRouter.js");

const app = express();
app.use(express.static("public"));

const PORT = 3000;

app.use(cors());

app.use(bodyParser.json());

app.use("/api", expenseRouter);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

///////////

const bot = new TelegramBot(token, { polling: true });
process.env.NTBA_FIX_350 = true;

const downloadFile = async (filePath) => {
  const fileUrl = `https://api.telegram.org/file/bot${token}/${filePath}`;

  const response = await axios({
    url: fileUrl,
    method: "GET",
    responseType: "stream",
  });

  const fileId = filePath.split("/").pop(); // Extracting the file name from the path

  const writer = fs.createWriteStream(fileId);

  await pipeline(response.data, writer);

  return fileId;
};

const textOverlay = async (imagePath) => {
  const image = await Jimp.read(imagePath);
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
  const text = "Some text";
  const textWidth = Jimp.measureText(font, text);
  const x = (image.bitmap.width - textWidth) / 2;
  const y = 50;

  image.print(font, x, y, text);
  await image.writeAsync(imagePath);
};

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendMessage(chatId, `Below will appear button + ${text}`, {
      reply_markup: {
        keyboard: [
          [
            { text: "1", callback_data: "1" },
            { text: "2", callback_data: "2" },
            { text: "3", callback_data: "3" },
          ],
          [
            { text: "4", callback_data: "4" },
            { text: "5", callback_data: "5" },
            { text: "6", callback_data: "6" },
          ],
        ],
      },
    });

    await bot.sendMessage(chatId, "Below will appear buttons", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Inline button",
              web_app: {
                url: "https://7309-188-163-18-94.ngrok-free.app",
              },
            },
          ],
        ],
      },
    });
  }

  if (msg.photo) {
    try {
      await bot.sendMessage(chatId, "Received photo");

      const fileId = msg.photo[msg.photo.length - 1].file_id;
      const file = await bot.getFile(fileId);

      const downloadedImage = await downloadFile(file.file_path);

      await textOverlay(`${downloadedImage}`);

      await bot.sendPhoto(chatId, downloadedImage);

      fs.unlinkSync(downloadedImage);
    } catch (error) {
      await bot.sendMessage(
        chatId,
        `An error occurred while processing your photo. + ${error.message}`
      );
    }
  }

  bot.sendMessage(chatId, "Received your message");
});

// bot.on("callback_query", async (msg) => {
//   const data = msg.data;
//   console.log(msg);
//   const chatId = msg.message.chat.id;

//   bot.sendMessage(chatId, `You choose a number ${data}`);
// });
