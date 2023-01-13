// eslint-disable-next-line @typescript-eslint/no-var-requires
const { NlpManager } = require('node-nlp');
import { Whatsapp, create } from 'venom-bot';

const manager = new NlpManager({ languages: ['pt'], forceNER: true });
// Adds the utterances and intents for the NLP
manager.addDocument('pt', 'tchau', 'saudacoes.tchau');
manager.addDocument('pt', 'tchau se cuide', 'saudacoes.tchau');
manager.addDocument('pt', 'tchau tchau', 'saudacoes.tchau');
manager.addDocument('pt', 'tchau tchau se cuide', 'saudacoes.tchau');
manager.addDocument('pt', 'goodbye', 'saudacoes.tchau');
manager.addDocument('pt', 'bye', 'saudacoes.tchau');
manager.addDocument('pt', 'bye se cuide', 'saudacoes.tchau');
manager.addDocument('pt', 'bye bye', 'saudacoes.tchau');
manager.addDocument('pt', 'bye bye se cuide', 'saudacoes.tchau');
manager.addDocument('pt', 'ok vejo você mais tarde', 'saudacoes.tchau');
manager.addDocument('pt', 'okay vejo você mais tarde', 'saudacoes.tchau');
manager.addDocument('pt', 'devo ir', 'saudacoes.tchau');
manager.addDocument('pt', 'olá', 'saudacoes.ola');
manager.addDocument('pt', 'oi', 'saudacoes.ola');
manager.addDocument('pt', 'hello', 'saudacoes.ola');
manager.addDocument('pt', 'bom dia', 'saudacoes.ola');
manager.addDocument('pt', 'boa tarde', 'saudacoes.ola');
manager.addDocument('pt', 'boa noite', 'saudacoes.ola');
manager.addDocument('pt', 'tudo bem', 'saudacoes.ola');
manager.addDocument('pt', 'qual o endereco', 'localizacao.endereco');
manager.addDocument('pt', 'tem alguma referencia', 'localizacao.referencia');
manager.addDocument('pt', 'qual a cidade', 'localizacao.cidade');
manager.addDocument('pt', 'qual o estado', 'localizacao.estado');
manager.addDocument('pt', 'qual o pais', 'localizacao.pais');

// Train also the NLG
manager.addAnswer('pt', 'saudacoes.tchau', 'Até mais');
manager.addAnswer('pt', 'saudacoes.tchau', 'Vejo você depois!');
manager.addAnswer('pt', 'saudacoes.ola', 'Olá! Sou um bot virtual, tudo bem?');
manager.addAnswer('pt', 'saudacoes.ola', 'Saudações!');
manager.addAnswer('pt', 'saudacoes.ola', 'Bom dia!');
manager.addAnswer('pt', 'saudacoes.ola', 'Boa Tarde!');
manager.addAnswer('pt', 'saudacoes.ola', 'Boa Noite!');
manager.addAnswer('pt', 'localizacao.endereco', 'Estamos localizado na rua 1!');
manager.addAnswer('pt', 'localizacao.endereco', 'Estamos localizado na rua x!');
manager.addAnswer('pt', 'localizacao.referencia', 'Referencia proximo à esquina 1!');
manager.addAnswer('pt', 'localizacao.referencia', 'Referencia proximo à esquina x!');
manager.addAnswer('pt', 'localizacao.cidade', 'Cidade 1!');
manager.addAnswer('pt', 'localizacao.estado', 'Estado 1!');
manager.addAnswer('pt', 'localizacao.pais', 'Pais 1!');

// Train and save the model.
(async() => {
  await manager.train();
  manager.save();

  create({
    session: 'session-name', //name of session
    multidevice: true // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((err) => {
    console.log(err);
  });

  function start(client: Whatsapp) {
    client.onMessage(async (message) => {
      if (message.isGroupMsg === false) {

        const response = await manager.process('pt', message.body.toLowerCase());
        console.log(response);
        if (response.intent === 'None') {
          console.log('passou');
          client
            .sendText(message.from, 'Eu ainda estou aprendendo');
        } else
          client
            .sendText(message.from, response.answer);
        // client
        //   .sendText(message.from, response.answer)
        //   .then((result) => {
        //     console.log('Result: ', result); //return object success
        //   })
        //   .catch((err) => {
        //     console.error('Error when sending: ', err); //return object error
        //   });
      }
    });
  }
})();

