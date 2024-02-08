Explique como você lidaria com erros na API, incluindo o uso de códigos de status HTTP
apropriados e mensagens de erro significativas.
-
Eu criaria uma class de error generica ou uma para cada tipo por exemplo(ValidacaoException,NotFoundException e etc).
Patindo do presuposto que criei uma generica ficaria dessa forma:
class AppError {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
module.exports = AppError;

Onde caso nao passe o status code do erro ele seria uma badRequest por default, é importante se atentar de retornar o codigo correto para cada tipo de erros,
por exemplo 404 Not Found,401 Unauthorized,403 Forbidden,500 Internal Server Error e etc dependendo do caso.

Liste pelo menos três bibliotecas Node.js que você consideraria úteis ao criar uma API
RESTful com autenƟcação JWT e explique por que você escolheria cada uma delas.
-

Express.js: O Express.js é um framework web para Node.js que simplifica o desenvolvimento de aplicativos web e APIs RESTful. Ele fornece um conjunto robusto de recursos
para lidar com roteamento, middleware e solicitações HTTP, o que é essencial ao criar uma API. Com o Express, você pode facilmente definir rotas para suas APIs, tratar solicitações e respostas, e integrar middleware para tarefas como autenticação JWT.

jsonwebtoken: O jsonwebtoken é uma biblioteca para criar e verificar tokens JWT em Node.js. Com esta biblioteca, você pode gerar tokens JWT para autenticação e autorização em suas APIs, 
bem como verificar tokens recebidos para garantir que sejam válidos e seguros. Ele fornece métodos simples para assinar e verificar tokens, permitindo que você implemente facilmente a autenticação JWT em sua API.

bcrypt.js: O bcrypt.js é uma implementação do algoritmo de hash bcrypt para Node.js. Ele é especialmente útil ao lidar com a segurança de senhas em sua aplicação. 
Ao criar uma API com autenticação de usuário, é fundamental armazenar senhas de forma segura. O bcrypt.js facilita o hash e a verificação de senhas, protegendo-as contra ataques de força bruta e ataques de dicionário.

Essas bibliotecas são opções populares e muito utilizadas pela comunidade porque tem alta confiabilidade e suporte ativo pela comunidade de desenvolvedores. Então sabemos que quando usarmos essas bibliotecas nós teremos o respaldo 
de atualizações e elas não vai ser descontinuadas.
