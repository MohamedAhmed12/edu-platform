export default {
  data() {
    return {
      isOpen: false,
      langSwitching: false,
      axiosInterceptor: null,
      idToken: "",
      listenersStarted: false,
      permissionGranted: false,
      finger: "",
      MessageBody: {},
    };
  },
  beforeMount() {
    if (process.browser) {
      // append bootstrap depending on language
      if ($("#bootstrapStyle").length == 0) {
        // $("head").prepend(`<link rel="stylesheet" id="bootstrapStyle" href="/css/bootstrap-en.min.css">`);
        if (this.$store.state.i18n.locale === "ar") {
          // $("head").append(`<link rel="stylesheet" id="bootstrapStyle" href="/css/bootstrap-ar.min.css">`);
        }
      }
      document.getElementsByTagName("html")[0].dir =
        this.$store.state.i18n.locale === "en" ? "ltr" : "rtl";
    }
  },
  mounted() {
    if (process.browser) {
      // append fieldsLinker to body
      let fieldsLinkerScript = document.createElement("script");
      let src = require("~/assets/js/fieldsLinker.js");
      if (!_.isEmpty(src)) {
        fieldsLinkerScript.src = require("~/assets/js/fieldsLinker.js");
        document.body.appendChild(fieldsLinkerScript);
      }
      this.getDeviceToken();
      this.startListeners();
    }
  },
  methods: {
    toggleNav() {
      this.isOpen = !this.isOpen;
    },
    startListeners() {
      this.startOnMessageListener();
      this.startTokenRefreshListener();
      this.listenersStarted = true;

      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("/firebase-messaging-sw.js")
          .then(function (registration) {
            console.log(
              "Registration successful, scope is:",
              registration.scope
            );
          })
          .catch(function (err) {
            console.log("Service worker registration failed, error:", err);
          });
      }
    },
    async getDeviceToken() {
      let currentToken;
      try {
        const permission = await Notification.requestPermission();
        try {
          currentToken = await this.$fireMess.getToken();
        } catch (e) {
          console.error("An error occurred while retrieving token. ", e);
          this.idToken = "";
        }
        if (currentToken) {
          this.idToken = currentToken;
          await this.updateToken(currentToken);
          console.log(this.idToken);
        } else {
          // Show permission request.
          console.info(
            "No Instance ID token available. Request permission to generate one."
          );
          // Show permission UI.
          this.idToken = "";
        }
        this.permissionGranted = permission === "granted";
      } catch (e) {
        console.error(e);
        return;
      }
    },
    startOnMessageListener() {
      try {
        this.$fireMess.onMessage((payload) => {
          this.MessageBody = payload;
          console.info("Message received.", payload);
          console.log(navigator);
          if ("serviceWorker" in navigator) {
            this.MessageBody = payload;
            const notification = payload.notification;
            let options = {
              body: notification.body,
              icon: "/_nuxt/assets/img/logo/green.png",
              image: "/_nuxt/assets/img/logo/green.png",
              vibrate: [300, 200, 300],
              badge: "/_nuxt/assets/img/logo/green.png",
            };
            if (notification.hasOwnProperty("click_action")) {
              this.MessageBody = payload;
              console.log(notification.click_action);
              options = {
                ...options,
                actions: [
                  { action: notification.click_action, title: "Click" },
                ],
                requireInteraction: true,
                tag: "open-window",
              };
            }
            navigator.serviceWorker.ready // returns a Promise, the active SW registration
              .then((swreg) =>
                swreg.showNotification(notification.title, options)
              );
            this.$toasted.show(notification.body, {
              duration: 6000,
              theme: "bubble",
              action: {
                text: `${notification.click_action ? "click" : ""} `,
                onClick: (e, toastObject) => {
                  if (
                    notification.click_action != "" ||
                    notification.click_action != null
                  ) {
                    window.location.replace(notification.click_action);
                  }
                  toastObject.goAway(0);
                },
              },
            });
          }
        });
      } catch (e) {
        console.error(e);
      }
    },

    startTokenRefreshListener() {
      /*

        * @deprecated There is no need to handle token rotation.
        */
      // this.$fireMess.onTokenRefresh(async () => {
      //   try {
      //     const refreshedToken = await this.$fireMess.getToken();
      //     await this.updateToken(refreshedToken);
      //   } catch (e) {
      //     console.error("Unable to retrieve refreshed token ", e);
      //   }
      // });
    },

    async updateToken(token) {
      try {
        this.$fingerprint.get((components) => {
          this.finger = this.$fingerprint.x64hash128(
            components
              .map((pair) => {
                return pair.value;
              })
              .join(),
            31
          );
          let data = {
            data: {
              type: "notification",
              id: "null",
              attributes: {
                device_token: token,
                device_type: "web",
                fingerprint: this.finger,
              },
            },
          };
          return this.$axios.post("notifications/update-token", data);
        });
      } catch (e) {
        console.error(e);
      }
    },
    sendTestMessage() {
      try {
        setTimeout(() => {
          // wait 5 seconds so you have time to switch away from the page to test the service-worker
          this.$fireFunc.httpsCallable("sendTestPushMessage")({
            token: this.idToken,
          });
        }, 5000);
      } catch (e) {
        alert(e);
        return;
      }
    },
  },
};
