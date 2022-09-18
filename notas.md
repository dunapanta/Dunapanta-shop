## Clase 295 Next Auth

- `yarn add next auth`

## Clase 296 Github Auth

- Register OAuth app
- Agrego variables de entorno
- `csrf-token` token para asegurar la comunicación cliente - servidor de que no fueron cambaidos los tokens

## Clase 296 credentials
- Se agregan los campos de email y password
- Si retorna null es que no se pudo loguear
- Si retorna un objeto es que se logueo correctamente
- Agregar `NEXT_AUTH_SECRET` a las variables de entorno

## Clase 297 callbacks
- add callbacks for credentials
```
 callbacks: {
    async jwt({ token, account, user }) {
      //console.log({ token, account, user });

      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case "credentials":
            token.user = user;
            break;
          case "oauth":
          //Crear usuario o verificar si existe en la base de datos
        }
      }
      return token;
    },

    async session({ session, token, user }) {
      //console.log({ session, token, user });

      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    },
  },
```


