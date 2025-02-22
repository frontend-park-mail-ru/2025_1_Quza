#!/bin/bash
mkdir -p public/build
handlebars -m public/src/pages/main/main.hbs -f public/build/main.js
handlebars -m public/src/pages/login/login.hbs -f public/build/login.js
handlebars -m public/src/pages/register/register.hbs -f public/build/register.js
handlebars -m public/src/pages/profile/profile.hbs -f public/build/profile.js
handlebars -m public/src/pages/notFound/not-found.hbs -f public/build/not-found.js
handlebars -m public/src/components/image/image.hbs -f public/build/image.js
handlebars -m public/src/components/header/header.hbs -f public/build/header.js
handlebars -m public/src/components/codes/codes.hbs -f public/build/codes.js
handlebars -m public/src/components/code/code.hbs -f public/build/code.js
handlebars -m public/src/components/code-editor/code-editor.hbs -f public/build/code-editor.js
handlebars -m public/src/components/link/link.hbs -f public/build/link.js
handlebars -m public/src/components/home/home.hbs -f public/build/home.js
handlebars -m public/src/components/input/input.hbs -f public/build/input.js
handlebars -m public/src/components/wrapper/wrapper.hbs -f public/build/wrapper.js
handlebars -m public/src/components/footer/footer.hbs -f public/build/footer.js
handlebars -m public/src/components/button/button.hbs -f public/build/button.js
