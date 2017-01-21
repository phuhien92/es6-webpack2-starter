import './app.css';

import jsImg from './assets/js.png';

const page = `
<div class="main">
  <h1>ES6 + Webpack 2 starter</h1>
  <h2>Yes, another boilerplate!</h2>
  <div>
    <img src="${jsImg}" alt="JavaScript"/>
  </div>
  <h2>I'm Paulo Chaves from Piauí, Brazil</h2>
</div>
`;

document.getElementById('root').innerHTML = page;
