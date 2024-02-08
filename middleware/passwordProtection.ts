import { useRoute, useRouter } from 'vue-router';
import { useWh40kPasswordStore } from '~/stores/wh40kPasswordStore'; // Import the store

const correctPassword = 'gato';

const protectedRoutes: string[] = [
  '/simulator',
  '/builder',
  '/rules',
  '/xenos',
  '/imperium',
  '/chaos',
  '/astartes',
];

// Define "wh40k" as the namespace for the application
const namespace = 'wh40k';

export default function () {
  const route = useRoute();
  const router = useRouter();
  const passwordStore = useWh40kPasswordStore(); // Use the store in middleware

  // Check if the user has already entered the correct password
  const hasEnteredPassword = passwordStore.password; // Access the password from the store

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
        passwordStore.setPassword(enteredPassword); // Use the store action to set the password
      }
    }
  }
}
