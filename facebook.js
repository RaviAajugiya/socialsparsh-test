import axios from "axios";

export const connectToFacebook = async (token) => {
  try {
    await import("react-native-fbsdk-next").then(
      async ({ AccessToken, LoginManager }) => {
        console.log("====================================");
        console.log("login");
        console.log("====================================");
        LoginManager.logOut();
        const result = await LoginManager.logInWithPermissions([
          "public_profile",
          "email",
          "pages_show_list",
          "pages_manage_posts",
          "instagram_content_publish",
          "instagram_basic",
          "manage_pages",
          "business_management",
        ]);
        if (result.isCancelled) {
          throw "User cancelled the login process";
        }
        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
          throw "Something went wrong obtaining access token";
        } else {
          console.log('====================================');
          console.log(data);
          console.log('====================================');
          postData(data,token)

          async function postData(data, token) {
            const response = await fetch("https://api.socialsparsh.com/POSTSocial/FBPagesAndTokens", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
          
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
          
            return await response.json();
          }
          
          // return await axios
          //   .post(
          //     "https://api.socialsparsh.com/" + "POSTSocial/FBPagesAndTokens",
          //     data,
          //     {
          //       headers: {
          //         Authorization: `Bearer ${token}`,
          //       },
          //     }
          //   )
          //   .then((res) => res.data);
        }
      }
    );
  } catch (error) {
    console.log(
      "🚀 ~ file: WebViewScreen.js:60 ~ connectToFacebook ~ error:",
      error
    );
  }
};
