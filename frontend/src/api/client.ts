import ky from 'ky';
import { useAuthStore } from '../store/authStore';

const apiClient = ky.create({
  prefix: 'http://127.0.0.1:8000',
  hooks: {
    beforeRequest: [
      ({ request }) => {
        const token = useAuthStore.getState().token;
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
});

export default apiClient;
