<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EmailConfirmationPage",
});
</script>

<template>
  <q-page class="flex column items-center q-pa-md">
    <h1 class="welcome">{{ $t("thanksRegistering") }}</h1>
    <p>
      {{ $t("emailConfirmation.pt1")}}
      <strong>{{$route.query.email}}</strong>
    </p>
    <p>{{ $t("emailConfirmation.pt2")}}</p>
      <q-btn
        class="max-w-400"
        :label="$t('goBack')"
        :to="{ name: 'login' }"
        v-bind="{ ...$visualTextButton }"
      />
  </q-page>
</template>
