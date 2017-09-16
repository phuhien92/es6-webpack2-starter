import './styles/core.scss'

import jsImg from './assets/js.png'

// gonna be removed in production
if (__DEV__) {
  console.log('log log log log')
}

const page = `
<div class="main">
  <h1>ES6 + Webpack starter</h1>
  <div>
    <img src="${jsImg}" alt="JavaScript"/>
  </div>
  <h2>Paulo Chaves from Piaui, Brazil</h2>
</div>
`

document.getElementById('root').innerHTML = page
