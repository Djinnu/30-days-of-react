import React from 'react'
import './App.css'

const Header = ({user, showDate}) => {
  return (
    <header>
      <h1>30 Days Of React</h1>
      <p>Getting Started React</p>
      <p>JavaScript Library</p>
      <p>{user}</p>
      <p>{showDate(new Date())}</p>
      <p>Select a country for your next holiday</p>
    </header>
  )
}

const Main = ({info}) => {
  console.log(info)
  return (
    <main>
      <div className="country-card">
        <div className="flag-container">
          <img src={info.flagImg} alt="flag"/>
          <h2 style={{ fontSize: "20px" }}>{info.name}</h2>
        </div>
        <div className="info">
          <span className="first-word">Capital: </span><span className="input">{info.capital}</span>
        </div>
        <div className="info">
          <span className="first-word">Language: </span><span className="input">{info.language}</span>
        </div>
        <div className="info">
          <span className="first-word">Population: </span><span className="input">{info.population}</span>
        </div>
        <div className="info">
          <span className="first-word">Currency: </span><span className="input">{info.currency}</span>
        </div>
      </div>
    </main>
  )
}

const Button = ({handleClick}) => {
  return (
    <div className="button-container">
      <button onClick={handleClick}>Select Country</button>
    </div>
  )
}

const Footer = () => {
  return (
    <footer>
      <small>Copyright {new Date().getFullYear()}</small>
    </footer>
  )
}

const getRandomCountry = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all")
  const data = await res.json()
  let randomIndex = Math.floor(Math.random() * data.length)
  const country = data[randomIndex]
      
  const countryName = country.name.common
  const flagImg = country.flags.png
  const capital = country.capital ? country.capital[0] : "no capital"
  let languages = []
  for(const lang in country.languages) {
    languages.push(country.languages[lang])
  }
  const population = country.population
  let currency = []
  for(const curr in country.currencies) {
    currency.push(country.currencies[curr])
  }
  currency = currency.map(x => x.name)
  languages = languages.join(", ")
  currency = currency.join(", ")

  const newCountry = {
    name: countryName,
    flagImg: flagImg,
    capital: capital,
    language: languages,
    population: population,
    currency: currency
  }

  return newCountry
}


class App extends React.Component {

  state = {
    country: {
      name: "",
      flagImg: "",
      capital: "",
      language: "",
      population: "",
      currency: ""
    }
  }

  showDate = (time) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]

    const month = months[time.getMonth()].slice(0, 3)
    const year = time.getFullYear()
    const date = time.getDate()
    return ` ${month} ${date}, ${year}`
  }

  handleClick = async () => {
    const obj = await getRandomCountry();
    this.setState({ country: obj })
  } 
  
  componentDidMount() {
    this.handleClick()
  }

  render() {
    const user =  "Geralt of Rivia"

    return (
      <div>
        <Header user={user} showDate={this.showDate}/>
        <Main info={this.state.country}/>
        <Button handleClick={this.handleClick}/>
        <Footer />
      </div>
    )
  }
}


export default App