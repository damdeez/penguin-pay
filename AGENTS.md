### PenguinPay
We are building a PenguinPay React Native app using Expo. So therefor, you are an expert in TypeScript, React Native, Expo, and Mobile App Development.
Hwo 
Here is a link to the PDF for more info: [pdf](./public/Mobile Engineer Interview Project (Take Home).pdf)

Code Style and Structure:
- Write concise, type-safe TypeScript code.
- Use functional components and hooks over class components. Use arrow functions to create the components and add proper typings wherever needed
- Ensure components are modular, reusable, and maintainable.
- `components` this directory contains all the components that can be reused in the project. Whenever you are asked to create a new component or implement a new design, this is the directory where you should create the respective folder along with files. For example:
```
components/Button // contents of button component
├── Buttons.tsx // contains all the component logic
└── Buttons.helpers.ts // contains any helper/utility functions that can be tested easily and are only used within this component
```
- The component should be declared first as an arrow function and then exported as default. For example:
```ts
// All the imports and other stuff
import { Example } from './Example';

interface ButtonProps {
  test: 'yes'
}
// ...
const MyButton = ({
// ... destructure props
}: ButtonProps) => {
// All the component level logic
// ...
return (
  <Example />;
  // UI elements go here
  )
}
// ...
// Styling goes here
const styles = StyleSheet.create({});

export default MyButton;
```
- Component folder names should also be in PascalCase
- `app` should contain all the pages and layouts. read the docs for further explanation: https://docs.expo.dev/develop/file-based-routing/
- `hooks` should contain all the hooks

Implementing the screens:
- Just like components, whenever you are asked to implement a screen, make a folder in the directory app. For example, search page might look like this
```
app/search // contents of search page
├── index.tsx // contains all the screen logic
├── _layout.tsx // contains screen layout (optional)
```
- In the `index.tsx` file, name of the screen should be declared properly for example for search screen, name should be `Search`.
- The screen component should be declared as an arrow function and then exported as default.
```ts
// All the imports and other stuff
// ...
const Search = () => {
// All the component level logic
// ...
return (
// Screen elements go here
)
}
// ...
export default Search;
```
- Often times, a screen may contain components which are already declared in the codebase. Before jumping to implementation, check in the `components` folder if there is something you might use. For example, buttons, input fields, cards, modals etc may be found in the `components` folder.
- Whenever there are input fields in the screen, make sure to use keyboard avoiding scroll views to allow the screen to adjust according to the keyboard visibility
- Always use Zod data inputs and validations

Naming Conventions:
- Use camelCase for variable, hooks and function names (e.g., `onClick`, `handleSubmit`).
- Use PascalCase for component names (e.g., `UserProfile`, `ChatScreen`).
- Directory names should be lowercase and hyphenated (e.g., `user-profile`, `chat-screen`).
- Avoid using ambiguous names for variables or components.

TypeScript Usage:
- Use TypeScript for all components, favoring interfaces for props and state.
- Avoid unnecessary return types as the newer version of TS should infer them.
- Enable strict typing in `tsconfig.json`.
- Avoid using `any`, `unknown` and casting; strive for precise types.

UI and Styling:
- Use consistent styling, either through `StyleSheet.create()`.
- Ensure responsive design by considering different screen sizes and orientations.
- Do not use inline styling. Always place styling in a component or screen file.

Best Practices:
- Follow React Native's threading model to ensure smooth UI performance.
- Utilize Expo's EAS Build and Updates for continuous deployment and Over-The-Air (OTA) updates.
- Use Expo Router for handling navigation and deep linking with best practices.
- Use React Native Stylesheet API as the preferred way to write styles.
- Hooks should contain shared logic such as API calls and data massaging, components should not handle heavy lifting logic, instead move that logic out into a hook if necessary.
- Make sure all of your changes are clean of Eslint, format and TypeScript errors.
- Use `bun` over any other package manager.
- Don't write tests to check for styling in components and make sure to check tests for TS errors.
- Limit leaving comments in tests unless the test is really intricate.
- Always use semicolons after statements.
- No inline if returns.
- Hooks should never return any JSX and should only contain "business" logic.