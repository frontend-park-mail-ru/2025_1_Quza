#!/bin/bash
mkdir -p public/build
handlebars -m public/src/pages/notFound/not-found.hbs -f public/build/not-found.js
handlebars -m public/src/pages/codes/codes.hbs -f public/build/codes.js
handlebars -m public/src/pages/codes1/codes1.hbs -f public/build/codes1.js
handlebars -m public/src/pages/auth/auth.hbs -f public/build/auth.js
handlebars -m public/src/pages/auth/login/login.hbs -f public/build/login.js
handlebars -m public/src/pages/auth/register/register.hbs -f public/build/register.js
handlebars -m public/src/components/image/image.hbs -f public/build/image.js
handlebars -m public/src/components/header/header.hbs -f public/build/header.js
handlebars -m public/src/components/header/header.hbs -f public/build/header.js
handlebars -m public/src/components/text-container/text-container.hbs -f public/build/text-container.js
handlebars -m public/src/components/code/code.hbs -f public/build/code.js
handlebars -m public/src/components/clickable-text/clickable-text.hbs -f public/build/clickable-text.js
handlebars -m public/src/components/code-editor/code-editor.hbs -f public/build/code-editor.js
handlebars -m public/src/components/link/link.hbs -f public/build/link.js
handlebars -m public/src/components/input/input.hbs -f public/build/input.js
handlebars -m public/src/components/wrapper/wrapper.hbs -f public/build/wrapper.js
handlebars -m public/src/components/button/button.hbs -f public/build/button.js
handlebars -m public/src/components/settings-panel/settings-panel.hbs -f public/build/settings-panel.js
handlebars -m public/src/components/settings-panel/settings-button/settings-button.hbs -f public/build/settings-button.js
handlebars -m public/src/components/span/span.hbs -f public/build/span.js
handlebars -m public/src/components/logo/logo.hbs -f public/build/logo.js
handlebars -m public/src/components/empty-code/empty-code.hbs -f public/build/empty-code.js
handlebars -m public/src/components/search-bar/search-bar.hbs -f public/build/search-bar.js
handlebars -m public/src/components/toast/toast.hbs -f public/build/toast.js