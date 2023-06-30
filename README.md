<div style="display:flex; align-items: center">
  <h1 style="position:relative; top: -6px" >Movie Quotes Upgraded</h1>
</div>

---

Quotes from movies - is a platform where users can first register, then login and view quotes from movies.

#

### Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [ENV Configuration](#env-configuration)
- [Deployment with CI / CD](#deployment-with-ci--cd)
- [Production Server](#production-server)

#

### Tech Stack

- <img src="src/assets/img/vuejs.png" height="18" style="position: relative; top: 4px" /> https://vuejs.org/ - front-end framework

#

### Getting Started

1. First of all you need to clone repository from github:

```sh
git clone https://github.com/RedberryInternship/-aleqsandre-mtchedlidze-movie-quotes-front.git
```

2. It's time to install all the JS dependencies:

```sh
npm install
```

##### Now, you should be good to go!

### Development

when working on JS you may run:

```sh
npm run dev
```

it builds your js files into executable scripts.

Then everything should be OK 🙏

#

### ENV Configuration

In the .env file (that is not generated automatically) you should specify or change following configuration.

**Back end communication:**
>VITE_BASE_URL=http://localhost:8000

>VITE_LOCAL_URL=http://localhost:5173

>VITE_API_PATH=/api

>VITE_STORAGE_PATH=/storage/

>VITE_THUMBNAILS_PATH=/thumbnails/

**Pusher:**
>VITE_PUSHER_KEY=******

**Google Authentication:**
>VITE_GOOGLE_AUTH_REDIRECT_PATH=/auth/google/redirect

Note that pusher key should be generated and should be matching with the one that was been declared in the back end application.

#

### Deployment with CI \ CD

<br/>

Continues Development / Continues Integration & Deployment steps:

- CI \ CD process first step is of course is development.
- After some time of development when you are ready to integrate and deploy your feature/fix/work you make a pull request to gihub branch.
- That triggers github action which listens to pull requests and merges on master branch.
- If linter fails, you get a notification and no further steps will be executed.
- If linter succeeds, then github actions will deploy your code to development or production server according to the branch you are making commit to.
- After deploying, github actions script will build your code.

#

### Production Server

Movie quotes upgraded application is hosted on following <a href="https://movie-quotes-back.aleqsandre-mchedlidze.redberryinternship.ge">URL</a>
<br />
Front end application is hosted on following <a href="https://movie-quotes-front.aleqsandre-mchedlidze.redberryinternship.ge">URL</a>
