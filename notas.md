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

## Clase 303 custom pages
```
 //Custom Pages
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
```

## Clase 332 Relación con Paypal
- Se debe establecer una relación entre la orden y el gestor de pagos 
- en el modelo se pone transactionId y en la interfaz IOrder

## Clase 333 Paypal developer dashboard
- Para hacer un cobro no es mas que remover la palabra sandbox
- Create App
-- Agregar el nombre de la app
-- Seleccionar Merchant
- Obtenemos `CLIENT ID` y `SECRET` y agregamos en variables de entorno

## Clase 334 Botones Paypal
- `https://www.npmjs.com/package/@paypal/react-paypal-js`
-  `yarn add @paypal/react-paypal-js`
- Colocar en _app
```
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function App() {
    return (
        <PayPalScriptProvider options= options={{
          "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
        }}>
            <PayPalButtons style={{ layout: "horizontal" }} />
        </PayPalScriptProvider>
    );
}
```
- Agrego boton de Paypal
````
<PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: "1.99",
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        const name = details.payer.name.given_name;
                        alert(`Transaction completed by ${name}`);
                    });
                }}
            />
```


