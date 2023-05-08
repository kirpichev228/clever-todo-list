import { createStore } from 'vuex';
import { authStore } from '@/store/authStore';
import { calendarStore } from '@/store/calendarStore';
import { errorStore } from '@/store/errorStore';

export default createStore({
  modules: {
    auth: authStore,
    calendar: calendarStore,
    error: errorStore,
  },
});
