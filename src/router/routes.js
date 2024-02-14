const routes = [
  {
    path: "",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "index",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "/compare/:id?",
        name: "comparison",
        component: () => import("pages/ComparisonPage.vue"),
        props: (route) => ({
          formData: route.query,
        }),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      { path: "", name: "login", component: () => import("pages/Login.vue") },
      {
        path: "/register",
        name: "register",
        component: () => import("pages/Register.vue"),
      },
      {
        path: "/email-confirmation",
        name: "email-confirmation",
        component: () => import("pages/EmailConfirmation.vue"),
      },
      {
        path: "/forgot-password",
        name: "forgot-password",
        component: () => import("pages/ForgotPassword.vue"),
      },
      {
        path: "/reset-password",
        name: "reset-password",
        component: () => import("pages/ResetPassword.vue"),
      },
    ],
  },
  {
    path: "",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/me", name: "me", component: () => import("pages/Me.vue") },
      {
        path: "/form/:id?",
        name: "form-beverage",
        component: () => import("pages/FormBeverage.vue"),
        props: (route) => ({
          formData: route.query,
        }),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
