// Implementing a Redux Store.
// Household with no initial roommates, with £2000.
// New roommates can join and leave and they contribute
// to the household finances and splash some money.

import { createStore, combineReducers } from 'redux'

// Action Creators

// Who got paid and how much
const earnMoney = (name, amount) => {
  return {
    type: 'EARN',
    payload: {
      name,
      amount
    }
  }
}

// Who spent and how much
const spendMoney = (name, amount) => {
  return {
    type: 'SPEND',
    payload: {
      name,
      amount
    }
  }
}

// Who left the household
const leaveHome = name => {
  return {
    type: 'LEAVE',
    payload: {
      name
    }
  }
}

// Who joined the household and how much they are contributing
const joinHome = (name, amount) => {
  return {
    type: 'JOIN',
    payload: {
      name,
      amount
    }
  }
}

// REDUCERS

// Keeping track of the household's funds (capital)
const banking = (capital = 2000, action) => {
  switch (action.type) {
    case 'EARN':
      return capital + action.payload.amount
      break
    case 'SPEND':
      return capital - action.payload.amount
      break
    case 'JOIN':
      return capital + action.payload.amount
      break
    default:
      return capital
  }
}

// Keeping a list of the members of the household
const people = (membersList = [], action) => {
  switch (action.type) {
    case 'JOIN':
      return [...membersList, action.payload.name ]
      break
    case 'LEAVE':
      return membersList.filter(name => action.payload.name !== name)
      break
    default:
      return membersList
  }
}

// Store and CombineReducers
const household = combineReducers({
  banking,
  people
})

const store = createStore(household)


// Testing
console.log('Chandler and Joey join the Apartment and spend some money.')
store.dispatch(joinHome('Chandler', 500))
store.dispatch(joinHome('Joey', 350))
store.dispatch(spendMoney('Joey', 120))
store.dispatch(spendMoney('MarkJoey', 250))
console.log(store.getState())

console.log("It's payday! Yeppeee!")
store.dispatch(spendMoney('Chandler', 150))
store.dispatch(earnMoney('Chandler', 1500))
store.dispatch(earnMoney('Joey', 1100))
console.log(store.getState())

console.log('A new Roommate! Meet Phoebe! Interesting girl :)')
store.dispatch(joinHome('Phoebe', 700))
store.dispatch(spendMoney('Joey', 450))
console.log(store.getState())

console.log('Phoebe likes to splash money around... ')
console.log('Chandler gets frustrated and leaves the apartment!')
store.dispatch(spendMoney('Phoebe', 2500))
store.dispatch(spendMoney('Phoebe', 1200))
store.dispatch(leaveHome('Chandler'))
console.log(store.getState())

console.log("Phoebe's Smelly Cat becomes a hit! Big $$$$ coming!")
store.dispatch(earnMoney('Phoebe', 100000)) // Smelly Cat went viral!
console.log(store.getState())
console.log('... poor Chandler, will they have him back?')