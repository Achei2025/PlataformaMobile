# My App

## Descrição
Este é um aplicativo desenvolvido com [Expo](https://expo.dev/) para facilitar o desenvolvimento e a distribuição de aplicações React Native.

## Tecnologias Utilizadas
- [Expo](https://expo.dev/)
- React Native
- Expo Router
- Expo Splash Screen

## Configuração do Projeto
### Requisitos
Certifique-se de ter os seguintes itens instalados:
- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Instalação
1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/my-app.git
   ```
2. Acesse o diretório do projeto:
   ```sh
   cd my-app
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```

### Executando o Aplicativo
Para rodar o app no modo de desenvolvimento:
```sh
npx expo start
```
Isso abrirá o Expo Developer Tools no navegador, permitindo que você execute o app em um emulador ou dispositivo físico.

## Estrutura do Projeto
```
my-app/
│-- assets/            # Recursos do aplicativo (icons, imagens, etc.)
│-- node_modules/      # Dependências do projeto
│-- src/              # Código-fonte principal
│-- app.json          # Configurações do Expo
│-- package.json      # Dependências e scripts
│-- README.md         # Documentação do projeto
```

## Configuração Específica
### iOS
- O aplicativo suporta **modo retrato**.
- Habilita suporte para **iPad**.

### Android
- Usa um **adaptive icon** com imagem em primeiro plano e fundo branco.

### Web
- Usa o **Metro bundler** para empacotamento.
- Saída configurada para **estático**.

## Plugins
O projeto utiliza os seguintes plugins:
- `expo-router` para navegação baseada em arquivos
- `expo-splash-screen` para uma tela de carregamento personalizada

## Experimentos Ativados
- **Typed Routes**: Habilita suporte a rotas tipadas no Expo Router.

## Contribuição
Se quiser contribuir com o projeto, siga os passos:
1. Fork o repositório.
2. Crie um branch para sua feature (`git checkout -b minha-feature`).
3. Faça o commit (`git commit -m 'Minha nova feature'`).
4. Faça push para o branch (`git push origin minha-feature`).
5. Abra um Pull Request.

