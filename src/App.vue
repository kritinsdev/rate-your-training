<template>
    <router-view :authenticated="authenticated" @authenticated="setAuthenticated" />
</template>

<script>

export default {
  name: 'App',
  data() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const isAuthenticated = userData && userData.isAuth;

    return {
      authenticated: isAuthenticated || false,
    };
  },
  methods: {
    setAuthenticated(value, res) {
      this.isAuthenticated = value;
      localStorage.setItem('userData', JSON.stringify({ isAuthenticated: true, userId: res.userId, name: res.name }));
    },
  },
};
</script>

<style>
  * {
      box-sizing: border-box;
  }

  body {
    font-family: 'Lato', sans-serif;
    margin: 0;
    padding: 0;
  }

  html, body, #app, .container, .content {
    min-height: 100vh;
  }

  .container {
    max-width: 900px;
    margin:0 auto;
    text-align: center;
  }

  .content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: max-content;
  margin:0 auto;
  gap:16px;
}

  h1 {
    margin:0;
  }

  button {
    background-color: #FF9900;
    color:white;
    border:none;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    padding:12px;
    border-radius: 5px;
    max-width: 220px;
  }

  button:hover {
    cursor: pointer;
    background-color: #e38800;
  }

  .form {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding:12px;
  width: min-content;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap:16px;
}

.error-msg {
  color:#FF0000;
  text-align: left;
  font-size: 12px;
}
</style>