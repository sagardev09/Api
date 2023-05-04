import { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import axios from "axios";

function App() {
  const [crypto, setcrypto] = useState("")
  const [image, setimage] = useState("")
  const [name, setname] = useState("")
  const [symbol, setsymbol] = useState("")
  const [link, setlink] = useState("")
  const [ind, setind] = useState("")
  const [usd, setusd] = useState("")
  const [desc, setdesc] = useState("")

  function strip_html_tags() {
    return { __html: desc }
  }


  async function cryptoSearch(e) {
    e.preventDefault()

    // const response = await fetch(`https://api.coingecko.com/api/v3/coins/${crypto}`);

    // const resData = await response.json();

    const url = "https://api.coingecko.com/api/v3/coins/" + crypto

    axios.get(url).then(res => {

      const resData = res.data
      setimage(resData.image.large);
      setname(resData.name)
      setsymbol(resData.symbol)
      setlink(resData.links.homepage[0])
      setind(resData.market_data.current_price.inr)
      setusd(resData.market_data.current_price.usd)
      setdesc(resData.description.en)
    }).catch(err => {
      console.log(err);
    })






  }

  return (
    <div className="App">
      <div className="heading">
        <h1>Cryptocurrency Search</h1>
      </div>
      <div className="middle">
        <form>
          <input className="searchbar" type="text" value={crypto} onChange={(e) => setcrypto(e.target.value)} placeholder="Search" required />
          <br />
          <button onClick={cryptoSearch} className="btn btn-primary">Search</button>
        </form>
      </div>

      <div className="container-fuild d-flex justify-content-center ml-5 ">
        <div className=" cryptobar bg-success col-md-4 p-2 rounded">
          <img src={image} alt="" width="150" />
          <br />
          <h1 className="text-white">{name}</h1>
          <h2>{symbol}</h2>
          <h2><a className="text-white" href={link}>{link}</a></h2>
          <br />
          <h2>{ind}</h2>
          <h2>{usd}</h2>
        </div>
        <div className="disc col-md-8 my-auto">
          <div dangerouslySetInnerHTML={strip_html_tags()}></div>

        </div>
      </div>

    </div>
  );
}

export default App;
