import express, { request, response } from "express";
import { StatusCodes } from "http-status-codes";

const app = express();
const PORT = process.env.PORT || 3000;
let users = [
  { id: 1, name: "Edson Lima", age: 36 },
  { id: 2, name: "Rute Ferragem", age: 33 },
  { id: 3, name: "Heloise Lima", age: 3 },
];

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get("/", (request, response) => {
  return response.send("<h1>Trabalhando com servidor express.</h2>");
});

app.get("/users", (request, response) => {
  return response.send(users);
});

app.get("/users/:userId", (request, response) => {
  //recebe o id da rota
  const userId = request.params.userId;
  //busca um id especifico dentro de users
  const user = users.find((user) => {
    //compara se o id da rota é igual ao que exite no user
    return user.id === Number(userId);
  });
  //retorna o objeto que o ID é igual ao da rota.
  return response.send(user);
});

app.post("/users", (request, response) => {
  const newUser = request.body;
  users.push(newUser);

  return response.status(StatusCodes.CREATED).send(newUser);
});

app.put("/users/:userId", (request, response) => {
  const userId = request.params.userId;
  const updateUser = request.body;

  users = users.map((user) => {
    if (Number(userId) === user.id) return updateUser;
    return user;
  });
  return response.send(updateUser);
});

app.delete("/users/:userId", (request, response) => {
  const userId = request.params.userId;
  users = users.filter((user) => user.id !== Number(userId));

  return response.status(StatusCodes.NO_CONTENT).send();
});
