<template>
  <div>
    <h1>Even list</h1>
    <div v-for="event in events" :key="event.id">
      <EventCard :event="event" />
    </div>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard";
import EventService from "@/services/EventService.js";

export default {
  components: {
    EventCard
  },
  data() {
    return {
      events: []
    };
  },
  created() {
    EventService.getEvents()
      .then(response => {
        this.events = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
