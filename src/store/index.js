import { createStore } from 'vuex';
import { authStore } from '@/store/authStore';
import { calendarStore } from '@/store/calendarStore';

export default createStore({
  modules: {
    auth: authStore,
    calendar: calendarStore,
  },
});
