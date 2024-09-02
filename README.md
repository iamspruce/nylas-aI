# SmartInbox

SmartInbox is an AI-powered email assistant that helps you efficiently manage your emails. It provides intelligent email summaries and smart reply suggestions, allowing you to handle your inbox with ease.

## Features

- **AI-Powered Summaries**: Automatically generates concise summaries of opened emails, so you can quickly grasp the main points without reading through the entire message.
- **Smart Reply Suggestions**: Offers context-aware reply suggestions using Retrieval-Augmented Generation (RAG) based on your email data. This saves time by allowing you to respond to emails with just a click.

- **Training with Personal Email Data**: The AI assistant is trained using your own email data, ensuring that the summaries and suggestions are tailored to your specific communication style and preferences.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Nylas API Key](https://nylas.com/) for email integration
- [Anthropic API Key](https://www.anthropic.com/) for AI capabilities

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/smartinbox.git
   cd smartinbox
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project and add your environment variables:

   ```plaintext
   DATABASE_URL=your-database-url
   NYLAS_API_SECRET=your-nylas-api-secret
   NYLAS_API_URI=your-nylas-api-uri
   ANTHROPIC_API_KEY=your-anthropic-api-key
   ```

4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to use SmartInbox.

### Training Your AI Assistant

- **Initial Training**: When you first use SmartInbox, you'll need to train the AI assistant with your email data. The app will guide you through this process. Simply connect your email, and the app will begin analyzing your emails to build a personalized model.

- **Re-training**: If you feel that the AI assistant needs to improve, you can re-train it with more recent email data by navigating to the training section in the app.

### Connecting Your Email

- If your email is not yet connected to SmartInbox, the app will prompt you to connect it via Nylas. Follow the on-screen instructions to grant access to your email account.

## Usage

Once everything is set up, SmartInbox will automatically start summarizing your emails and suggesting replies. You can interact with the assistant directly from your inbox:

- **View Summaries**: Click on an email to view its summary at the top.
- **Smart Replies**: Use the suggested smart replies to respond quickly.

## Contributing

We welcome contributions to SmartInbox! If you'd like to help improve the app, please fork the repository and submit a pull request.

### Steps to Contribute

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, feel free to reach out at [your-email@example.com](mailto:your-email@example.com).
