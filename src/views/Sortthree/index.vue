<template>
  <div class="index">
    <h1>This is an course.index page</h1>
    <router-link :to="{ name: 'activityShare' }">To Activity SharePage</router-link>
    <router-link :to="{ name: 'activityNotice' }">To Activity notice</router-link>
  </div>
</template>
