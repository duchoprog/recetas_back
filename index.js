require("dotenv").config();
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
    let prompt = `Crea una receta usando solamente ingredientes de esta LISTA:${data.lista}. Investiga cual es la forma correcta de usar el producto Maggi.  No es necesario que uses todos los ingredientes de la LISTA. Dame el resultado como si fueras una amiga, en forma casual. Rodea la palabra Maggi con los tags "<b>" y "</b>". Comienza con "Te tengo una receta deliciosa para dos personas: ". Intercala frases como "¿Te gusta?","¿OK?", "¡Muy bien!" . Menciona las cantidades necesarias para 2 porciones de esta receta.`;

    const options = {
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
      res.json(response2.choices[0].text);
    } catch (error) {
      console.log(error);
    }
  }
});
app.all("*", (req, res) => {
  res.send("acceso denegado");
});
app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
