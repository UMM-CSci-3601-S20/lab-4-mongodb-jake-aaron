import { Todo } from '../app/todos/todo';

/**
 * Some testing data for the todo tests.
 *
 * This file could potentially be a JSON, but that would be slightly more
 * difficult to read from Karma, so we present it as a TypeScript file instead.
 */
export const testTodos: Todo[] = [
  {
    _id: 'feed dog',
    owner: 'Billy',
    status: false,
    body: 'Mr. Scruffles needs to be fed. The dog food is under the kitchen counter.',
    category: 'chores',
  },
  {
    _id: 'send letter',
    owner: 'Susie',
    status: false,
    body: 'It was nice of Aunt Matilda to come to your birthday party last Saturday, and really ought to write her a thank-you letter.',
    category: 'chores',
  },
  {
    _id: 'water succulent',
    owner: 'Billy',
    status: true,
    body: "If you're serious about keeping that plant on your dresser, you're going to need to take care of it.",
    category: 'chores',
  },
  {
    _id: 'go for a walk',
    owner: 'Mr. Scruffles',
    status: false,
    body: "Mr. Scruffles, you've been sitting around all day. You need to get some fresh air!",
    category: 'not being such a lazy-bones',
  },
];
