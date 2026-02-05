function status(request, response) {
  response.status(200).json({ variavelSecreta: "Eu sou top de linha" });
}

export default status;
