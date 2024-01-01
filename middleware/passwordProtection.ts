import { useRoute, useRouter } from 'vue-router';

const correctPassword = 'cat';

const protectedRoutes: string[] = [
  '/simulator',
  '/builder',
  '/rules',
  '/xenos',
  '/imperium',
  '/chaos',
  '/astartes',
];

export default function () {
  const route = useRoute();
  const router = useRouter();

  // Check if the user has already entered the correct password
  const hasEnteredPassword = sessionStorage.getItem('hasEnteredPassword');

  if (!hasEnteredPassword) {
    // User has not entered the password yet
    if (protectedRoutes.includes(route.path)) {
      // Check if the password is correct
      const enteredPassword = prompt('Enter the password:');
      if (enteredPassword !== correctPassword) {
        // Redirect the user to a different page if the password is incorrect
        return router.push('/');
      } else {
        // Store the fact that the user has entered the correct password
        sessionStorage.setItem('hasEnteredPassword', 'true');
      }
    }
  }
}
