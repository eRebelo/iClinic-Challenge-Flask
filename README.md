iClinic Challenge Flask
==================

Serviço web que utiliza o framework flask, que através de um CEP informado, obtém os dados (logradouro, bairro, cidade, estado e CEP) coletados de um serviço
de [terceiro][1], com a possibilidade de salvá-los, e na aba Registros, consultá-los e também excluí-los.

## Serviço Online
- [iClinic Challenge Flask][2]

## Código Fonte
- [GitHub][3]

## IDE
- [PyCharm][4]

## Linguagens
- Python 2.7.12
- JavaScript (jQuery e [Knockout][5])
- HTML
- CSS

## API
- [Google App Engine][6]

## Download
- [SDK App Engine][7]

## Logs
- Todos os logs registrados e encontrados acessando o console do projeto em [Google Cloud Platform][8] no opção Logging

## Front-End
- Presente dentro dos diretórios /static e /templates

## Back-End
- Fluxo do projeto listados abaixo pelos arquivos:
    - main.py : definição das páginas e suas urls, seus eventos e funções
    - logics.py : lógica do sistema, que faz a comunicação com o banco de dados (NoSQL) e suas operações
    - models.py : definição das variáveis e seus tipos, que serão armazenadas no banco de dados

## Execução
- Localhost: abrir o projeto pelo Google App Engine Launcher instalado, e executá-lo
    - dev_appserver.py .
        - http://localhost:8080/
        - http://localhost:8000/

- Servidor:
    - appengine appcfg.py update .
        - http://iclinic-challenge-flask.appspot.com/

[1]: http://postmon.com.br/
[2]: http://iclinic-challenge-flask.appspot.com/
[3]: https://github.com/eRebelo/iClinic-Challenge
[4]: https://www.jetbrains.com/pycharm/
[5]: http://knockoutjs.com/
[6]: https://cloud.google.com/appengine/docs/python/
[7]: https://cloud.google.com/appengine/docs/python/download
[8]: https://console.cloud.google.com/