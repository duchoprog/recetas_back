require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

const API_KEY = process.env.OPENAI_API_KEY;

app.post("/openai-api", async (req, res) => {
  const data = req.body;
  console.log(data);
  if (data.lista) {
    let prompt = `Eres un chef. Crea una receta usando solamente ingredientes de esta LISTA:${data.lista}.   Dame el resultado como si fueras una amiga, en forma casual, pero no sabes si yo soy hombre o mujer, asi que evita decirme "amigo" o "amiga".Empieza con "¡Aquí vamos!.No numeres los pasos. Puedes agregar alguna broma ligera. Rodea la palabra Maggi con los tags "<b>" y "</b>". Comienza con "Te propongo esta deliciosa receta para dos personas: ". Intercala una frase de estas "¿Te gusta?","¿OK?", "¡Muy bien!" . Menciona las cantidades necesarias para 2 porciones de esta receta.`;

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0.1,
      max_tokens: 800,
      messages: [{ role: "user", content: prompt }],
    });

    console.log(completion.data.choices[0].message.content);
    res.json({
      completion: completion.data.choices[0].message.content,
    });

    /*  const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.1,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    };
    try {
      const response = await fetch(
        "https://api.openai.com/v1/completions",
        options
      );
      const response2 = await response.json();
      console.log(response2);
      //res.json(response2.choices[0].text);
    } catch (error) {
      console.log(error);
    } */
  }
});
app.all("*", (req, res) => {
  res.send("acceso denegado");
});
app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});

/* const completionPromise = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  temperature: 0.3,
  max_tokens: 500,
  messages: [{ role: "user", content: prePrompt }],
}); */
