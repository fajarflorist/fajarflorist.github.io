# About

This is template that combine Jekyll and TailwindCSS with some Jekyll plugins to optimize site. Also use Netlify CMS to organize post on admin panel.


# TailwindCSS

Open your terminal, follow these step :

## Installation

1. Open project directory
```
cd <directory_path>
```

2. Install node_modules
```
yarn install
```

## Running

1. Open project directory
```
cd <directory_path>
```

2. Run local server
```
bundle exec jekyll serve --livereload
```

3. Open browser with url `localhost:4000`
```
open -a "Google Chrome" "http://localhost:4000"
```

## Deployment

1. Copy compiled TailwindCSS and paste to assets directory
```
cp _site/tailwind.css assets/css/tailwind.css
```

2. Push to repository
```
git push origin main
```


# Netlify CMS

## Create GitHub OAuth App

1. Go to [Github Developer Settings](https://github.com/settings/developers)

2. On menu `OAuth Apps`, click button `Register a new application`

3. Fill in the form
```
Application name :
<app_name> e.g. Shop

Homepage URL :
<site_url> e.g. https://fajarflorist.github.io/

Application description :
<app_description> e.g. Admin panel

Authorization callback URL :
https://api.netlify.com/auth/done

✅ Enable Device Flow
```

4. Once finished, leave the page in the background. You will need the **Client ID** and **Client Secret** on this page later.


## Create Netlify App

1. Go to [Netlify](https://app.netlify.com/account/sites), then login use your GitHub account

2. On menu `Sites`, click button `Add new site`, then click `Deploy manually`

3. Drag any file with index.html inside a folder

4. After succeed, go to `Settings`, and copy your site name. It should be something like `relaxed-blancmange-bf2a4b`

5. Then go to `Domain Management` and add your GitHub Pages domain (your.github.io) as a custom domain

6. And then go to `Access control`, scroll down to `OAuth` and click `Install provider`

7. Choose `GitHub` as provider, and enter the `Client ID` and `Client Secret` from **GitHub OAuth Apps** page mentioned above


## Set Config

Set configuration of your website on `/admin/config.yml`, you can change this to yours :
```
backend:
  name: github
  repo: <username>/<repository>   # e.g. fajarflorist/fajarflorist.github.io
  branch: <branch>                # e.g. main
  site_domain: <netlify_app_url>  # e.g. relaxed-blancmange-bf2a4b.netlify.app

local_backend:
  url: <localhost_port_url>       # e.g. http://localhost:8081/api/v1

site_url: <site_url>              # e.g. https://fajarflorist.com or https://fajarflorist.github.io
display_url: <site_url>           # e.g. https://fajarflorist.com or https://fajarflorist.github.io
logo_url: <image_url>             # e.g. https://fajarflorist.github.io/assets/img/favicon.png
```

## Running CMS on Local

Open your terminal, follow these step :

1. Install `netlify-cms-proxy-server`
```
npm i netlify-cms-proxy-server
```
2. Then running it
```
npx netlify-cms-proxy-server
```
3. You'll see the port used for this proxy server, the default is `8081`


# Source

- https://mzrn.sh/2022/04/09/starting-a-blank-jekyll-site-with-tailwind-css-in-2022/
- https://sujaykundu.com/blog/how-to-setup-netlify-cms-with-github-pages-hosted-jekyll-blog/
- https://decapcms.org/docs/beta-features/#working-with-a-local-git-repository