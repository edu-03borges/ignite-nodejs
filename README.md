# Sistema de Gestão para uma Alocadora de Carros
    - Cliente se Direciona ao Sistema e realiza o login e logo verifica os Carros Disponíveis para a Alocação
    - Sistema Cuida de Todo o Processo até a Devolução do Carro
    
-------------------------------------------------
# Requisitos
    - Windows
    - NodeJs
    - NPM
    - Docker
    - Git
-------------------------------------------------

# Tecnologias Utilizadas

**Typescript**
**SQL**
**ORM**
**JWT**
**JSON**
**JEST**
**HTTP**

# Gerência de Requisitos
     - Requitos Funcionais
     - Requisitos não Funcionais
     - Regras de Negócio
 
# Cadastro de carro

**RF**
    - Deve ser possível cadastrar um novo carro;

**RN**
    - Não deve ser possível cadastrar um carro com uma plca já existente;
    - O carro deve ser cadastrado, por padrão, com disponibilidade;
    - O usuário responsável pelo cadastro deve ser um usuário administrador;

# Listagem de carros

**RF**
    - Deve ser possível listar os todos os carros disponíveis;
    - Deve ser posível listar todos carros disponíveis pelo nome da categoria;
    - Deve ser posível listar todos carros disponíveis pelo nome da marca;
        - Deve ser posível listar todos carros disponíveis pelo nome do carro;

**RN**
 - O usuário não precisa estar logado no sistema;


# Cadastro de Especificação no carro

**RF**
    - Deve ser possível cadastrar uma especificação para um carro;

**RN**
    - Não deve ser possível cadastrar uma especificação para um carro não cadastrado;
    - Não deve ser possível cadastrar uma especificação já existente para o mesmo carro;   
    - O usuário responsável pelo cadastro deve ser um usuário administrador;

# Cadastro de imagens dos carros

**RF**
    - Deve ser possível cadastrar a imagem do carro;
    
**RNF**
    - Utilizar o multer para upload de arquivos;

**RN**
    - O usuário deve poder cadastrar mais de uma imagem para o mesmo carro;
    - O usuário responsável pelo cadastro deve ser um usuário administrador;

# Aluguel de carros

**RF**
    - Deve ser possível cadastrar um Aluguel;

**RNF**

**RN**
    - O aluguel deve ter duração mínima de 24 hora;
    - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário;
    - Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro;
    - O usuário deve estar logado na aplicação;
    - Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível;

# Devolução do carro

**RF**
    - Deve ser possível realizar a devolução de um carro;

**RN**
    - Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa;
    - Ao realizar a devolução, o carro deverá ser liberado para outro aluguel;
    - Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel;
    - Ao realizar a devolução, deverá ser calculado o total do aluguel;
    - Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional
    aos dias de atrado;
    - Caso haja multa, deverá ser somado ao total do aluguel;
    - O usuário não precisa estar logado no sistema;

# Listagem de Alugueis para usuário

**RF**
    - Deve ser possível realizar a busca de todos os alugueis para o usuário;

**RN**
    - O usuário deve estar logado na aplicação;

# Recuperar Senha

**RF**
    - Deve ser possível o usuário recuperar a senha informando o e-mail;
    - O ususário deve receber um e-mail com o passo a passo para a recuperação da senha;
    - O usuário deve conseguir inserir uma nova senha;

**RN**
    - O usuário precisa informar um nova senha o usuário;
    - O link enviado para a recuperação deve expirar em 3 horas;
