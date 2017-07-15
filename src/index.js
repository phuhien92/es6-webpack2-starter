import './styles/core.scss'

import jsImg from './assets/js.png'

const page = `
<div class="main">
  <h1>ES6 + Webpack 2 starter</h1>
  <div>
    <img src="${jsImg}" alt="JavaScript"/>
  </div>
  <h2>Paulo Chaves from Piaui, Brazil</h2>
</div>
`

document.getElementById('root').innerHTML = page
