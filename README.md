# Cool-off (Special thanks to T3 app)

Cool off is designed to enhance your Spotify experience by automatically skipping songs that you have added to a "skip playlist". 

## Features

- Automatically skips songs in your designated "skip playlist" while the app is running.
- Provides real-time tracking of the currently playing track on Spotify.
- Gives the ability to add and remove tracks from the "skip playlist" directly from the app.

## How it works

This application uses Spotify's Web API to fetch the currently playing track, the user's "skip playlist", and to control playback. 

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js
- npm
- Spotify Developer Account

### Installation

1. Clone the repo:
    ```sh
    git clone https://github.com/camwebby/Cool-off.git
    ```
2. Install NPM packages:
    ```sh
    npm install
    ```
3. Register a new app on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) to get your `Client ID` and `Client Secret`.

4. Create a `.env` file in the root of your project and insert your `Client ID` and `Client Secret`.
    ```
      CLIENT_ID=xxx
      CLIENT_SECRET=xxx
      REDIRECT_URI=xxx
      AUTH_KEY=xxx
    ```
    
5. Start the development server:
    ```sh
    npm run dev
    ```

## Usage

Once you've started the app, login with your Spotify account and set your "skip playlist". The app will then listen to your current playback and skip any songs that are in your "skip playlist". 

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
