//This file will allow users to log in. This also holds some data which gets used
import { User } from './userInfo'
export const USERS: User[] = [
  {
    name: 'U1',
    password: 'p1',
    description: 'I am the main user',
    profilePicture: 'person-outline', // Default image
    totalScore: 100,
    correct: 0,
    inCorrect: 0,
  },
  {
    name: 'BOT-1',
    password: 'password1',
    description: 'I am the first bot',
    profilePicture: 'american-football-outline',
    totalScore: 150,
    correct: 0,
    inCorrect: 0,
  },
  {
    name: 'BOT-2',
    password: 'password1',
    description: 'I am the second bot',
    profilePicture: 'football-outline',
    totalScore: 10,
    correct: 0,
    inCorrect: 0,
  },
  {
    name: 'BOT-3',
    password: 'password1',
    description: 'I am the third bot',
    profilePicture: 'baseball-outline',
    totalScore: 0,
    correct: 0,
    inCorrect: 0
  },
];
