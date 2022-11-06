var admin = require("firebase-admin");
const { ClientFields } = require("../../models");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://vnpt-web-push-default-rtdb.asia-southeast1.firebasedatabase.app",
});

module.exports.SendBackgroundNotification = async (MESSAGE_DATA={}) => {
  const ClientFieldsData = await ClientFields.find().lean().exec() || [];
  const tokens = ClientFieldsData.map(field => {

    if (field.tempToken)
      return field.tempToken;
  }) || null;

  if(tokens.length)
  {
    for await (let token of tokens)
    {
      const message = {
          // data: {
          //   title: "data title",
          //   body: "data body\ndata body\ndata body\n",
          //   tag: "first title",
          // },
          data: MESSAGE_DATA,
          token
      };

      // 
      await admin.messaging().send(message).then(response => {
        // console.log(response)
      }).catch(async error => {
        console.log(error);
        await ClientFields.findOneAndRemove({tempToken: token})
      })
    }
  }

}

// module.exports = async () => {

//   const ClientFieldsData = await ClientFields.find().lean().exec() || [];
//   const tokens = ClientFieldsData.map(field => {

//     if (field.tempToken)
//       return field.tempToken;
//   }) || null;
  
//   // const payload = {
//   //   title: "first title",
//   //   body: "first body",
//   //   data: {
//   //     title: "data title",
//   //     body: "data body",
//   //     tag: "first title",
//   //   },
//   //   tokens,
//   // };
  
//   if(tokens.length)
//   {
//       for await (let token of tokens)
//       {
//         // 
//         const message = {
//           data: {
//             title: "data title",
//             body: "data body\ndata body\ndata body\n",
//             tag: "first title",
//           },
//           token
//         };
  
//         // 
//         await admin.messaging().send(message).then(response => {
//           // console.log(response)
//         }).catch(async error => {
//           console.log(error);
//           await ClientFields.findOneAndRemove({tempToken: token})
//         })

//       }
//   }
// };
