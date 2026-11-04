# 🎓 Sistema de Cálculo de Média Escolar (FATEC)

Este projeto consiste em uma aplicação Web desenvolvida em **Node.js puro** (sem o uso de frameworks externos como Express) integrada com o gerenciador de pacotes **NPM**. A aplicação foi projetada para receber notas acadêmicas diretamente pela URL utilizando Query Strings, realizar o cálculo da média aritmética tradicional e renderizar dinamicamente o status final do estudante.

Este repositório cumpre integralmente os requisitos solicitados na atividade da disciplina de **Desenvolvimento Web III**.

## 🛠️ Tecnologias Utilizadas

- **Back-end:** Node.js (Módulos nativos `http`, `path`, `fs` e `url`)
- **Front-end:** HTML5 semântico e CSS3 customizado
- **Padrão de Módulos:** ES Modules (`import/export` nativos)

---

## 📐 Regras de Negócio Implementadas

1. **Cálculo da Média:** 
   \[\text{MÉDIA} = \frac{P1 + P2}{2}\]
2. **Critério de Corte:**
   - Se \(\text{MÉDIA} \ge 6.0 \rightarrow\) **APROVADO** (Renderiza a página `public/aprovado.html`)
   - Se \(\text{MÉDIA} < 6.0 \rightarrow\) **REPROVADO** (Renderiza a página `public/reprovado.html`)

---

## ⚙️ Instalação e Execução

### Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org) instalado em sua máquina.

### Passo a Passo

1. **Clone o repositório** para a sua máquina local:
   ```bash
   git clone https://github.com
   ```
2. Acesse a pasta raiz do projeto pelo terminal:
   ```bash
   cd NOME_DO_REPOSITORIO
   ```
3. Como o projeto utiliza estritamente os módulos nativos do ecossistema do Node.js, **não há necessidade de baixar pacotes externos (node_modules)**.
4. Inicialize o servidor através do script configurado no NPM:
   ```bash
   npm start
   ```
5. O terminal exibirá a confirmação de que o servidor está ativo:
   ```text
   Servidor iniciado em http://localhost:3000/
   ```

---

## 🌐 Como Testar e Parâmetros da URL

A aplicação responde no endpoint `/media`. Você deve passar os valores correspondentes de notas e nome do aluno diretamente na barra de endereços do seu navegador.

### Exemplo de Uso Padrão (Estudante Aprovado)
- **URL:** `http://localhost:3000/media?p1=7.5&p2=5.0&nome=Pedro`
- **Comportamento esperado:** A média resultará em `6.3` e o sistema abrirá o arquivo `aprovado.html`, exibindo os dados personalizados.

### Exemplo de Uso (Estudante Reprovado)
- **URL:** `http://localhost:3000/media?p1=4.0&p2=5.5&nome=Lucas`
- **Comportamento esperado:** A média resultará em `4.8` e o sistema abrirá o arquivo `reprovado.html`.

---

## 🛡️ Tratamento de Erros e Validações

O sistema conta com mecanismos de segurança básicos estruturados no back-end para evitar quebras no servidor:
- **Notas Inválidas ou Ausentes:** Caso as chaves `p1` ou `p2` não sejam enviadas, possuam textos em vez de números, ou números fora do intervalo escolar padrão (menores que `0.0` ou maiores que `10.0`), a aplicação retorna o status `400 Bad Request` com instruções claras de correção.
- **Páginas Inexistentes (Erro 404):** Tentativas de acessar rotas que não existem (ex: `/contato`) ou carregar arquivos estáticos corrompidos disparam o carregamento automático da página personalizada `erro404.html`.

---

## 📁 Estrutura de Arquivos do Projeto

```text
├── package.json         # Manifesto do projeto NPM e script start
├── app.js               # Código do servidor HTTP nativo e lógica de rotas
└── public/              # Diretório público de arquivos estáticos
    ├── index.html       # Página inicial com instruções de uso do sistema
    ├── aprovado.html    # Template carregado em caso de sucesso (Média >= 6)
    ├── reprovado.html   # Template carregado em caso de insucesso (Média < 6)
    ├── erro404.html     # Página de erro para caminhos não localizados
    └── style.css        # Estilização visual unificada das páginas
```

