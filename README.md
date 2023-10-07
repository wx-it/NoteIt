# NoteIt

NoteIt is a simple web application that allows users to create, manage, and organize their notes. It provides a user-friendly interface for taking and organizing notes, making it easy to keep track of important information.

## Features

- Create, edit, and delete notes.
- Rich text editing with formatting options.
- User authentication for secure access to your notes.
- Real-time synchronization across devices.
- User-friendly and responsive design.

## Technologies Used

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Firebase (Authentication and Firestore)
- **Routing:** React Router
- **Rich Text Editing:** Novel

## Getting Started

To run the Notes App locally on your machine, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/wx-it/NoteIt.git
   ```

2. Navigate to the project directory:

   ```bash
   cd note-it
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a Firebase project and configure Firebase Authentication and Firestore. Update the Firebase configuration in `src/config/firebase.ts`.

5. Start the development server:

   ```bash
   npm start
   ```

6. Open your web browser and visit `http://localhost:3000` to access the Notes App.

## Usage

- Sign up for an account or log in if you already have one.
- Create new notes by clicking the add button.
- Edit and format notes using the rich text editor.
- Delete notes you no longer need.
- Enjoy a seamless and efficient note-taking experience!

## Contributing

Contributions are welcome! If you find a bug, have a feature request, or want to make improvements (since it still needs some!) , please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
