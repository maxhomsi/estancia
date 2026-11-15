/*
  Perguntas e respostas do chat da Paladar da Estância.

  Para editar:
  - "pergunta" é o texto do botão que o visitante clica.
  - "resposta" aceita HTML simples (<strong>, <a>, <br>, listas).
  - "palavras" são os termos que ligam o que o visitante digita a essa resposta.
    Escreva sem acento e em minúsculas.
  - "relacionadas" são os ids de outras perguntas sugeridas depois da resposta.

  Fontes: site atual (paladardaestancia.com) e rótulo do vidro.
  Nada aqui informa preço, frete ou contato, porque essas informações
  ainda não foram publicadas pela empresa. Quando existirem, preencha "contato".
*/
window.PALADAR_CHAT = {
  nome: "Assistente Paladar",
  saudacao: "Olá! Sou o assistente da Paladar da Estância. Escolha um assunto abaixo ou escreva a sua dúvida.",

  // Preencha quando a empresa tiver os canais. Ex.: whatsapp: "5551999999999"
  contato: {
    whatsapp: "",
    email: "",
    instagram: ""
  },

  assuntos: [
    { id: "produto", titulo: "O produto" },
    { id: "ingredientes", titulo: "Ingredientes e alergias" },
    { id: "nutricao", titulo: "Informação nutricional" },
    { id: "conservacao", titulo: "Validade e conservação" },
    { id: "compra", titulo: "Onde comprar" },
    { id: "empresa", titulo: "A empresa" }
  ],

  perguntas: [
    /* ---------- O produto ---------- */
    {
      id: "o-que-e", assunto: "produto",
      pergunta: "O que é o produto?",
      resposta: "É um <strong>molho pronto para consumo à base de carne</strong>: carne bovina desfiada, com sabor de comida feita em casa e <strong>sem conservantes</strong>. É só aquecer e servir.",
      palavras: ["o que e", "produto", "que vende", "o que voces fazem", "molho", "carne desfiada", "o que tem", "vendem"],
      relacionadas: ["ingredientes", "como-preparar", "peso"]
    },
    {
      id: "peso", assunto: "produto",
      pergunta: "Qual o tamanho do vidro?",
      resposta: "Cada vidro tem <strong>350 g de peso líquido</strong>. O rótulo considera o vidro inteiro como 1 porção.",
      palavras: ["peso", "gramas", "320", "350", "tamanho", "quantidade", "quanto vem", "rende", "porcao", "porcoes", "pote", "vidro", "serve quantas pessoas"],
      relacionadas: ["calorias", "o-que-e"]
    },
    {
      id: "como-preparar", assunto: "produto",
      pergunta: "Como preparo?",
      resposta: "O molho já vem <strong>pronto para consumo</strong>: é só aquecer e servir. Uma dica: transfira o conteúdo para uma panela ou para um recipiente próprio para micro-ondas antes de aquecer.",
      palavras: ["preparo", "preparar", "aquecer", "esquentar", "micro-ondas", "microondas", "panela", "cozinhar", "como faco", "como usar", "pronto", "frio", "comer direto"],
      relacionadas: ["como-servir", "depois-de-aberto"]
    },
    {
      id: "como-servir", assunto: "produto",
      pergunta: "Com o que combina?",
      resposta: "Combina com o que você já tem em casa: arroz, purê, massa, polenta, pão, tapioca ou recheio de wrap e sanduíche. Na <a href=\"receitas.html\">página de receitas</a> tem seis pratos com passo a passo.",
      palavras: ["combina", "servir", "acompanhamento", "acompanha", "ideia", "ideias", "sugestao", "como servir", "arroz", "massa", "pao"],
      relacionadas: ["receitas", "como-preparar"]
    },
    {
      id: "carne", assunto: "produto",
      pergunta: "Qual carne é usada?",
      resposta: "A carne é <strong>bovina, corte acém</strong>, desfiada.",
      palavras: ["qual carne", "qual a carne", "que carne", "carne usada", "corte", "acem", "boi", "bovina", "frango", "porco", "tipo de carne"],
      relacionadas: ["ingredientes", "o-que-e"]
    },
    {
      id: "sabores", assunto: "produto",
      pergunta: "Tem outros sabores?",
      resposta: "No momento, o produto é a <strong>Carne Bovina Desfiada Tradicional</strong>.",
      palavras: ["sabores", "sabor", "versoes", "versao", "outros", "opcoes", "linha", "tradicional", "picante", "apimentada"],
      relacionadas: ["o-que-e", "ingredientes"]
    },
    {
      id: "para-quem", assunto: "produto",
      pergunta: "Para quem é indicado?",
      resposta: "Para quem tem pouco tempo para cozinhar, mas não abre mão de comida com cara de casa: profissionais com rotina corrida, famílias e casais, e clientes de empórios e lojas gourmet que valorizam qualidade.",
      palavras: ["para quem", "indicado", "publico", "familia", "rotina", "trabalho"],
      relacionadas: ["o-que-e", "onde-comprar"]
    },

    /* ---------- Ingredientes e alergias ---------- */
    {
      id: "ingredientes", assunto: "ingredientes",
      pergunta: "Quais são os ingredientes?",
      resposta: "Segundo o rótulo: <strong>carne bovina (acém), cebola, tomate, alho, sal, vinagre e óleo vegetal</strong>.",
      palavras: ["ingredientes", "ingrediente", "composicao", "o que vai", "feito de", "feito com", "do que e feito", "e feito de que", "leva o que", "contem"],
      relacionadas: ["gluten", "conservantes", "lactose"]
    },
    {
      id: "gluten", assunto: "ingredientes",
      pergunta: "Tem glúten?",
      resposta: "<strong>Não contém glúten</strong>, conforme o rótulo.",
      palavras: ["gluten", "celiaco", "celiaca", "celiacos", "trigo"],
      relacionadas: ["lactose", "ingredientes"]
    },
    {
      id: "conservantes", assunto: "ingredientes",
      pergunta: "Tem conservantes?",
      resposta: "<strong>Não.</strong> O molho é feito sem conservantes e sem aditivos artificiais.",
      palavras: ["conservante", "conservantes", "aditivo", "aditivos", "quimico", "natural", "artificial", "corante"],
      relacionadas: ["validade", "ingredientes"]
    },
    {
      id: "lactose", assunto: "ingredientes",
      pergunta: "Tem leite ou lactose?",
      resposta: "Leite e derivados <strong>não aparecem na lista de ingredientes</strong> do rótulo (carne bovina, cebola, tomate, alho, sal, vinagre e óleo vegetal). Se você tem alergia alimentar, confira sempre o rótulo do vidro antes de consumir.",
      palavras: ["lactose", "leite", "derivados", "laticinio", "alergia", "alergico", "alergica", "alergenicos", "intolerancia", "ovo", "soja", "amendoim"],
      relacionadas: ["gluten", "ingredientes"]
    },
    {
      id: "acucar", assunto: "ingredientes",
      pergunta: "Tem açúcar?",
      resposta: "<strong>Não tem açúcar adicionado</strong> (0 g). O rótulo indica 1,5 g de açúcares totais a cada 100 g.",
      palavras: ["acucar", "acucares", "doce", "diabetes", "diabetico", "low carb", "carboidrato"],
      relacionadas: ["tabela", "calorias"]
    },
    {
      id: "pimenta", assunto: "ingredientes",
      pergunta: "É apimentado?",
      resposta: "Pimenta <strong>não aparece na lista de ingredientes</strong>. Os temperos do rótulo são cebola, alho, sal e vinagre.",
      palavras: ["pimenta", "apimentado", "ardido", "picante", "crianca", "criancas", "tempero", "temperado"],
      relacionadas: ["ingredientes", "sabores"]
    },
    {
      id: "vegetariano", assunto: "ingredientes",
      pergunta: "Tem opção vegetariana?",
      resposta: "Ainda não. O produto é feito com <strong>carne bovina</strong>, então não é vegetariano nem vegano.",
      palavras: ["vegetariano", "vegetariana", "vegano", "vegana", "sem carne", "plant based"],
      relacionadas: ["sabores", "ingredientes"]
    },

    /* ---------- Informação nutricional ---------- */
    {
      id: "calorias", assunto: "nutricao",
      pergunta: "Quantas calorias tem?",
      resposta: "<strong>180 kcal a cada 100 g</strong>. O vidro inteiro (350 g) tem <strong>630 kcal</strong>, 32% dos valores diários de referência.",
      palavras: ["caloria", "calorias", "kcal", "energetico", "engorda", "dieta"],
      relacionadas: ["proteina", "tabela"]
    },
    {
      id: "proteina", assunto: "nutricao",
      pergunta: "Quanta proteína tem?",
      resposta: "<strong>20 g de proteína a cada 100 g</strong>. O vidro inteiro (350 g) tem <strong>70 g</strong>.",
      palavras: ["proteina", "proteinas", "academia", "treino", "fit", "musculo", "hipertrofia"],
      relacionadas: ["calorias", "tabela"]
    },
    {
      id: "sodio", assunto: "nutricao",
      pergunta: "Quanto sódio tem?",
      resposta: "<strong>615 mg de sódio a cada 100 g</strong>. O vidro inteiro (350 g) tem 2.149 mg, 107% dos valores diários de referência.",
      palavras: ["sodio", "sal", "salgado", "pressao", "hipertensao"],
      relacionadas: ["tabela", "gorduras"]
    },
    {
      id: "gorduras", assunto: "nutricao",
      pergunta: "Quanta gordura tem?",
      resposta: "A cada 100 g: <strong>8 g de gorduras totais</strong>, das quais 3 g são saturadas e 0 g trans. No vidro inteiro (350 g): 28 g totais, 10,5 g saturadas e 0,7 g trans.",
      palavras: ["gordura", "gorduras", "saturada", "trans", "colesterol", "oleo"],
      relacionadas: ["tabela", "calorias"]
    },
    {
      id: "tabela", assunto: "nutricao",
      pergunta: "Ver a tabela completa",
      resposta: "Porção: 350 g (1 vidro). Valores a cada 100 g / no vidro / %VD:<ul><li>Valor energético: 180 kcal / 630 kcal / 32%</li><li>Carboidratos: 3,0 g / 10,5 g / 4%</li><li>Açúcares totais: 1,5 g / 5,3 g</li><li>Açúcares adicionados: 0 g / 0 g / 0%</li><li>Proteínas: 20,0 g / 70 g / 140%</li><li>Gorduras totais: 8,0 g / 28,0 g / 43%</li><li>Gorduras saturadas: 3,0 g / 10,5 g / 53%</li><li>Gorduras trans: 0 g / 0,7 g / 33%</li><li>Fibra alimentar: 0,5 g / 1,8 g / 7%</li><li>Sódio: 615 mg / 2.149 mg / 107%</li></ul>Valores diários com base em uma dieta de 2.000 kcal. A tabela também está na seção <a href=\"index.html#rotulo\">No rótulo</a>.",
      palavras: ["tabela", "nutricional", "nutricao", "nutrientes", "valores", "carboidrato", "fibra", "fibras", "macros"],
      relacionadas: ["calorias", "proteina"]
    },

    /* ---------- Validade e conservação ---------- */
    {
      id: "validade", assunto: "conservacao",
      pergunta: "Qual a validade?",
      resposta: "A validade é de <strong>90 dias</strong>. A empresa está fazendo testes para chegar a 180 e 360 dias.",
      palavras: ["validade", "vence", "vencimento", "dura quanto", "quanto tempo dura", "prazo", "shelf life", "estraga"],
      relacionadas: ["guardar-fechado", "depois-de-aberto"]
    },
    {
      id: "guardar-fechado", assunto: "conservacao",
      pergunta: "Como guardo o vidro fechado?",
      resposta: "Mantenha em <strong>local fresco, seco e ao abrigo da luz</strong>, como indica o rótulo.",
      palavras: ["guardar", "armazenar", "fechado", "lacrado", "armario", "despensa", "temperatura ambiente", "precisa de geladeira", "conservar"],
      relacionadas: ["depois-de-aberto", "validade"]
    },
    {
      id: "depois-de-aberto", assunto: "conservacao",
      pergunta: "E depois de aberto?",
      resposta: "Depois de aberto, guarde <strong>na geladeira</strong> e consuma em <strong>até 5 dias</strong>.",
      palavras: ["aberto", "abri", "abrir", "depois de aberto", "apos aberto", "depois de abrir", "sobrou", "sobra", "geladeira", "refrigerar", "quantos dias"],
      relacionadas: ["congelar", "guardar-fechado"]
    },
    {
      id: "congelar", assunto: "conservacao",
      pergunta: "Posso congelar?",
      resposta: "O rótulo <strong>não traz orientação sobre congelamento</strong>. O que ele indica é: fechado, em local fresco, seco e ao abrigo da luz; depois de aberto, na geladeira e consumido em até 5 dias.",
      palavras: ["congelar", "congelado", "freezer", "congelamento", "descongelar"],
      relacionadas: ["depois-de-aberto", "validade"]
    },

    /* ---------- Onde comprar ---------- */
    {
      id: "onde-comprar", assunto: "compra",
      pergunta: "Onde encontro?",
      resposta: "O molho é vendido em <strong>empórios, mercados e lojas gourmet</strong>, e também em vendas diretas. A lista de pontos de venda ainda não foi publicada no site.",
      palavras: ["onde compro", "onde comprar", "onde encontro", "onde acho", "onde vende", "comprar", "mercado", "emporio", "loja", "ponto de venda", "pontos de venda", "supermercado"],
      relacionadas: ["preco", "entrega", "revender"]
    },
    {
      id: "preco", assunto: "compra",
      pergunta: "Quanto custa?",
      resposta: "Os preços ainda não estão publicados no site.",
      palavras: ["preco", "precos", "quanto custa", "valor", "custa", "quanto e", "barato", "caro", "reais", "promocao", "desconto"],
      relacionadas: ["onde-comprar", "entrega"],
      contato: true
    },
    {
      id: "entrega", assunto: "compra",
      pergunta: "Vocês entregam?",
      resposta: "A Paladar faz vendas diretas, mas as regiões e condições de entrega ainda não estão publicadas no site.",
      palavras: ["entrega", "entregam", "delivery", "frete", "envio", "enviam", "mandam", "receber em casa", "correio", "ifood", "online"],
      relacionadas: ["onde-comprar", "preco"],
      contato: true
    },
    {
      id: "revender", assunto: "compra",
      pergunta: "Quero revender",
      resposta: "Que bom! O produto é pensado para <strong>empórios, mercados e lojas gourmet</strong>. As condições para revenda ainda não estão publicadas no site.",
      palavras: ["revender", "revenda", "atacado", "distribuir", "distribuidor", "minha loja", "meu mercado", "fornecedor", "parceria", "comprar em quantidade"],
      relacionadas: ["onde-comprar", "empresa"],
      contato: true
    },
    {
      id: "contato", assunto: "compra",
      pergunta: "Como falo com a empresa?",
      resposta: "Os canais de atendimento da Paladar ainda não estão publicados no site.",
      palavras: ["contato", "falar com", "falo com", "fala com", "contato com a empresa", "telefone", "whatsapp", "zap", "email", "e-mail", "instagram", "atendente", "humano", "pessoa", "atendimento", "sac", "reclamacao"],
      relacionadas: ["onde-comprar", "endereco"],
      contato: true
    },

    /* ---------- A empresa ---------- */
    {
      id: "empresa", assunto: "empresa",
      pergunta: "Quem é a Paladar da Estância?",
      resposta: "A Paladar da Estância nasceu para atender quem tem pouco tempo para cozinhar, mas não abre mão de refeições saborosas, seguras e com cara de comida feita em casa. A empresa produz e vende molho pronto à base de carne, com sabor caseiro e sem conservantes.",
      palavras: ["quem sao", "quem e voces", "quem e a paladar", "sobre a empresa", "empresa", "historia", "marca", "fundada", "dona", "dono"],
      relacionadas: ["diferenciais", "endereco"]
    },
    {
      id: "diferenciais", assunto: "empresa",
      pergunta: "Por que escolher o molho?",
      resposta: "<ul><li><strong>Sabor autêntico</strong> de comida caseira</li><li><strong>Ingredientes selecionados</strong>, de origem confiável</li><li><strong>Praticidade</strong>: refeição pronta em minutos</li><li><strong>Sem conservantes</strong> nem aditivos artificiais</li><li><strong>Receita original</strong>, desenvolvida com tempo e cuidado</li><li><strong>Qualidade premium</strong>, presente em empórios, mercados e lojas gourmet</li></ul>",
      palavras: ["diferencial", "diferenciais", "por que escolher", "por que comprar", "vantagem", "vantagens", "qualidade", "melhor"],
      relacionadas: ["o-que-e", "ingredientes"]
    },
    {
      id: "endereco", assunto: "empresa",
      pergunta: "Onde fica a empresa?",
      resposta: "Segundo o rótulo, a Paladar da Estância fica na <strong>Rua Coronel Aristides, em Porto Alegre (RS)</strong>.",
      palavras: ["onde fica", "endereco", "cidade", "porto alegre", "rio grande do sul", "localizacao", "fabrica", "sede", "rs"],
      relacionadas: ["cnpj", "onde-comprar"]
    },
    {
      id: "cnpj", assunto: "empresa",
      pergunta: "Qual o CNPJ?",
      resposta: "CNPJ <strong>68.341.251/0001-73</strong>, conforme o rótulo.",
      palavras: ["cnpj", "razao social", "nota fiscal", "nota"],
      relacionadas: ["endereco", "empresa"]
    },
    {
      id: "receitas", assunto: "empresa",
      pergunta: "Vocês têm receitas?",
      resposta: "Temos seis receitas com passo a passo: <a href=\"receitas.html#escondidinho\">escondidinho de aipim</a>, <a href=\"receitas.html#carreteiro\">arroz carreteiro</a>, <a href=\"receitas.html#polenta\">polenta cremosa</a>, <a href=\"receitas.html#tapioca\">tapioca com queijo coalho</a>, <a href=\"receitas.html#panqueca\">panqueca gratinada</a> e <a href=\"receitas.html#sanduiche\">sanduíche no pão francês</a>.",
      palavras: ["receitas", "receita", "caderno", "receita com", "escondidinho", "carreteiro", "arroz carreteiro", "polenta", "tapioca", "tapioca com", "faco tapioca", "fazer tapioca", "panqueca", "sanduiche", "lanche", "passo a passo"],
      relacionadas: ["como-servir", "como-preparar"]
    }
  ],

  // Respostas curtas para conversa
  conversa: [
    { palavras: ["oi", "ola", "bom dia", "boa tarde", "boa noite", "e ai", "hello"], resposta: "Olá! Sobre o que você quer saber?" },
    { palavras: ["obrigado", "obrigada", "valeu", "agradeco", "brigado"], resposta: "Por nada! Se tiver outra dúvida, é só perguntar." },
    { palavras: ["tchau", "ate mais", "ate logo"], resposta: "Até mais! Bom apetite." }
  ],

  semResposta: "Não encontrei uma resposta para isso. Escolha um dos assuntos abaixo:"
};
