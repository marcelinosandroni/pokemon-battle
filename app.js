const body = document.querySelector('body')
const container = document.querySelector('.container')
const startBattle = document.querySelector('.start-battle')
const tela1 = document.querySelector('.tela-1')
const tela2 = document.querySelector('.tela-2')
const caixaPokemons = document.querySelector('.caixa-selecao')

let jogadorHP, inimigoHP

const pokemonStats = {

  bulbasaur: {
    name: 'bulbasaur',
    hp: 294,
    ataque: 50,
    golpes: [
      {
        name: 'Vine Whip',
        dano: 30,
        efeito: 'veneno',
        cd: 1,
      },
      {
        name: 'Razor leaf',
        dano: 40,
        efeito: 'nenhum',
        cd: 2
      },
      {
        name: 'Seed bomb',
        dano: 60,
        efeito: 'nenhum',
        cd: 3,
      },
      {
        name: 'Solar bean',
        dano: 80,   
        efeito: 'nenhum',
        cd: 4
      }
    ],
    evasao: 10, //10% chance de evasao
    precisao: 10, // acertar o golpe = 100 + precisao - evasao inimigo
    critico: 10, //10% de dano critico, o dano eh 1.5x
  },

  
  pikachu: {
  
    hp: 294,
    ataque: 50,
    golpes: [
      {
        name: 'Choque de tomada',
        dano: 30,
        efeito: 'nenhum',
        cd: 1,
      },
      {
        name: 'Curto na casa',
        dano: 40,
        efeito: 'nenhum',
        cd: 2
      },
      {
        name: 'Blackout no bairro',
        dano: 60,
        efeito: 'nenhum',
        cd: 3,
      },
      {
        name: 'Apagao geral',
        dano: 80,   
        efeito: 'nenhum',
        cd: 4
      }
    ],
    evasao: 10, //10% chance de evasao
    precisao: 10, // acertar o golpe = 100 + precisao - evasao inimigo
    critico: 10, //10% de dano critico, o dano eh 1.5x
  }
}


let Batalha = {
  round: 0,
  atacar(atacante, defensor) {
    defensor.hp -= atacante.ataque
    if (defensor.name == this.inimigo.name) {
      inimigoHP.textContent = defensor.hp
    }
    console.log(defensor.hp)

  },
  
  morreu(pokemon) {
    if (pokemon.hp <= 0) {
      return true
    } else {
      return false
    }

  }
}


class Pokemon {
  constructor(name) {
    this.name = name
    this.configurarPokemon(this.name)
  }
  
  configurarPokemon(name) {
    //{this.ataque, this.hp} = pokemonStats[name]
    this.ataque = pokemonStats[name].ataque
    this.hp = pokemonStats[name].hp
  }
  atacar(golpe) {
    let dano = this.ataque
  }
}


//bulbasaur

let bulbasaur = new Pokemon('bulbasaur')
let pikachu = new Pokemon('pikachu')

Batalha.jogador = bulbasaur
Batalha.inimigo = pikachu

const contruirCenario = () => {
  
  
}

const battle = (event) => {
  // let battleElement = document.createElement('div')
  // battleElement.textContent = 'Testando'
  // container.appendChild(battleElement)

  tela1.classList.toggle('invisible')
  tela2.classList.toggle('invisible')
}


const escolherPokemon = (pokemon) => {
  let tagClicada = pokemon.target.tagName
  let pokemonEscolhido

  if (tagClicada === 'DIV') {
    console.log('Clica no pokemon seu cego!')
  } else if (tagClicada === 'SPAN') {
    pokemonEscolhido = pokemon.target.classList[1]
  } else {
    pokemonEscolhido = pokemon.target.parentElement.classList[1]
  }
  
  Batalha.jogador = pokemonEscolhido
  
  let listaPokemons = caixaPokemons.children
  
  Array.from(listaPokemons).forEach(pokemon => {
      if (!Array.from(pokemon.classList).includes(pokemonEscolhido)) {
        pokemon.classList.toggle('invisible')
      }
  })
  document.querySelector('.tela-2 > h1').classList.toggle('invisible')
  
  let barraHP = document.createElement('div')
  barraHP.classList.add('barraHP-inimigo')
  let barraHPProgresso = document.createElement('div')
  barraHPProgresso.classList.add('barraHP-progresso', 'inimigo')
  barraHPProgresso.textContent = '100'
  
  barraHP.append(barraHPProgresso)
  tela2.prepend(barraHP)
  inimigoHP = barraHPProgresso
  
  let barraHPJogador = document.createElement('div')
  barraHPJogador.classList.add('barraHP-jogador')
  let barraHPProgressoJogador = document.createElement('div')
  barraHPProgressoJogador.classList.add('barraHP-progresso', 'jogador')
  barraHPProgressoJogador.textContent = '100'
  
  barraHPJogador.append(barraHPProgressoJogador)
  tela2.prepend(barraHPJogador)
  jogadorHP = barraHPProgressoJogador
  
  const intervalID = setInterval( () => {
    Batalha.atacar(bulbasaur, pikachu) 
    if (Batalha.morreu(pikachu)) {
      console.log('Morreu!')
      clearInterval(intervalID)
    }
  }, 2000)

}

startBattle.addEventListener('click', battle)   
caixaPokemons.addEventListener('click', escolherPokemon)